import { call } from "../../api/call";
import { ListContextType } from "../../types/list/ListContextType";
import { UserContextType } from "../../types/user/UserContext";

export function apiDeleteList(
  object: Object,
  userContext: UserContextType,
  listContext: ListContextType
) {
  call<any, any>(
    `/list/${userContext.listid}`,
    "delete",
    object,
    userContext
  ).then(() => {
    userContext.setLists(
      userContext.lists.filter((l) => l.listid != userContext.listid)
    );
    userContext.setListid(undefined);
    window.location.reload(); // reload page
  });
}
