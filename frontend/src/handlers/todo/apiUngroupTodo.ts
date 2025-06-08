import { call } from "../../api/call";
import { assertIsNumber } from "../../helper/aseertIsNumber";
import { ListContextType } from "../../types/list/ListContextType";
import { UserContextType } from "../../types/user/UserContext";

export async function apiUngroupTodo(
  object: Object,
  userContext: UserContextType,
  listContext: ListContextType
) {
  if ("todoid" in object && "groupid" in object) {
    var todoid = object.todoid;
    var groupid = object.groupid;
    call<any, any>(
      `/todo/${userContext.listid}/${todoid}`,
      "patch",
      { groupid: null },
      userContext
    ).then(() => {
      assertIsNumber(todoid);
      let { todos: refreshedTodos } = listContext.updateTodo(todoid, {
        groupid: null,
      });
      var refreshedTodoIds = [
        ...(listContext.groups.find((g) =>
          g.groupid == groupid ? true : false
        )?.todoids || []),
      ];
      refreshedTodoIds.splice(
        refreshedTodoIds.findIndex((id) => (id == todoid ? true : false)),
        1
      );
      if (refreshedTodoIds.length == 0) {
        listContext.updateGroup(groupid, { todoids: [] }, refreshedTodos);
      } else {
        listContext.updateGroup(
          groupid,
          { todoids: [...refreshedTodoIds] },
          refreshedTodos
        );
      }
    });
  }
}
