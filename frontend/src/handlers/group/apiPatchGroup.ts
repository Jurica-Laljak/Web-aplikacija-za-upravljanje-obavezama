import { call } from "../../api/call";
import { ListContextType } from "../../types/list/ListContextType";
import { UserContextType } from "../../types/user/UserContext";

export async function apiPatchGroup(
  object: Object,
  userContext: UserContextType,
  listContext: ListContextType
) {
  if ("groupid" in object) {
    var groupid = object.groupid;
    delete object.groupid;
    call<any, any>(
      `/group/${userContext.listid}/${groupid}`,
      "patch",
      object,
      userContext
    ).then(() => listContext.updateGroup(groupid, object));
  }
}
