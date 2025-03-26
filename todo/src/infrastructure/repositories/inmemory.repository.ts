import { Repository } from "../../domain/repository/repository";

export class InMemoryRepository<T extends { id: string }>
  implements Repository<T>
{
  protected items: T[] = [];

  async findAll(): Promise<T[]> {
    return [...this.items];
  }

  async findById(id: string): Promise<T | undefined> {
    return this.items.find((item) => item.id === id);
  }

  async create(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T> {
    const item = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as T;
    this.items.push(item);
    return item;
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Item not found");

    this.items[index] = { ...this.items[index], ...updates, updatedAt: new Date() };
    return this.items[index];
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id);
  }
}