import Button from "../../components/element/Button";
import { FilterContextType } from "../../types/filter/FilterContextType";
import { ListContextType } from "../../types/list/ListContextType";
import { ViewContextType } from "../../types/other/ViewContext";
import { UserContextType } from "../../types/user/UserContext";

export function deleteContent(
  viewContext: ViewContextType,
  userContext: UserContextType,
  handlerContext: ListContextType | FilterContextType | undefined,
  name: string,
  object: Object,
  onClick: any
) {
  viewContext.setFullscrenHeader(`Želite li obrisati ${name}?`);

  viewContext.setfullscreenContent(
    <Button
      style={{
        background: "var(--main-color)",
        border: "white",
        color: "white",
        fontSize: "large",
      }}
      className="button-wrapper flex-div-row"
      onClick={async () => {
        if (handlerContext) {
          await onClick({}, userContext, handlerContext);
        } else {
          await onClick({}, userContext);
        }
      }}
    >
      Potvrdite
    </Button>
  );

  viewContext.setElementFocused(true);
}
