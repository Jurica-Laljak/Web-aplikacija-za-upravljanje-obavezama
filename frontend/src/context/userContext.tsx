import { createContext } from "react";

export type UserContextType = {
  username: string | null;
  password: string | null;
  userId: string | null;
  refreshToken: string | null;
  accessToken: string | null;
};

export const UserContext = createContext<UserContextType | null>(null);
