import ListItem from "./ListItem";
import ToDo from "./ToDo";

interface ToDoGroup extends ListItem {
  name: string;
  size: number;
  hyperlink: URL;
  isOrdered: boolean;
  highLevelSort: string;
  midLevelSort?: string;
  lowLevelSort?: string;
  timeCreated: Date;
  isOpened: boolean;
  filterId?: number;
  toDos: ToDo[];
}

export = ToDoGroup;
