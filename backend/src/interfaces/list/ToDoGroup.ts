import Filter from "../filter/Filter";
import ListItem from "./ListItem";
import ToDo from "./ToDo";

interface ToDoGroup extends ListItem {
  content: string;
  size: number;
  hyperlink: URL;
  isOrdered: boolean;
  highLevelSort: string;
  midLevelSort?: string;
  lowLevelSort?: string;
  toDos: ToDo[];
  filters: Filter[];
}

export = ToDoGroup;
