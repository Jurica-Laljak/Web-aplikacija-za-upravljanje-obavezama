import { UserDataDto } from "../../dtos/auth/UserData.dto";

export interface UserData extends UserDataDto {
  userid: number;
  refreshtokenid: AllowSharedBufferSource;
}
