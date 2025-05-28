import { UserDataCore } from "../../../../shared/auth/UserDataCore";

export interface UserData extends UserDataCore {
  userid: number;
  refreshtokenid: AllowSharedBufferSource;
}
