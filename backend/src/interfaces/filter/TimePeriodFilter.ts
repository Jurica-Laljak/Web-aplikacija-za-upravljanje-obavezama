import Filter from "./Filter";

interface TimePeriodFilter extends Filter {
  highBound?: Date;
  lowBound?: Date;
}

export = TimePeriodFilter;
