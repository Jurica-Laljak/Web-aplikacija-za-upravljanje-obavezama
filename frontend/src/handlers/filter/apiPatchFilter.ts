import { call } from "../../api/call";
import { assertIsNumber } from "../../helper/aseertIsNumber";
import { FilterContextType } from "../../types/filter/FilterContextType";
import { ListContextType } from "../../types/list/ListContextType";
import { UserContextType } from "../../types/user/UserContext";

export function apiPatchFilter(
  object: Object,
  userContext: UserContextType,
  filterContext: FilterContextType
) {
  alert(JSON.stringify(object));
  if ("filterid" in object) {
    var filterid = object.filterid;
    delete object.filterid;
    if ("lowerbound" in object && object.lowerbound === "null") {
      object.lowerbound = null;
    } else if ("higherbound" in object && object.higherbound === "null") {
      object.higherbound = null;
    }
    call<any, any>(`/filter/${filterid}`, "patch", object, userContext).then(
      () => {
        assertIsNumber(filterid);
        filterContext.updateFilter(filterid, { ...object, filterid: filterid });
      }
    );
  }
}
