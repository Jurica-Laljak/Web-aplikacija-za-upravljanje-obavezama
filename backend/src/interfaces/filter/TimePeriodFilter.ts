import Filter from "./Filter";

interface TimePeriodFilter extends Filter {
  highBound?: number;
  lowBound?: number;
}

export = TimePeriodFilter;
