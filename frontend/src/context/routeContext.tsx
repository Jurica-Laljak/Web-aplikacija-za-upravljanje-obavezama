import { createContext } from "react";

export type RouteContextType = {
  redirectedFrom: string | null;
};

export const RouteContext = createContext<RouteContextType | null>(null);
