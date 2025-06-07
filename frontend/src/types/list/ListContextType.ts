import { GroupInternal } from "../group/GroupInternal";
import { ToDoInternal } from "../todo/ToDoInternal";

export type ListContextType = {
  name: string;
  setName: any;
  highlevelsort: string;
  midlevelsort: string;
  lowlevelsort: string;
  groups: Array<GroupInternal>;
  setGroups: any;
  todos: Array<ToDoInternal>;
  setTodos: any;
  ungroupedTodos: Array<number>;
  flushContent: any;
  createTodos: any;
  updateTodo: any;
  deleteTodo: any;
  createGroups: any;
  updateGroup: any;
  deleteGroup: any;
  updateListAttributes: any;
  fetchedListData: number;
  setFetchedListData: any;
  callRefreshList: any;
  forceRefresh: boolean;
  setForceRefresh: any;
};
