import ListItem from "../list/ListItem";

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
  prefixes: number[];
}

export = ToDo;
