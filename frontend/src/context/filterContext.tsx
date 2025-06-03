import React, { useState } from "react";
import { Filter } from "../../../backend/src/interfaces/filter/Filter";
import { FilterContextType } from "../types/filter/FilterContextType";
import { FilterInternal } from "../types/filter/FilterInternal";
import { sortByFilterIdAsc } from "../helper/filter/sortByFilterIdAsc";

export const FilterContext = React.createContext<FilterContextType | null>(
  null
);

export const FilterContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<Array<FilterInternal>>([]);

  function saveFilters(filterDtos: Filter[]) {
    for (let f of filterDtos) {
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
        let newObj = { ...f, type: determinedType };

        setFilters((prev) => {
          prev.push(newObj);
          return prev.sort(sortByFilterIdAsc);
        });
      }
    }
  }

  function updateFilter(newObject: FilterInternal) {
    const id = newObject.filterid;
    setFilters((prev) => {
      prev.splice(
        prev.findIndex((el) => {
          el.filterid === id ? true : false;
        }),
        1,
        newObject
      );
      return prev.sort(sortByFilterIdAsc);
    });
  }

  function deleteFilter(id: number) {
    setFilters((prev) => {
      prev.splice(
        prev.findIndex((el) => {
          el.filterid === id ? true : false;
        }),
        1
      );
      return prev.sort(sortByFilterIdAsc);
    });
  }

  return (
    <FilterContext.Provider
      value={{
        filters,
        saveFilters,
        updateFilter,
        deleteFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
