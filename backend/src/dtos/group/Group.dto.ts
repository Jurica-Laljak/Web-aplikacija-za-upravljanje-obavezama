import { ToDoGroup } from "../../interfaces/group/ToDoGroup";
import { FilterDto } from "../filter/Filter.dto";
import { ToDoDto } from "../todo/ToDo.dto";

export interface GroupDto extends Required<ToDoGroup> {
  filters: FilterDto[];
  todos: ToDoDto[];
}
