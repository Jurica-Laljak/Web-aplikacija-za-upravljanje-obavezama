import { ViewContextType } from "../../types/other/ViewContext";

export function flushContent(viewContext: ViewContextType) {
  viewContext.setElementFocused(false);
  viewContext.setFullscrenHeader("");
  viewContext.setfullscreenContent(<></>);
}
