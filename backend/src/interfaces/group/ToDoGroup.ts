import { ToDoGroupInsert } from "./ToDoGroupInsert";

export interface ToDoGroup extends Required<ToDoGroupInsert> {
  groupid: number;
  timeCreated: Date;
  listid: number;
}
