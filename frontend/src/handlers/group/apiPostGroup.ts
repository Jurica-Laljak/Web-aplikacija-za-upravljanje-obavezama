import { call } from "../../api/call";
import { UserContextType } from "../../types/user/UserContext";
import { ListContextType } from "../../types/list/ListContextType";
import { GroupDto } from "../../../../shared/group/Group.dto";

export async function apiPostGroup(
  object: Object,
  userContext: UserContextType,
  listContext: ListContextType
) {
  call<any, GroupDto>(
    `/group/${userContext.listid}/`,
    "post",
    object,
    userContext
  ).then((data) => {
    const newArr: GroupDto[] = [];
    newArr.push(data);
    listContext.createGroups(newArr);
  });
}
