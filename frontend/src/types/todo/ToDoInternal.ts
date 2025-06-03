import { ToDoDto } from "../../../../shared/todo/ToDo.dto";

export interface ToDoInternal extends ToDoDto {
  virtualGroupId: number | null;
}
