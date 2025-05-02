import { UserDataDto } from "../../dtos/auth/UserData.dto";

export interface UserDataInsert extends UserDataDto {
  refreshtokenid: string;
}
