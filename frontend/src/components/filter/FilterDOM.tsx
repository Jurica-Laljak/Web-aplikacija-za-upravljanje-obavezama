import FilterContentHeader from "./FilterContentHeader";
import { useLocation } from "react-router";
import "../../styles/filter/filter-content.css";
import FilterContentArea from "./FilterContentArea";
import { useEffect, useRef } from "react";

function FilterDOM() {
  const location = useLocation();

  return (
    <div id="filter-container-wrapper">
      <FilterContentHeader
        type={location.pathname.replace("/filter/", "")}
      ></FilterContentHeader>
      <FilterContentArea
        type={[location.pathname.replace("/filter/", ""), "filter"].join("")}
      ></FilterContentArea>
    </div>
  );
}

export default FilterDOM;
