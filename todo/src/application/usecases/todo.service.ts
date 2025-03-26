import { Todo } from "../../domain/entities/todo";
import { TodoRepository } from "../../domain/repository/todo.repository";
import { TodoUseCase } from "../../domain/usecases/todo.usecase";

export class TodoService implements TodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async getAll(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }

  async getById(id: string): Promise<Todo | undefined> {
    return this.todoRepository.findById(id);
  }

  async create(data: Omit<Todo, "id" | "createdAt" | "updatedAt">): Promise<Todo> {
    return this.todoRepository.create({
      ...data,
    });
  }

  async update(id: string, updates: Partial<Todo>): Promise<Todo> {
    return this.todoRepository.update(id, {
      ...updates,
      updatedAt: new Date(),
    });
  }

  async delete(id: string): Promise<void> {
    return this.todoRepository.delete(id);
  }
}
