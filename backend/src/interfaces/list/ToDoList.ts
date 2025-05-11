import ListItem from "./ListItem";
import { ToDoListInsert } from "./ToDoListInsert";

export interface ToDoList extends Required<ToDoListInsert> {
  listid: number;
  timeCreated: Date;
}
