import { useContext } from "react";
import "../../styles/todolist/header.css";
import { ListContext } from "../../context/listContext";
import { ListContextType } from "../../types/list/ListContextType";
import Button from "../element/Button";
import IconText from "../element/IconText";
import { largeIcon } from "../../types/style/iconStyle";
import { CgRename } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { BiSolidSortAlt } from "react-icons/bi";
import { FaSort } from "react-icons/fa";

function ToDoListHeader() {
  const listContext = useContext(ListContext) as ListContextType;

  const iconStyles: React.CSSProperties = {
    border: "none",
  };

  function handleSortChange(newValue: string, level: number) {
    alert(JSON.stringify(newValue));
    if (level == 0) {
      listContext.updateListAttributes("highlevelsort", newValue);
    } else if (level == 1) {
      if (newValue === ".hide") {
        listContext.updateListAttributes("midlevelsort", "");
      } else {
        listContext.updateListAttributes("midlevelsort", newValue);
      }
    } else if (level == 2) {
      if (newValue === ".hide") {
        listContext.updateListAttributes("lowlevelsort", "");
      } else {
        listContext.updateListAttributes("midlevelsort", newValue);
      }
    }
  }

  return (
    <div id="list-header-container">
      <div id="list-header-subcontainer">
        <div id="list-header-central">
          <Button className="interactable" style={iconStyles}>
            <IconText icon={<CgRename />} iconStyle={largeIcon}></IconText>
          </Button>
          <div id="list-title">{listContext.name}</div>
          <Button className="interactable" style={iconStyles}>
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
            <option value="">{listContext.highlevelsort}</option>
          </select>
          <div className="sort-interfix">, zatim</div>
          <select
            className="sort-dropdown-content"
            onChange={(e) => {
              handleSortChange(e.target.value, 1);
            }}
          >
            <option value="">
              {listContext.midlevelsort === "" ? (
                <p> - </p>
              ) : (
                listContext.midlevelsort
              )}
            </option>
            {listContext.midlevelsort === "" ? (
              <></>
            ) : (
              <option value=".hide"> - Uklonite sortiranje - </option>
            )}
            <option value="bruh">Bruh</option>
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
                <option value="">
                  {listContext.lowlevelsort === "" ? (
                    <p> - </p>
                  ) : (
                    listContext.lowlevelsort
                  )}
                </option>
                {listContext.lowlevelsort === "" ? (
                  <></>
                ) : (
                  <option value=".hide"> - Uklonite sortiranje - </option>
                )}
              </select>
            </>
          )}
        </form>
        {/* <div id="sort-wrapper">
          
        </div> */}
      </div>
    </div>
  );
}

export default ToDoListHeader;
