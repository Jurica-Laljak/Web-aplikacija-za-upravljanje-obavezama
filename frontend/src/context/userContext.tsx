import * as React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useParseLocalStorage } from "../hooks/useParseLocalStorage";
import { UserContextType } from "../types/user/UserContext";
import { RoutesString } from "../types/other/RoutesString";

export const UserContext = React.createContext<UserContextType | null>(null);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [username, setUsername] = useLocalStorage("username");
  const [password, setPassword] = useLocalStorage("password");
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken");
  const [accessToken, setAccessToken] = useLocalStorage("accessToken");
  const [lists, setLists] = useParseLocalStorage("lists");
  const [listid, setListid] = React.useState<number | undefined>(undefined);
  // const [showList, setShowList] = React.useState<boolean>(false);

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
        lists,
        setLists,
        listid,
        setListid,
        // showList,
        // setShowList
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
