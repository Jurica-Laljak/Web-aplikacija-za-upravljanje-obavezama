import { ToDoInsert } from "../../interfaces/todo/ToDoInsert";
import { PrefixDto } from "../filter/Prefix.dto";

export interface ToDoDto extends ToDoInsert {
  toDos: ToDoDto[];
  prefixes: PrefixDto[];
}
