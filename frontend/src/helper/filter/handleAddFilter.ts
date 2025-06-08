import { FilterInsert } from "../../../../backend/src/interfaces/filter/FilterInsert";
import { injectContent } from "../../handlers/app/injectContent";
import { apiPostFilter } from "../../handlers/filter/apiPostFilter";
import { FilterContextType } from "../../types/filter/FilterContextType";
import { ViewContextType } from "../../types/other/ViewContext";
import { UserContextType } from "../../types/user/UserContext";
import { capitalize } from "../capitalize";

export function handleAddFilter(
  type: string,
  viewContext: ViewContextType,
  userContext: UserContextType,
  filterContext: FilterContextType
) {
  var emptyObj: Partial<FilterInsert>;
  var hiddenObj = { type: type };
  if (type === "sizefilter") {
    emptyObj = {
      name: "",
      size: 0,
    };
  } else if (type === "timeperiodfilter") {
    emptyObj = {
      name: "",
      lowerbound: "",
      higherbound: "",
    };
  } else if (type === "priorityfilter") {
    emptyObj = {
      name: "",
      lowerbound: "",
      higherbound: "",
    };
  } else if (type === "prefixfilter") {
    emptyObj = {
      name: "",
      prefix: "",
    };
  } else {
    return;
  }

  injectContent(
    viewContext,
    userContext,
    filterContext,
    `Dodajte ${type.replace("filter", "")} filtar`,
    emptyObj,
    apiPostFilter,
    hiddenObj
  );
}
