import { capitalize } from "../../helper/capitalize";
import { FilterContextType } from "../../types/filter/FilterContextType";
import { ListContextType } from "../../types/list/ListContextType";
import { ViewContextType } from "../../types/other/ViewContext";
import { UserContextType } from "../../types/user/UserContext";

export function injectContent(
  viewContext: ViewContextType,
  userContext: UserContextType,
  handlerContext: ListContextType | FilterContextType,
  name: string,
  emptyObj: Object,
  onSubmit: any,
  additionalValues: Object = {}
) {
  viewContext.setFullscrenHeader(name);

  // generate input form
  viewContext.setfullscreenContent(
    <form
      action={async (formData) => {
        const formResults = Object.fromEntries(formData.entries());
        await onSubmit(formResults, userContext, handlerContext);
        viewContext.setElementFocused(false);
      }}
    >
      {Object.keys(emptyObj).map((key) => (
        <div key={key} className="input-row">
          <label htmlFor={key}>{capitalize(key)}:</label>
          <input name={key} type="text" className="input-text"></input>
        </div>
      ))}
      {Object.entries(additionalValues).map(([key, value]) => (
        <input name={key} type="hidden" value={value}></input>
      ))}
      <div className="input-row">
        <input
          type="submit"
          value="Predajte"
          className="button-wrapper flex-div-row"
        ></input>
      </div>
    </form>
  );

  viewContext.setElementFocused(true);
}
