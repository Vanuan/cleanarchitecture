import { createContext, useContext } from "react";
import { TodoService } from "../../application/usecases/todo.service";

export const ServiceContext = createContext<TodoService | null>(null);

export function useService() {
  const service = useContext(ServiceContext);
  if (!service) {
    throw new Error("useService must be used within ServiceProvider");
  }
  return service;
}