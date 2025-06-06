import { formAttributeTranslation } from "../../data/translate";
import { capitalize } from "../../helper/capitalize";
import { FilterContextType } from "../../types/filter/FilterContextType";
import { ListContextType } from "../../types/list/ListContextType";
import { ViewContextType } from "../../types/other/ViewContext";
import { UserContextType } from "../../types/user/UserContext";

export function injectContent(
  viewContext: ViewContextType,
  userContext: UserContextType,
  handlerContext: ListContextType | FilterContextType | undefined,
  name: string,
  object: Object,
  onSubmit: any,
  additionalValues: Object = {}
) {
  viewContext.setFullscrenHeader(name);

  // generate input form
  viewContext.setfullscreenContent(
    <form
      action={async (formData) => {
        const formResults = Object.fromEntries(formData.entries());
        if (handlerContext) {
          await onSubmit(formResults, userContext, handlerContext);
        } else {
          await onSubmit(formResults, userContext);
        }
        viewContext.setElementFocused(false);
      }}
    >
      {Object.keys(object).map((key) => (
        <div key={key} className="input-row">
          <label htmlFor={key}>
            {capitalize(formAttributeTranslation.get(key.toLowerCase()) || key)}
            :
          </label>
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
          style={{
            background: "var(--main-color)",
            border: "white",
            color: "white",
            fontSize: "large",
          }}
          className="button-wrapper flex-div-row"
        ></input>
      </div>
    </form>
  );

  viewContext.setElementFocused(true);
}
