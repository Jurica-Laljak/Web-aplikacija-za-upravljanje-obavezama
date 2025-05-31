import React from "react";
import { ViewContextType } from "../types/other/ViewContext";
import { RoutesString } from "../types/other/RoutesString";
import { FilterName } from "../data/filterNames";
import { REACT_URI } from "../data/URIs";

export const ViewContext = React.createContext<ViewContextType | null>(null);

export const ViewContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [uri, setUri] = React.useState<string>(REACT_URI);
  const [elementFocused, setElementFocused] = React.useState<boolean>(false);
  const [openedTab, setOpenedTab] = React.useState<RoutesString | undefined>(
    undefined
  );
  const [selectedFilter, setSelectedFilter] = React.useState<
    FilterName | undefined
  >(undefined);

  return (
    <ViewContext.Provider
      value={{
        openedTab,
        setOpenedTab,
        selectedFilter,
        setSelectedFilter,
        uri,
        setUri,
        elementFocused,
        setElementFocused,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};
