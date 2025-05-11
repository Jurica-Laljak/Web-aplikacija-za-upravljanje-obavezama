import { ToDoGroup } from "../../interfaces/group/ToDoGroup";
import { ToDoList } from "../../interfaces/list/ToDoList";
import { ToDo } from "../../interfaces/todo/ToDo";

export interface ToDoListDto extends ToDoList {
  groups: ToDoGroup[];
  todos: ToDo[];
}
