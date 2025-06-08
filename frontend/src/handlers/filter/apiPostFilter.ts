import { call } from "../../api/call";
import { UserContextType } from "../../types/user/UserContext";
import { Filter } from "../../../../backend/src/interfaces/filter/Filter";
import { FilterContextType } from "../../types/filter/FilterContextType";
import { FilterInternal } from "../../types/filter/FilterInternal";
import { assertIsString } from "../../helper/assertIsString";

export async function apiPostFilter(
  object: Object,
  userContext: UserContextType,
  filterContext: FilterContextType
) {
  if ("type" in object) {
    const type = object.type;
    if (type === "priorityfilter" || type === "timeperiodfilter") {
      call<any, Filter>(
        `/filter/`,
        "post",
        { ...{ higherbound: null, lowerbound: null }, ...object },
        userContext
      ).then((data) => {
        const newArr: Filter[] = [];
        newArr.push({
          ...{ higherbound: null, lowerbound: null },
          ...object,
          ...data,
        });
        filterContext.saveFilters([...newArr]);
      });
    } else if (type === "prefixfilter") {
      call<any, Filter>(`/filter/`, "post", object, userContext).then(
        (data) => {
          const newArr: Filter[] = [];
          if ("prefix" in object) {
            var prefix = object.prefix;
            assertIsString(prefix);
            object.prefix = prefix.toLowerCase();
            newArr.push({
              ...object,
              ...data,
            });
            filterContext.saveFilters([...newArr]);
          }
        }
      );
    } else {
      call<any, Filter>(`/filter/`, "post", object, userContext).then(
        (data) => {
          const newArr: Filter[] = [];
          newArr.push({
            ...object,
            ...data,
          });
          filterContext.saveFilters([...newArr]);
        }
      );
    }
  }
}
