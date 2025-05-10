import { AuthorizedAttributes } from "./AuthorizedAttributes";

export interface GroupAuthorizedAttributes extends AuthorizedAttributes {
  groupid: string;
}
