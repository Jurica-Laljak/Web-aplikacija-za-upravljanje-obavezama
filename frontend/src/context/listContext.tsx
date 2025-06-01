import React, { useState } from "react";
import { ListContextType } from "../types/list/ListContextType";

export const ListContext = React.createContext<ListContextType | null>(null);

export const ListContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //
  const [name, setName] = useState("Popis 1");
  const [highlevelsort, setHiglevelsort] = useState("timecreated:asc");
  const [midlevelsort, setMidlevelsort] = useState("");
  const [lowlevelsort, setLowlevelsort] = useState("");
  const [groups, setGroups] = useState([]);
  const [todos, setTodos] = useState([]);

  return (
    <ListContext.Provider
      value={{
        name,
        setName,
        highlevelsort,
        setHiglevelsort,
        midlevelsort,
        setMidlevelsort,
        lowlevelsort,
        setLowlevelsort,
        groups,
        setGroups,
        todos,
        setTodos,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
