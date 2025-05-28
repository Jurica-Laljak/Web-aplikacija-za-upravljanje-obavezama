import { ToDo } from "../../backend/src/interfaces/todo/ToDo";

export interface ToDoDto extends ToDo {
  todos: ToDoDto[];
  prefixes: number[];
}
