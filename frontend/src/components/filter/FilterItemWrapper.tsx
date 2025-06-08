import { ReactNode, useContext } from "react";
import { FilterInternal } from "../../types/filter/FilterInternal";
import Button from "../element/Button";
import IconText from "../element/IconText";
import { MdDelete } from "react-icons/md";
import { largeIcon } from "../../types/style/iconStyle";
import { HiCog } from "react-icons/hi";
import { FilterContext } from "../../context/filterContext";
import { UserContext } from "../../context/userContext";
import { ViewContext } from "../../context/viewContext";
import { FilterContextType } from "../../types/filter/FilterContextType";
import { UserContextType } from "../../types/user/UserContext";
import { ViewContextType } from "../../types/other/ViewContext";
import { injectContent } from "../../handlers/app/injectContent";
import { apiPatchFilter } from "../../handlers/filter/apiPatchFilter";
import {
  assertIsPrefixFilter,
  assertIsPriorityFilter,
  assertIsSizeFilter,
  assertIsTimeperiodFilter,
} from "../../helper/filter/assertFilter";
import { apiDeleteFilter } from "../../handlers/filter/apiDeleteFilter";
import { deleteContent } from "../../handlers/app/deleteContent";

function FilterItemWrapper(props: { children?: ReactNode; f: FilterInternal }) {
  const filterContext = useContext(FilterContext) as FilterContextType;
  const userContext = useContext(UserContext) as UserContextType;
  const viewContext = useContext(ViewContext) as ViewContextType;

  function handleFilterEdit() {
    const commonProps = {
      name: props.f.name,
    };
    var typeSpecificProps;
    if (props.f.type === "sizefilter") {
      assertIsSizeFilter(props.f);
      typeSpecificProps = {
        size: props.f.size,
      };
    } else if (props.f.type === "timeperiodfilter") {
      assertIsTimeperiodFilter(props.f);
      typeSpecificProps = {
        lowerbound: props.f.lowerbound,
        higherbound: props.f.higherbound,
      };
    } else if (props.f.type === "priorityfilter") {
      assertIsPriorityFilter(props.f);
      typeSpecificProps = {
        lowerbound: props.f.lowerbound,
        higherbound: props.f.higherbound,
      };
    } else if (props.f.type === "prefixfilter") {
      assertIsPrefixFilter(props.f);
      typeSpecificProps = {
        prefix: props.f.prefix,
      };
    } else {
      return;
    }
    const hiddenProps = { filterid: props.f.filterid, type: props.f.type };
    injectContent(
      viewContext,
      userContext,
      filterContext,
      `Uredite ${props.f.type.replace("filter", "")} filtar`,
      { ...commonProps, ...typeSpecificProps },
      apiPatchFilter,
      { ...commonProps, ...typeSpecificProps, ...hiddenProps }
    );
  }

  function handleFilterDelete() {
    deleteContent(
      viewContext,
      userContext,
      filterContext,
      `${props.f.type.replace("filter", "")} filtar`,
      { filterid: props.f.filterid },
      apiDeleteFilter
    );
  }

  return (
    <div className="flex-div-column filter-wrapper">
      <div className="flex-div-row filter-subwrapper">
        <div>
          [{props.f.filterid}] {props.f.name}
        </div>
        <div className="flex-div-row">
          <Button className="hover filter-operator" onClick={handleFilterEdit}>
            <IconText icon={<HiCog />} iconStyle={largeIcon}>
              Uredite filtar
            </IconText>
          </Button>
          <Button
            className="hover filter-operator"
            onClick={handleFilterDelete}
          >
            <IconText icon={<MdDelete />} iconStyle={largeIcon}>
              Obrišite filtar
            </IconText>
          </Button>
        </div>
      </div>
      <div className="flex-div-column filter-content-wrapper">
        {props.children}
      </div>
    </div>
  );
}

export default FilterItemWrapper;
