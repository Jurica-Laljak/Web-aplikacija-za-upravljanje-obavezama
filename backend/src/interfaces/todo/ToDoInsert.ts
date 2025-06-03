export interface ToDoInsert {
  content: string;
  duedate?: Date;
  priority?: number;
  groupid?: number | null;
  // depth?: number;
  // issuedate?: Date;
  // parenttodoid?: number;
  // isarchived?: boolean;
  // serialnumber: number;
}
