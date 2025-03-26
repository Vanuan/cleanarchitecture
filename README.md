# Clean Architecture with React - Implementation Guide

## Project Structure
```
src/
├── domain/
│   ├── entities/
│   ├── repository/
│   └── usecases/
├── application/
│   └── usecases/
├── infrastructure/
│   ├── events/
│   └── repositories/
├── ui/
│   ├── components/
│   └── hooks/
└── lib/
    └── utils/
```

## Step-by-Step Implementation Guide

### 1. Domain Layer Setup

```typescript
// 1. Define Entity
// domain/entities/entity.ts
export interface Entity {
  id: string;
  // ... other base properties
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define Repository Interface
// domain/repository/repository.ts
export interface Repository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | undefined>;
  create(data: Omit<T, "id">): Promise<T>;
  update(id: string, updates: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

// 3. Define Use Case Interface
// domain/usecases/usecase.ts
export interface UseCase<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | undefined>;
  create(data: Omit<T, "id">): Promise<T>;
  update(id: string, updates: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}
```

### 2. Application Layer Setup

```typescript
// application/usecases/service.ts
export class Service<T> implements UseCase<T> {
  constructor(private readonly repository: Repository<T>) {}

  async getAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async getById(id: string): Promise<T | undefined> {
    return this.repository.findById(id);
  }

  async create(data: Omit<T, "id">): Promise<T> {
    return this.repository.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    return this.repository.update(id, {
      ...updates,
      updatedAt: new Date(),
    });
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
```

### 3. Infrastructure Layer Setup

```typescript
// 1. Event Bus
// infrastructure/events/event.bus.ts
export class EventBus {
  private handlers: Record<string, Function[]> = {};

  subscribe(eventType: string, handler: Function): () => void {
    if (!this.handlers[eventType]) {
      this.handlers[eventType] = [];
    }
    this.handlers[eventType].push(handler);
    return () => {
      this.handlers[eventType] = this.handlers[eventType].filter(h => h !== handler);
    };
  }

  publish(eventType: string, payload?: any): void {
    const handlers = this.handlers[eventType] || [];
    handlers.forEach(handler => handler(payload));
  }
}

export const eventBus = new EventBus();

// 2. Repository Implementation
// infrastructure/repositories/inmemory.repository.ts
export class InMemoryRepository<T extends { id: string }> implements Repository<T> {
  protected items: T[] = [];

  async findAll(): Promise<T[]> {
    return [...this.items];
  }

  async findById(id: string): Promise<T | undefined> {
    return this.items.find(item => item.id === id);
  }

  async create(data: Omit<T, "id">): Promise<T> {
    const item = {
      ...data,
      id: crypto.randomUUID(),
    } as T;
    this.items.push(item);
    return item;
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) throw new Error("Item not found");
    
    this.items[index] = { ...this.items[index], ...updates };
    return this.items[index];
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter(item => item.id !== id);
  }
}
```

### 4. UI Layer Setup

```typescript
// 1. Context Setup
// ui/hooks/useService.ts
export const ServiceContext = createContext<Service<any> | null>(null);

export function useService<T>() {
  const service = useContext(ServiceContext);
  if (!service) throw new Error("useService must be used within ServiceProvider");
  return service as Service<T>;
}

// 2. Query Hooks
// ui/hooks/useQueries.ts
export function useItems<T>() {
  const service = useService<T>();
  return useQuery({
    queryKey: ['items'],
    queryFn: () => service.getAll()
  });
}

export function useCreateItem<T>() {
  const service = useService<T>();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<T, "id">) => service.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      eventBus.publish('item:created');
    }
  });
}

// 3. Component Example
// ui/components/ItemList.tsx
export function ItemList<T>() {
  const { data: items, isLoading } = useItems<T>();
  const createItem = useCreateItem<T>();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {items?.map(item => (
        <ItemComponent key={item.id} item={item} />
      ))}
    </div>
  );
}
```

### 5. Application Setup

```typescript
// App.tsx
function App() {
  const repository = new InMemoryRepository<YourEntity>();
  const service = new Service(repository);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <ServiceContext.Provider value={service}>
        <Layout>
          <ItemList />
        </Layout>
      </ServiceContext.Provider>
    </QueryClientProvider>
  );
}
```

## Implementation Notes

1. **Type Safety**
   - Use TypeScript generics throughout
   - Define strict interfaces
   - Maintain type consistency across layers

2. **State Management**
   - React Query for server state
   - Context for dependency injection
   - Local state for UI concerns

3. **Event System**
   - Use for cross-component communication
   - Handle optimistic updates
   - Maintain data consistency

4. **Error Handling**
```typescript
try {
  await service.operation();
} catch (error) {
  if (error instanceof DomainError) {
    // Handle domain-specific error
  } else {
    // Handle general error
  }
}
```

## Dependencies Required

```json
{
  "dependencies": {
    "@tanstack/react-query": "latest",
    "react": "latest",
    "tailwindcss": "latest",
    "tailwind-styled-components": "latest"
  },
  "devDependencies": {
    "typescript": "latest"
  }
}
