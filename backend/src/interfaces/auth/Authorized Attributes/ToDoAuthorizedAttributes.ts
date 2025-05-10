import { AuthorizedAttributes } from "./AuthorizedAttributes";

export interface ToDoAuthorizedAttributes extends AuthorizedAttributes {
  todoid: string;
}
