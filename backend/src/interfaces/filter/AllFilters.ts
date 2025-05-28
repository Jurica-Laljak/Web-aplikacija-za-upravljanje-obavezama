import {
  SizeFilterDto,
  PrefixFilterDto,
  PriorityFilterDto,
  TimePeriodFilterDto,
} from "../../../../shared/filter/Filter.dto";

export interface AllFilters {
  sizefilters: SizeFilterDto[];
  prefixfilters: PrefixFilterDto[];
  priorityfilters: PriorityFilterDto[];
  timeperiodfilters: TimePeriodFilterDto[];
}
