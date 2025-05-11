import { Filter } from "../../interfaces/filter/Filter";
import { DateType } from "../../interfaces/type/DateType";

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
