import { call } from "../../api/call";
import { ListContextType } from "../../types/list/ListContextType";
import { UserContextType } from "../../types/user/UserContext";

export function apiDeleteTodo(
  object: Object,
  userContext: UserContextType,
  listContext: ListContextType
) {
  if ("todoid" in object) {
    var todoid = object.todoid;
    delete object.todoid;
    call<any, any>(
      `/todo/${userContext.listid}/${todoid}`,
      "delete",
      {},
      userContext
    ).then(() => listContext.deleteTodo(todoid));
  }
}
