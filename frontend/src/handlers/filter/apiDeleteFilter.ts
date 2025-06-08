import { call } from "../../api/call";
import { assertIsNumber } from "../../helper/aseertIsNumber";
import { FilterContextType } from "../../types/filter/FilterContextType";
import { ListContextType } from "../../types/list/ListContextType";
import { UserContextType } from "../../types/user/UserContext";

export function apiDeleteFilter(
  object: Object,
  userContext: UserContextType,
  filterContext: FilterContextType
) {
  if ("filterid" in object) {
    var filterid = object.filterid;
    delete object.filterid;
    call<any, any>(`/filter/${filterid}`, "delete", {}, userContext).then(
      () => {
        assertIsNumber(filterid);
        filterContext.deleteFilter(filterid);
      }
    );
  }
}
