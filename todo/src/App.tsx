import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TodoList } from "./ui/components/todo/TodoList";
import { TodoService } from "./application/usecases/todo.service";
import { LocalStorageTodoRepository } from "./infrastructure/repositories/localstorage.todo.repository";
import { ServiceContext } from "./ui/hooks/useService";
import { useState } from "react";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [todoRepository] = useState(() => new LocalStorageTodoRepository());
  const [todoService] = useState(() => new TodoService(todoRepository));

  return (
    <QueryClientProvider client={queryClient}>
      <ServiceContext.Provider value={todoService}>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
          <h1 style={{ textAlign: "center" }}>Todo App</h1>
          <TodoList />
        </div>
      </ServiceContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
