import { TokenAttributes } from "./TokenAttributes";

export interface AuthorizedAttributes extends TokenAttributes {
  listid: string;
}
