import { useContext } from "react";
import "../../styles/todolist/header.css";
import { ListContext } from "../../context/listContext";
import { ListContextType } from "../../types/list/ListContextType";
import Button from "../element/Button";
import IconText from "../element/IconText";
import { largeIcon } from "../../types/style/iconStyle";
import { CgRename } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { injectContent } from "../../handlers/app/injectContent";
import { UserContext } from "../../context/userContext";
import { UserContextType } from "../../types/user/UserContext";
import { ViewContext } from "../../context/viewContext";
import { ViewContextType } from "../../types/other/ViewContext";
import { apiPatchList } from "../../handlers/list/apiPatchList";
import { ToDoListDto } from "../../../../shared/list/ToDoList.dto";
import { deleteContent } from "../../handlers/app/deleteContent";
import { apiDeleteList } from "../../handlers/list/apiDeleteList";
import { sortIcons, sortTypes } from "../../data/sortTypes";
import { formAttributeTranslation } from "../../data/translate";

function ToDoListHeader() {
  const userContext = useContext(UserContext) as UserContextType;
  const viewContext = useContext(ViewContext) as ViewContextType;
  const listContext = useContext(ListContext) as ListContextType;

  const iconStyles: React.CSSProperties = {
    border: "none",
  };

  function handleRename() {
    injectContent(
      viewContext,
      userContext,
      listContext,
      "Preimenujte popis obaveza",
      { name: listContext.name },
      apiPatchList
    );
  }

  function handleSortChange(newValue: string, level: number) {
    if (newValue !== "") {
      var updateObj: Partial<ToDoListDto> = {};
      if (level == 0) {
        updateObj = { highlevelsort: newValue };
      } else if (level == 1) {
        if (newValue === ".hide") {
          updateObj = { midlevelsort: "" };
        } else {
          updateObj = { midlevelsort: newValue };
        }
      } else if (level == 2) {
        if (newValue === ".hide") {
          updateObj = { lowlevelsort: "" };
        } else {
          updateObj = { lowlevelsort: newValue };
        }
      }

      apiPatchList(updateObj, userContext, listContext);
    }
  }

  function handleDelete() {
    deleteContent(
      viewContext,
      userContext,
      listContext,
      "popis obaveza",
      {},
      apiDeleteList
    );
  }

  return (
    <div id="list-header-container">
      <div id="list-header-subcontainer">
        <div id="list-header-central">
          <Button
            className="interactable"
            style={iconStyles}
            onClick={handleRename}
          >
            <IconText icon={<CgRename />} iconStyle={largeIcon}></IconText>
          </Button>
          <div id="list-title">{listContext.name}</div>
          <Button
            className="interactable"
            style={iconStyles}
            onClick={handleDelete}
          >
            <IconText icon={<MdDelete />} iconStyle={largeIcon}></IconText>
          </Button>
        </div>
        <form id="sort-subwrapper" className="dropdown interactable">
          <div id="sort-tooltip">Sortiranje:</div>
          <select
            className="sort-dropdown-content"
            onChange={(e) => {
              handleSortChange(e.target.value, 0);
            }}
          >
            <option value="" id="current-sort-0">
              {sortIcons.get(listContext.highlevelsort)}
            </option>
            {sortTypes.map((so) =>
              listContext.highlevelsort === so ||
              listContext.midlevelsort === so ||
              listContext.lowlevelsort === so ? (
                <></>
              ) : (
                <option value={so}>{sortIcons.get(so)}</option>
              )
            )}
          </select>
          <div className="sort-interfix">, zatim</div>
          <select
            className="sort-dropdown-content"
            onChange={(e) => {
              handleSortChange(e.target.value, 1);
            }}
          >
            <option value="" id="current-sort-1">
              {listContext.midlevelsort === ""
                ? "-"
                : sortIcons.get(listContext.midlevelsort)}
            </option>
            {sortTypes.map((so) =>
              listContext.highlevelsort === so ||
              listContext.midlevelsort === so ||
              listContext.lowlevelsort === so ? (
                <></>
              ) : (
                <option value={so}>{sortIcons.get(so)}</option>
              )
            )}
            {listContext.midlevelsort === "" ? (
              <></>
            ) : (
              <option value=".hide" id="remove-sort-1">
                - Uklonite -
              </option>
            )}
          </select>

          {listContext.midlevelsort === "" ? (
            <></>
          ) : (
            <>
              <div className="sort-interfix">, zatim</div>
              <select
                className="sort-dropdown-content"
                onChange={(e) => {
                  handleSortChange(e.target.value, 2);
                }}
              >
                <option value="" id="current-sort-2">
                  {listContext.lowlevelsort === ""
                    ? "-"
                    : sortIcons.get(listContext.lowlevelsort)}
                </option>
                {sortTypes.map((so) =>
                  listContext.highlevelsort === so ||
                  listContext.midlevelsort === so ||
                  listContext.lowlevelsort === so ? (
                    <></>
                  ) : (
                    <option value={so}>{sortIcons.get(so)}</option>
                  )
                )}
                {listContext.lowlevelsort === "" ? (
                  <></>
                ) : (
                  <option value=".hide" id="remove-sort-2">
                    - Uklonite -
                  </option>
                )}
              </select>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default ToDoListHeader;
