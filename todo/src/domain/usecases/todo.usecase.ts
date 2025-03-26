import { Todo } from "../entities/todo";
import { UseCase } from "./usecase";

export interface TodoUseCase extends UseCase&lt;Todo&gt; {}