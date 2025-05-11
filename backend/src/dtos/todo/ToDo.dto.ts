import { ToDo } from "../../interfaces/todo/ToDo";

export interface ToDoDto extends ToDo {
  todos: ToDoDto[];
  prefixes: number[];
}
