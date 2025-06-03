import { Filter } from "../../backend/src/interfaces/filter/Filter";

export interface SizeFilterDto extends Filter {
  size: number;
}

export interface PrefixFilterDto extends Filter {
  prefix: string;
}

export interface PriorityFilterDto extends Filter {
  lowerbound: number | null;
  higherbound: number | null;
}

export interface TimePeriodFilterDto extends Filter {
  lowerbound: string | null;
  higherbound: string | null;
}
