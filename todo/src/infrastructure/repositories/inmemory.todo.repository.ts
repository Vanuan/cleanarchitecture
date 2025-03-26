import { Todo } from "../../domain/entities/todo";
import { TodoRepository } from "../../domain/repository/todo.repository";
import { InMemoryRepository } from "./inmemory.repository";

export class InMemoryTodoRepository
  extends InMemoryRepository<Todo>
  implements TodoRepository
{
  constructor() {
    super();
  }
}