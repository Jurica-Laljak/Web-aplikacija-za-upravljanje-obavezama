import { ToDoListCore } from "../../../../shared/list/ToDoListCore";
import { RoutesString } from "../other/RoutesString";

export type UserContextType = {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  refreshToken: string;
  setRefreshToken: (refreshToken: string) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  lists: Array<ToDoListCore>;
  setLists: (objOrFn: any) => void;
  listid: number | undefined;
  setListid: any;
  // showList: boolean;
  // setShowList: any;
};
