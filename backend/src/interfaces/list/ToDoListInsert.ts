export interface ToDoListInsert {
  userid: number;
  name: string;
  serialNumber: number;
  highLevelSort?: string;
  midLevelSort?: string;
  lowLevelSort?: string;
  highlightdefault?: boolean;
  defaultGroupId?: number;
}
