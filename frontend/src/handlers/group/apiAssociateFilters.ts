import { GroupDto } from "../../../../shared/group/Group.dto";
import { call } from "../../api/call";
import { assertIsNumber } from "../../helper/aseertIsNumber";
import { FilterContextType } from "../../types/filter/FilterContextType";
import { ListContextType } from "../../types/list/ListContextType";
import { CheckboxFormData } from "../../types/other/CheckboxArgs";
import { UserContextType } from "../../types/user/UserContext";

export async function apiAssociateFilters(
  groupid: number,
  array: Array<CheckboxFormData>,
  userContext: UserContextType,
  listContext: ListContextType
) {
  const filterIdArray = array
    .filter((el) => (el.checked ? true : false))
    .map((el) => el.key);
  await call<any, any>(
    `/group/${userContext.listid}/${groupid}/filter`,
    "put",
    {
      filters: filterIdArray,
    },
    userContext
  ).then(() => listContext.updateGroup(groupid, { filterids: filterIdArray }));
}
