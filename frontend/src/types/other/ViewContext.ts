import { FilterName } from "../../data/filterNames";
import { RoutesString } from "./RoutesString";

export type ViewContextType = {
  uri: string;
  setUri: any;
  fullscreenFocus: boolean;
  setFullscreenFocus: any;
  openedTab: RoutesString | undefined;
  setOpenedTab: (newSelected: RoutesString | undefined) => void;
  selectedFilter: FilterName | undefined;
  setSelectedFilter: any;
};
