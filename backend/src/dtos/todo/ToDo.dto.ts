import { PrefixDto } from "../filter/Prefix.dto";

export interface ToDoDto {
  content: string;
  dueDate?: Date;
  startDate?: Date;
  timeCreated: Date;
  depth: number;
  priority: number;
  groupId?: number;
  isOpened: boolean;
  isForced: boolean;
  isArchived: boolean;
  serialNumber: number;
  toDos: ToDoDto[];
  prefixes: PrefixDto[];
}
