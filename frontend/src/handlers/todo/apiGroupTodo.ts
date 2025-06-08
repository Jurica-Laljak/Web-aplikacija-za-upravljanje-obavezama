import { call } from "../../api/call";
import { assertIsNumber } from "../../helper/aseertIsNumber";
import { ListContextType } from "../../types/list/ListContextType";
import { UserContextType } from "../../types/user/UserContext";

export async function apiGroupTodo(
  object: Object,
  userContext: UserContextType,
  listContext: ListContextType
) {
  if ("todoid" in object && "groupid" in object) {
    var todoid = object.todoid;
    var groupid = object.groupid;
    call<any, any>(
      `/group/${userContext.listid}/${groupid}/todo/${todoid}`,
      "put",
      {},
      userContext
    ).then(() => {
      assertIsNumber(todoid);
      let { todos: refreshedTodos } = listContext.updateTodo(todoid, {
        groupid: groupid,
      });
      var refreshedTodoIds = [
        ...(listContext.groups.find((g) =>
          g.groupid == groupid ? true : false
        )?.todoids || []),
      ];
      refreshedTodoIds.push(todoid);

      listContext.updateGroup(
        groupid,
        { todoids: refreshedTodoIds },
        refreshedTodos
      );
    });
  }
}
