import { Todo } from "../../domain/entities/todo";
import { TodoRepository } from "../../domain/repository/todo.repository";

const TODO_STORAGE_KEY = "todos";

export class LocalStorageTodoRepository implements TodoRepository {
  async findAll(): Promise<Todo[]> {
    const todosString = localStorage.getItem(TODO_STORAGE_KEY);
    return todosString ? JSON.parse(todosString) : [];
  }

  async findById(id: string): Promise<Todo | undefined> {
    const todos = await this.findAll();
    return todos.find((todo) => todo.id === id);
  }

  async create(
    data: Omit<Todo, "id" | "createdAt" | "updatedAt">,
  ): Promise<Todo> {
    const todos = await this.findAll();
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    todos.push(newTodo);
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    return newTodo;
  }

  async update(id: string, updates: Partial<Todo>): Promise<Todo> {
    const todos = await this.findAll();
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      throw new Error("Todo not found");
    }
    const updatedTodo = { ...todos[index], ...updates, updatedAt: new Date() };
    todos[index] = updatedTodo;
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    return updatedTodo;
  }

  async delete(id: string): Promise<void> {
    let todos = await this.findAll();
    todos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
  }
}
