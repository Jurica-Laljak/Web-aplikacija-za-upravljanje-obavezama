import { DateType } from "../type/DateType";

export interface FilterInsert {
  name: string;
  type: Type;
  size?: number;
  prefix?: string;
  lowerbound?: string | number | null;
  higherbound?: string | number | null;
}

type Type =
  | "sizefilter"
  | "prefixfilter"
  | "priorityfilter"
  | "timeperiodfilter";
