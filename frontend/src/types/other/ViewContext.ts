import { FilterName } from "../../data/filterNames";
import { RoutesString } from "./RoutesString";

export type ViewContextType = {
  uri: string;
  setUri: any;
  elementFocused: boolean;
  setElementFocused: any;
  openedTab: RoutesString | undefined;
  setOpenedTab: (newSelected: RoutesString | undefined) => void;
  selectedFilter: FilterName | undefined;
  setSelectedFilter: any;
  fullscreenHeader: string;
  setFullscrenHeader: any;
  fullscreenContent: React.ReactNode;
  setfullscreenContent: any;
  formFieldType: string;
  setFormFieldType: any;
};
