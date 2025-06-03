import { ToDoInsert } from "./ToDoInsert";

export interface ToDo extends Required<ToDoInsert> {
  todoid: number;
  listid: number;
  timecreated: Date;
}
