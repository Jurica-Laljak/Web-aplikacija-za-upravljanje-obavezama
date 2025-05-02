import { ToDoDto } from "../todo/ToDo.dto";

export interface GroupDto {
  id: number;
  name: string;
  size: number;
  isOrdered: boolean;
  highLevelSort: string;
  midLevelSort: string;
  lowLevelSort: string;
  timeCreated: Date;
  isOpened: boolean;
  filterId: number;
  toDos: ToDoDto[];
}
