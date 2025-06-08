import { useState } from "react";
import { formAttributeTranslation } from "../../data/translate";
import { capitalize } from "../../helper/capitalize";
import { FilterContextType } from "../../types/filter/FilterContextType";
import { ListContextType } from "../../types/list/ListContextType";
import { ViewContextType } from "../../types/other/ViewContext";
import { UserContextType } from "../../types/user/UserContext";
import IconText from "../../components/element/IconText";
import { filterIconMap } from "../../data/filterIcon";
import { smallIcon } from "../../types/style/iconStyle";
import { CheckboxFormData } from "../../types/other/CheckboxArgs";
import Checkbox from "../../components/element/CheckboxRow";

export function injectCheckbox(
  viewContext: ViewContextType,
  userContext: UserContextType,
  listContext: ListContextType,
  filterContext: FilterContextType,
  name: string,
  groupId: number,
  array: Array<CheckboxFormData>,
  onSubmit: any,
  additionalValues: Object = {}
) {
  var formData: Array<{ key: number; checked: boolean }> = array.map((el) => {
    return { key: el.key, checked: el.checked };
  });

  function setChecked(key: number) {
    // alert("before: " + JSON.stringify(formData));
    formData = formData.map((el) =>
      el.key != key ? el : { key: el.key, checked: !el.checked }
    );
    // alert("after: " + JSON.stringify(formData));
  }

  //
  viewContext.setFullscrenHeader(name);

  // generate input form
  viewContext.setfullscreenContent(
    <form
      id="fullscreen-form"
      action={async () => {
        await onSubmit(groupId, formData, userContext, listContext);
        viewContext.setElementFocused(false);
        viewContext.setfullscreenContent(<></>);
      }}
    >
      {array.map((el) => (
        <p>
          <Checkbox
            key={el.key}
            customKey={el.key}
            checked={el.checked}
            setChecked={setChecked}
          >
            <>
              [{el.key}]
              <IconText
                icon={filterIconMap.get(
                  filterContext.filters
                    .find((f) => f.filterid == el.key)
                    ?.type.replace("filter", "")
                )}
                iconStyle={smallIcon}
              ></IconText>
              {capitalize(el.value)}
            </>
          </Checkbox>
        </p>
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
