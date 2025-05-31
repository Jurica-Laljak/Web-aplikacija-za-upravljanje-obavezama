import { call } from "../../api/call";
import { ToDoListDto } from "../../../../shared/list/ToDoList.dto";
import { UserContextType } from "../../types/user/UserContext";

export async function apiPostList(
  data: Object,
  userContext: UserContextType,
  context: any
) {
  call<any, ToDoListDto>("/list", "post", data, userContext).then((data) => {
    userContext.setLists([
      ...userContext.lists,
      {
        listid: data.listid,
        name: data.name,
      },
    ]);
  });
}
