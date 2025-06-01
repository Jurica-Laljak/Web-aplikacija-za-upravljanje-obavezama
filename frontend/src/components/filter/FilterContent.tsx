import FilterContentHeader from "./FilterContentHeader";
import { useLocation } from "react-router";
import "../../styles/filter/filter-content.css";
import FilterContentArea from "./FilterContentArea";

function FilterDOM() {
  const location = useLocation();

  return (
    <div id="filter-container-wrapper">
      <FilterContentHeader
        type={location.pathname.replace("/filter/", "")}
      ></FilterContentHeader>
      <FilterContentArea
        type={location.pathname.replace("/filter/", "")}
      ></FilterContentArea>
    </div>
  );
}

export default FilterDOM;
