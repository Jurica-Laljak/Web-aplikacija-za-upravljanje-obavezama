import { UserDataCore } from "../../../../shared/auth/UserDataCore";

export interface UserDataInsert extends UserDataCore {
  refreshtokenid: string;
}
