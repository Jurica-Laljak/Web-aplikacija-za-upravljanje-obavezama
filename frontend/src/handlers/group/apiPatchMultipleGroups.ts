import { GroupDto } from "../../../../shared/group/Group.dto";
import { call } from "../../api/call";
import { assertIsNumber } from "../../helper/aseertIsNumber";
import { ListContextType } from "../../types/list/ListContextType";
import { UserContextType } from "../../types/user/UserContext";

export async function apiPatchMultipleGroups(
  object: Object,
  userContext: UserContextType,
  listContext: ListContextType
) {
  if ("group1Id" in object && "group2Id" in object) {
    var group1Id = object.group1Id;
    assertIsNumber(group1Id);
    var group2Id = object.group2Id;
    assertIsNumber(group2Id);
    await call<Partial<GroupDto>, any>(
      `/group/${userContext.listid}/${group1Id}`,
      "patch",
      {
        serialnumber: listContext.groups.find((g) =>
          g.groupid == group2Id ? true : false
        )?.serialnumber,
      },
      userContext
    );
    await call<Partial<GroupDto>, any>(
      `/group/${userContext.listid}/${group2Id}`,
      "patch",
      {
        serialnumber: listContext.groups.find((g) =>
          g.groupid == group1Id ? true : false
        )?.serialnumber,
      },
      userContext
    );
    listContext.switchGroupSerialNumbers(group1Id, group2Id);
  }
}
