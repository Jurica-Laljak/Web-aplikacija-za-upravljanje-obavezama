import React, { useContext, useState } from "react";
import { Filter } from "../../../backend/src/interfaces/filter/Filter";
import { FilterContextType } from "../types/filter/FilterContextType";
import { FilterInternal } from "../types/filter/FilterInternal";
import { GroupInternal } from "../types/group/GroupInternal";
import { refreshList } from "../helper/todo/refreshList";
export const FilterContext = React.createContext<FilterContextType | null>(
  null
);

export const FilterContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<Array<FilterInternal>>([]);
  const [refreshedFilters, setRefreshedFilters] = useState<boolean>(false);

  function saveFilters(filterDtos: Filter[]) {
    const newFilters: Array<FilterInternal> = [];
    for (let f of filterDtos.sort((a, b) => {
      if (a.filterid < b.filterid) return -1;
      else if (a.filterid > b.filterid) return 1;
      else return 0;
    })) {
      let determinedType: string | undefined;
      //
      if ("size" in f) {
        determinedType = "sizefilter";
      }
      //
      else if ("prefix" in f) {
        determinedType = "prefixfilter";
      }
      //
      else if ("lowerbound" in f && "higherbound" in f) {
        //
        if (Number(f.lowerbound) || Number(f.higherbound)) {
          determinedType = "priorityfilter";
        }
        //
        else {
          determinedType = "timeperiodfilter";
        }
      }

      if (determinedType) {
        newFilters.push({ ...f, type: determinedType });
      }
    }

    setFilters([...filters, ...newFilters]);
    //
    // setRefreshedFilters(!refreshedFilters);
    // alert("refreshed filters");
  }

  function updateFilter(id: number, newObject: Partial<GroupInternal>) {
    const newState = [...filters];
    const filterIndex = filters.findIndex((f) =>
      f.filterid == id ? true : false
    );
    newState[filterIndex] = { ...filters[filterIndex], ...newObject };
    setFilters([...newState]);
  }

  function deleteFilter(id: number) {
    const newState = [...filters];
    const filterIndex = filters.findIndex((f) =>
      f.filterid == id ? true : false
    );
    newState.splice(filterIndex, 1);
    setFilters([...newState]);
  }

  return (
    <FilterContext.Provider
      value={{
        filters,
        saveFilters,
        updateFilter,
        deleteFilter,
        refreshedFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
