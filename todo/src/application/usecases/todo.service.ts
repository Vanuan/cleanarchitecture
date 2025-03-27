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

  async create(
    data: Omit<Todo, "id" | "createdAt" | "updatedAt" | "tags" | "dueDate"> & {
      dueDate?: Date;
    },
  ): Promise<Todo> {
    const title = data.title;
    const matches = title.match(/^\[(.*?)\]/);
    const tags = matches ? [matches[1]] : [];
    const titleWithoutTags = matches
      ? title.replace(/^\[(.*?)\]\s*/, "")
      : title;

    return this.todoRepository.create({
      ...data,
      title: titleWithoutTags,
      tags: tags,
    });
  }
  async update(id: string, updates: Partial<Todo>): Promise<Todo> {
    const currentTodo = await this.todoRepository.findById(id);
    if (!currentTodo) {
      throw new Error(`Todo with id ${id} not found`);
    }
    let updatedTags = currentTodo.tags;
    let updatedTitle =
      updates.title !== undefined ? updates.title : currentTodo.title;
    if (updates.title !== undefined) {
      // If title is being updated, extract tags from the title
      const matches = updates.title.match(/^\[(.*?)\]/);
      updatedTags = matches ? [matches[1]] : updatedTags;
      updatedTitle = matches
        ? updates.title.replace(/^\[(.*?)\]\s*/, "")
        : updates.title;
    }

    return this.todoRepository.update(id, {
      ...updates,
      title: updatedTitle,
      tags: updatedTags,
      updatedAt: new Date(),
    });
  }

  async delete(id: string): Promise<void> {
    return this.todoRepository.delete(id);
  }
}
