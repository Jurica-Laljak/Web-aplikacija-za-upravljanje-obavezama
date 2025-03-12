import ListItem from "./ListItem";
import Prefix from "../filter/Prefix";

interface ToDo extends ListItem {
  content: string;
  dueDate?: Date;
  startDate?: Date;
  createDate: Date;
  depth: number;
  priority: number;
  hyperlink: URL;
  groupId?: number;
  toDos: ToDo[];
  prefixes: Prefix[];
}

export = ToDo;
