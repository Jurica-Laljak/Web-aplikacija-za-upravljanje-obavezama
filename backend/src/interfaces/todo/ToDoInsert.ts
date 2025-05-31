export interface ToDoInsert {
  content: string;
  duedate?: Date;
  issuedate?: Date;
  depth?: number;
  priority?: number;
  groupid?: number;
  // parenttodoid?: number;
  // isarchived?: boolean;
  // serialnumber: number;
}
