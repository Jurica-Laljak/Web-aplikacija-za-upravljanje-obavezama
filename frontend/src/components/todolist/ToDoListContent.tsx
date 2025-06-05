import { useContext, useEffect, useRef, useState } from "react";
import "../../styles/todolist/list-content.css";
import { ListContext } from "../../context/listContext";
import { ListContextType } from "../../types/list/ListContextType";
import ToDoGroupItem from "./ToDoGroupItem";
import ToDoItem from "./ToDoItem";
import Button from "../element/Button";
import IconText from "../element/IconText";
import { IoMdArrowDropdown } from "react-icons/io";
import { veryLargeIcon, veryveryLargeIcon } from "../../types/style/iconStyle";

function ToDoListContent() {
  const isMounted = useRef(false);
  const listContext = useContext(ListContext) as ListContextType;
  const [ungroupedVisible, setUngroupedVisible] = useState(true);

  useEffect(() => {
    if (isMounted.current) {
      listContext.callRefreshList();
    } else {
      isMounted.current = true;
    }
  }, [listContext.fetchedListData]);

  function handleExpandGroup() {
    setUngroupedVisible(!ungroupedVisible);
  }

  return (
    <div id="list-content-container" className="flex-div-column">
      <div id="list-content-subcontainer" className="flex-div-column">
        <div id="group-wrapper" className="flex-div-column">
          {listContext.groups.map((g) => (
            <ToDoGroupItem group={g} key={`group-${g.groupid}`}></ToDoGroupItem>
          ))}
        </div>
        <div
          className={`flex-div-column ${
            listContext.ungroupedTodos.length == 0 ? "invisible" : ""
          }`}
        >
          <div id="ungrouped-wrapper" className="flex-div-row">
            <Button
              style={{ all: "unset" }}
              onClick={handleExpandGroup}
              className="flex-div-row"
            >
              <IconText
                icon={<IoMdArrowDropdown />}
                iconStyle={{
                  ...veryveryLargeIcon,
                  color: "var(--secondary-color)",
                }}
                className={`hover transition ${
                  ungroupedVisible ? "expand-arrow-selected" : "expand-arrow"
                }`}
              ></IconText>
            </Button>
          </div>
          <div
            id="ungrouped-todos-container"
            className={ungroupedVisible ? "" : "invisible"}
          >
            {listContext.ungroupedTodos.map((t) => (
              <ToDoItem
                todo={listContext.todos.find((el) =>
                  el.todoid == t ? true : false
                )}
                key={`todo-${t}`}
              ></ToDoItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToDoListContent;
