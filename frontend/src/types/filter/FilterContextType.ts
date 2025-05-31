import { Filter } from "../../../../backend/src/interfaces/filter/Filter";
import {
  PrefixFilterDto,
  PriorityFilterDto,
  SizeFilterDto,
  TimePeriodFilterDto,
} from "../../../../shared/filter/Filter.dto";
import { FilterName } from "../../data/filterNames";

export type FilterContextType = {
  sizefilters: Map<number, SizeFilterDto>;
  // saveSizeFilters: (sf: SizeFilterDto) => void;
  // updateSizeFilter: (id: string) => void;
  // deleteSizeFilter: (id: string) => void;
  timeperiodfilters: Map<number, TimePeriodFilterDto>;
  // saveTimeperiodFilters: (tpf: TimePeriodFilterDto) => void;
  // updateTimeperiodFilter: (id: string) => void;
  // deleteTimeperiodFilter: (id: string) => void;
  priorityfilters: Map<number, PriorityFilterDto>;
  // savePriorityFilters: (pf: PriorityFilterDto) => void;
  // updatePriorityFilter: (id: string) => void;
  // deletePriorityFilter: (id: string) => void;
  prefixfilters: Map<number, PrefixFilterDto>;
  // savePrefixFilters: (sf: SizeFilterDto) => void;
  // updatePrefixFilter: (id: string) => void;
  // deletePrefixFilter: (id: string) => void;
  saveFilters: <T extends Filter>(type: string, filterDtos: T[]) => void;
  updateFilter: <T extends Filter>(
    type: string,
    id: number,
    updateObj: Partial<T>
  ) => void;
  deleteFilter: (type: string, id: number) => void;
};
