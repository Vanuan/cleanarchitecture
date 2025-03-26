import { Todo } from "../entities/todo";
import { Repository } from "../repository/repository";

export interface TodoRepository extends Repository<Todo> {}