import { Filter } from "../../backend/src/interfaces/filter/Filter";
import { DateType } from "../../backend/src/interfaces/type/DateType";

export interface SizeFilterDto extends Filter {
  size: number;
}

export interface PrefixFilterDto extends Filter {
  prefix: string;
}

export interface PriorityFilterDto extends Filter {
  lowerbound: string;
  higherbound: string;
}

export interface TimePeriodFilterDto extends Filter {
  datetype: DateType;
  lowerbound: string;
  higherbound: string;
}
