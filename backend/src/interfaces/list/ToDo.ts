import ListItem from "./ListItem";
import Prefix from "../filter/PrefixFilter";

interface ToDo extends ListItem {
  content: string;
  dueDate?: Date;
  startDate?: Date;
  timeCreated: Date;
  depth: number;
  priority: number;
  groupId?: number;
  isOpened: boolean;
  isForced: boolean;
  isArchived: boolean;
  toDos: ToDo[];
  prefixes: Prefix[];
}

export = ToDo;
