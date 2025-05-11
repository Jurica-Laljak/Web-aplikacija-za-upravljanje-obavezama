import { DateType } from "../type/DateType";

export interface FilterInsert {
  name: string;
  type: Type;
  size?: number;
  prefix?: string;
  datetype?: DateType;
  lowerbound?: number | Date;
  higherbound?: number | Date;
}

type Type =
  | "sizefilter"
  | "prefixfilter"
  | "priorityfilter"
  | "timeperiodfilter";
