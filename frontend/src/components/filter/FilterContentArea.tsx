import { useContext } from "react";
import { FilterContext } from "../../context/filterContext";
import { FilterContextType } from "../../types/filter/FilterContextType";
import FilterItem from "./FilterItem";

function FilterContentArea(props: { type: string }) {
  const filterContext = useContext(FilterContext) as FilterContextType;

  // alert(`In context area - ${filterContext.filters}`);

  return (
    <div id="filter-content-wrapper">
      {filterContext.filters.map((f) => {
        // alert(`Check! ${f.type} ? ${props.type}`);
        if (f.type === props.type) {
          return <FilterItem key={f.filterid} f={f}></FilterItem>;
        } else {
          return <></>;
        }
      })}
    </div>
  );
}

export default FilterContentArea;
