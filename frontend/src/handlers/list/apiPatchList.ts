import { call } from "../../api/call";
import { ListContextType } from "../../types/list/ListContextType";
import { UserContextType } from "../../types/user/UserContext";

export async function apiPatchList(
  object: Object,
  userContext: UserContextType,
  listContext: ListContextType
) {
  call<any, any>(
    `/list/${userContext.listid}`,
    "patch",
    object,
    userContext
  ).then(() => {
    if ("name" in object) {
      const newLists = userContext.lists.map((l) =>
        l.listid == userContext.listid
          ? {
              listid: l.listid,
              name: object.name,
            }
          : l
      );
      userContext.setLists([...newLists]);
      listContext.setName(object.name);
    }

    if ("highlevelsort" in object) {
      listContext.updateListAttributes("highlevelsort", object.highlevelsort);
    }

    if ("midlevelsort" in object) {
      listContext.updateListAttributes("midlevelsort", object.midlevelsort);
    }

    if ("lowlevelsort" in object) {
      listContext.updateListAttributes("lowlevelsort", object.lowlevelsort);
    }
  });
}
