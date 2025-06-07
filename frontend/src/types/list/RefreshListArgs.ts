import { SortType } from "../../../../shared/list/SortType";
import { FilterInternal } from "../filter/FilterInternal";
import { GroupInternal } from "../group/GroupInternal";
import { ToDoInternal } from "../todo/ToDoInternal";

export default interface RefreshListArgs {
  setForceRefresh: any;
  highlevelsort: SortType;
  midlevelsort: SortType | "";
  lowlevelsort: SortType | "";
  groups: Array<GroupInternal>;
  setGroups: React.Dispatch<React.SetStateAction<GroupInternal[]>>;
  todos: Array<ToDoInternal>;
  setTodos: React.Dispatch<React.SetStateAction<ToDoInternal[]>>;
  setUngroupedTodos: React.Dispatch<React.SetStateAction<number[]>>;
  filters: FilterInternal[];
  invokeRefresh: boolean;
}
