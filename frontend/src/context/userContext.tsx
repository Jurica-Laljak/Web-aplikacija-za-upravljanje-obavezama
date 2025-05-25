import * as React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type UserContextType = {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  userId: string;
  setUserId: (userId: string) => void;
  refreshToken: string;
  setRefreshToken: (refreshToken: string) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  toDoListIds: string[];
  setToDoListIds: (idArrayStringified: string) => void;
};

export const UserContext = React.createContext<UserContextType | null>(null);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [username, setUsername] = useLocalStorage("username");
  const [password, setPassword] = useLocalStorage("password");
  const [userId, setUserId] = useLocalStorage("userId");
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken");
  const [accessToken, setAccessToken] = useLocalStorage("accessToken");
  const [toDoListIds, setToDoListIds] = useLocalStorage("toDoListIds");

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        password,
        setPassword,
        userId,
        setUserId,
        refreshToken,
        setRefreshToken,
        accessToken,
        setAccessToken,
        toDoListIds,
        setToDoListIds,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
