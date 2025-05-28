import { ToDoGroup } from "../../backend/src/interfaces/group/ToDoGroup";
import { ToDoList } from "../../backend/src/interfaces/list/ToDoList";
import { ToDo } from "../../backend/src/interfaces/todo/ToDo";

export interface ToDoListDto extends ToDoList {
  groups: ToDoGroup[];
  todos: ToDo[];
}
