import { ToDoGroup } from "../../interfaces/group/ToDoGroup";
import { ToDoDto } from "../todo/ToDo.dto";

export interface GroupDto extends Required<ToDoGroup> {
  filters: number[];
  todos: ToDoDto[];
}
