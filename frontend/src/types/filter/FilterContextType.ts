import { Filter } from "../../../../backend/src/interfaces/filter/Filter";
import {
  PrefixFilterDto,
  PriorityFilterDto,
  SizeFilterDto,
  TimePeriodFilterDto,
} from "../../../../shared/filter/Filter.dto";
import { FilterName } from "../../data/filterNames";
import { FilterInternal } from "./FilterInternal";

export type FilterContextType = {
  filters: Array<FilterInternal>;
  // sizefilters: Map<number, SizeFilterDto>;
  // saveSizeFilters: (sf: SizeFilterDto) => void;
  // updateSizeFilter: (id: string) => void;
  // deleteSizeFilter: (id: string) => void;
  // timeperiodfilters: Map<number, TimePeriodFilterDto>;
  // saveTimeperiodFilters: (tpf: TimePeriodFilterDto) => void;
  // updateTimeperiodFilter: (id: string) => void;
  // deleteTimeperiodFilter: (id: string) => void;
  // priorityfilters: Map<number, PriorityFilterDto>;
  // savePriorityFilters: (pf: PriorityFilterDto) => void;
  // updatePriorityFilter: (id: string) => void;
  // deletePriorityFilter: (id: string) => void;
  // prefixfilters: Map<number, PrefixFilterDto>;
  // savePrefixFilters: (sf: SizeFilterDto) => void;
  // updatePrefixFilter: (id: string) => void;
  // deletePrefixFilter: (id: string) => void;
  saveFilters: (filterDtos: Filter[]) => void;
  updateFilter: (newObject: FilterInternal) => void;
  deleteFilter: (id: number) => void;
};
