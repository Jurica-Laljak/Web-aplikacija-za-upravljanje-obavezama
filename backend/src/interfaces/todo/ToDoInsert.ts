export interface ToDoInsert {
  content: string;
  dueDate?: Date;
  startDate?: Date;
  depth?: number;
  priority?: number;
  groupId?: number;
  isOpened?: boolean;
  isForced?: boolean;
  isArchived?: boolean;
  serialnumber: number;
}
