import * as React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useParseLocalStorage } from "../hooks/useParseLocalStorage";
import { UserContextType } from "../types/user/UserContext";

export const UserContext = React.createContext<UserContextType | null>(null);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [username, setUsername] = useLocalStorage("username");
  const [password, setPassword] = useLocalStorage("password");
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken");
  const [accessToken, setAccessToken] = useLocalStorage("accessToken");
  const [toDoListIds, setToDoListIds] = useParseLocalStorage("toDoListIds");

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        password,
        setPassword,
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
