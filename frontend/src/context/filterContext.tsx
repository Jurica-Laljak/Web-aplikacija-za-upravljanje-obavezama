import React, { useState } from "react";
import {
  PrefixFilterDto,
  PriorityFilterDto,
  SizeFilterDto,
  TimePeriodFilterDto,
} from "../../../shared/filter/Filter.dto";
import { Filter } from "../../../backend/src/interfaces/filter/Filter";
import {
  assertIsPrefixFilter,
  assertIsPriorityFilter,
  assertIsSizeFilter,
  assertIsTimeperiodFilter,
} from "../helper/assertFilter";
import { FilterContextType } from "../types/filter/FilterContextType";

export const FilterContext = React.createContext<FilterContextType | null>(
  null
);

export const FilterContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sizefilters, setSizefilters] = useState<Map<number, SizeFilterDto>>(
    new Map()
  );
  const [timeperiodfilters, setTimeperiodfilters] = useState<
    Map<number, TimePeriodFilterDto>
  >(new Map());
  const [priorityfilters, setPriorityfilters] = useState<
    Map<number, PriorityFilterDto>
  >(new Map());
  const [prefixfilters, setPrefixfilters] = useState<
    Map<number, PrefixFilterDto>
  >(new Map());

  function saveFilters<T extends Filter>(type: string, filterDtos: T[]) {
    switch (type) {
      case "size":
        const newMap1: Map<number, SizeFilterDto> = new Map(sizefilters);
        for (let f of filterDtos) {
          assertIsSizeFilter(f);
          newMap1.set(f.filterid, f);
        }
        setSizefilters(newMap1);
        break;
      case "timeperiod":
        const newMap2: Map<number, TimePeriodFilterDto> = new Map(
          timeperiodfilters
        );
        for (let f of filterDtos) {
          assertIsTimeperiodFilter(f);
          newMap2.set(f.filterid, f);
        }
        setTimeperiodfilters(newMap2);
        break;
      case "priority":
        const newMap3: Map<number, PriorityFilterDto> = new Map(
          priorityfilters
        );
        for (let f of filterDtos) {
          assertIsPriorityFilter(f);
          newMap3.set(f.filterid, f);
        }
        setPriorityfilters(newMap3);
        break;
      case "prefix":
        const newMap4: Map<number, PrefixFilterDto> = new Map(prefixfilters);
        for (let f of filterDtos) {
          assertIsPrefixFilter(f);
          newMap4.set(f.filterid, f);
        }
        setPrefixfilters(newMap4);
        break;
    }
  }

  function updateFilter<T extends Filter>(
    type: string,
    id: number,
    updateObj: Partial<T>
  ) {
    switch (type) {
      case "size":
        const newMap1: Map<number, SizeFilterDto> = new Map(sizefilters);
        assertIsSizeFilter(updateObj);
        const object1 = newMap1.get(id);
        newMap1.set(id, { ...object1, ...updateObj });
        setSizefilters(newMap1);
        break;
      case "timeperiod":
        const newMap2: Map<number, TimePeriodFilterDto> = new Map(
          timeperiodfilters
        );
        assertIsTimeperiodFilter(updateObj);
        const object2 = newMap2.get(id);
        newMap2.set(id, { ...object2, ...updateObj });
        setTimeperiodfilters(newMap2);
        break;
      case "priority":
        const newMap3: Map<number, PriorityFilterDto> = new Map(
          priorityfilters
        );
        assertIsPriorityFilter(updateObj);
        const object3 = newMap3.get(id);
        newMap3.set(id, { ...object3, ...updateObj });
        setPriorityfilters(newMap3);
        break;
      case "prefix":
        const newMap4: Map<number, PrefixFilterDto> = new Map(prefixfilters);
        assertIsPrefixFilter(updateObj);
        const object4 = newMap4.get(id);
        newMap4.set(id, { ...object4, ...updateObj });
        setPrefixfilters(newMap4);
        break;
    }
  }

  function deleteFilter(type: string, id: number) {
    switch (type) {
      case "size":
        const newMap1: Map<number, SizeFilterDto> = new Map(sizefilters);
        newMap1.delete(id);
        setSizefilters(newMap1);
        break;
      case "timeperiod":
        const newMap2: Map<number, TimePeriodFilterDto> = new Map(
          timeperiodfilters
        );
        newMap2.delete(id);
        setTimeperiodfilters(newMap2);
        break;
      case "priority":
        const newMap3: Map<number, PriorityFilterDto> = new Map(
          priorityfilters
        );
        newMap3.delete(id);
        setPriorityfilters(newMap3);
        break;
      case "prefix":
        const newMap4: Map<number, PrefixFilterDto> = new Map(prefixfilters);
        newMap4.delete(id);
        setPrefixfilters(newMap4);
        break;
    }
  }

  return (
    <FilterContext.Provider
      value={{
        sizefilters,
        timeperiodfilters,
        prefixfilters,
        priorityfilters,
        saveFilters,
        updateFilter,
        deleteFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
