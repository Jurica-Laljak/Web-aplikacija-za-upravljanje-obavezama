import ListItem from "./ListItem";
import Filter from "../filter/Filter";
import ToDoGroup from "./ToDoGroup";

interface ToDoList {
  id: number;
  name: string;
  size: number;
  highLevelSort: string;
  midLevelSort?: string;
  lowLevelSort?: string;
  toDos: ListItem[];
  groups: ToDoGroup[];
  filters: Filter[];
}

export = ToDoList;
