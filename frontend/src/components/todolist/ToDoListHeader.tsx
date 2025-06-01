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

  function handleSortChange(x: any) {}

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
              handleSortChange(e.target);
            }}
          >
            <option value="">{listContext.highlevelsort}</option>
            <option value="lmao">prefixalphabetical:desc</option>
          </select>
          <div className="sort-interfix">, zatim</div>
          <select
            className="sort-dropdown-content"
            onChange={(e) => {
              handleSortChange(e.target);
            }}
          >
            <option value="">{listContext.highlevelsort}</option>
          </select>
          <div className="sort-interfix">, zatim</div>
          <select
            className="sort-dropdown-content"
            onChange={(e) => {
              handleSortChange(e.target);
            }}
          >
            <option value="">{listContext.highlevelsort}</option>
          </select>
        </form>
        {/* <div id="sort-wrapper">
          
        </div> */}
      </div>
    </div>
  );
}

export default ToDoListHeader;
