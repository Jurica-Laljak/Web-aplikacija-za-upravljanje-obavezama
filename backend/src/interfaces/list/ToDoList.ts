import ListItem from "./ListItem";

interface ToDoList {
  id: number;
  name: string;
  serialNumber: number;
  highLevelSort: string;
  midLevelSort?: string;
  lowLevelSort?: string;
  timeCreated: Date;
  items: ListItem[];
}

export = ToDoList;
