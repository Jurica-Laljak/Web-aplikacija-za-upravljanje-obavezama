import { FilterInternal } from "../../types/filter/FilterInternal";

export function sortByFilterIdAsc(a: FilterInternal, b: FilterInternal) {
  if (a.filterid > b.filterid) return 1;
  else if (a.filterid < b.filterid) return -1;
  return 0;
}
