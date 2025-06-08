import { GroupInternal } from "../../types/group/GroupInternal";

export function sortGroups(a: GroupInternal, b: GroupInternal) {
  if (a.serialnumber < b.serialnumber) {
    return -1;
  } else if (a.serialnumber > b.serialnumber) {
    return 1;
  }
  return 0;
}
