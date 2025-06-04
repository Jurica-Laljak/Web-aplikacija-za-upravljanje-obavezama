import { GroupDto } from "../../../../shared/group/Group.dto";

export interface GroupInternal extends GroupDto {
  virtualToDoIds: Array<number>;
  remainingReservedSpots: number;
}
