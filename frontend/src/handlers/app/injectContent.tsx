import { useState } from "react";
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
      id="fullscreen-form"
      action={async (formData) => {
        var preparedObject: { [key: string]: any } = {};
        for (let [key, value] of formData.entries()) {
          // alert(`${key} :- ${value}`);
          if (value && value !== null && value !== "") {
            preparedObject[key] = value;
          }
        }
        // alert(JSON.stringify(preparedObject));
        if (handlerContext) {
          await onSubmit(
            { ...additionalValues, ...preparedObject },
            userContext,
            handlerContext
          );
        } else {
          await onSubmit(
            { ...additionalValues, ...preparedObject },
            userContext
          );
        }
        viewContext.setElementFocused(false);
      }}
    >
      {Object.entries(additionalValues).map(([key, value]) => (
        <input name={key} value={value} type="hidden"></input>
      ))}
      {Object.entries(object).map(([key, value]) => (
        <div key={key} className="input-row">
          <label htmlFor={key}>
            {capitalize(formAttributeTranslation.get(key.toLowerCase()) || key)}
          </label>
          {key == "duedate" ? (
            <input name={key} type="date" className="input-text"></input>
          ) : (
            <input
              name={key}
              type="text"
              className="input-text"
              placeholder={value && value !== null && value !== "" ? value : ""}
            ></input>
          )}
        </div>
      ))}
      <div className="input-row" id="submit-button-row">
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
