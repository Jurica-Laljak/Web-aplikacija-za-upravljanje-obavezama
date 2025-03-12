import Filter from "./Filter";

interface PriorityFilter extends Filter {
  highBound?: number;
  lowBound?: number;
}

export = PriorityFilter;
