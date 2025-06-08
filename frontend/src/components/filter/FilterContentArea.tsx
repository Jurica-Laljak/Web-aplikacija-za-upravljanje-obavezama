import { useContext } from "react";
import { FilterContext } from "../../context/filterContext";
import { FilterContextType } from "../../types/filter/FilterContextType";
import FilterItem from "./FilterItem";
import Button from "../element/Button";
import IconText from "../element/IconText";
import { IoAddCircleSharp } from "react-icons/io5";
import { largeIcon } from "../../types/style/iconStyle";
import { handleAddFilter } from "../../helper/filter/handleAddFilter";
import { UserContext } from "../../context/userContext";
import { UserContextType } from "../../types/user/UserContext";
import { ViewContext } from "../../context/viewContext";
import { ViewContextType } from "../../types/other/ViewContext";

function FilterContentArea(props: { type: string }) {
  const filterContext = useContext(FilterContext) as FilterContextType;
  const userContext = useContext(UserContext) as UserContextType;
  const viewContext = useContext(ViewContext) as ViewContextType;

  // alert(`In context area - ${filterContext.filters}`);

  return (
    <div
      className="filter-page-wrapper"
      id={
        filterContext.filters.filter((f) =>
          f.type === props.type ? true : false
        ).length == 0
          ? "filter-div-center"
          : ""
      }
    >
      {filterContext.filters.length > 0 ? (
        <div id="filter-content-wrapper">
          {filterContext.filters.map((f) => {
            // alert(`Check! ${f.type} ? ${props.type}`);
            if (f.type === props.type) {
              return (
                <FilterItem key={`filter-${f.filterid}`} f={f}></FilterItem>
              );
            } else {
              return <></>;
            }
          })}
        </div>
      ) : (
        <></>
      )}
      <Button
        className="interactable list-add-option"
        style={{
          border: "none",
          color: "white",
          alignSelf: "start",
          marginLeft: "0.5rem",
          marginTop: "0.5rem",
        }}
        onClick={() =>
          handleAddFilter(props.type, viewContext, userContext, filterContext)
        }
      >
        <IconText icon={<IoAddCircleSharp />} iconStyle={largeIcon}>
          Dodajte <i>{props.type.replace("filter", "")}</i> filtar
        </IconText>
      </Button>
    </div>
  );
}

export default FilterContentArea;
