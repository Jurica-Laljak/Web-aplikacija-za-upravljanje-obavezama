import { GroupDto } from "../../../../shared/group/Group.dto";
import { ToDoDto } from "../../../../shared/todo/ToDo.dto";

export type ListContextType = {
  name: string;
  setName: any;
  highlevelsort: string;
  midlevelsort: string;
  lowlevelsort: string;
  groups: Array<GroupDto>;
  todos: Array<ToDoDto>;
  ungroupedTodos: Array<number>;
  flushContent: any;
  createTodos: any;
  updateTodo: any;
  deleteTodo: any;
  createGroups: any;
  updateGroup: any;
  deleteGroup: any;
  updateListAttributes: any;
};
