import { useContext, useEffect, useRef } from "react";
import "../../styles/todolist/list-content.css";
import { ListContext } from "../../context/listContext";
import { ListContextType } from "../../types/list/ListContextType";
import ToDoGroupItem from "./ToDoGroupItem";
import ToDoItem from "./ToDoItem";

function ToDoListContent() {
  const isMounted = useRef(false);
  const listContext = useContext(ListContext) as ListContextType;

  useEffect(() => {
    if (isMounted.current) {
      listContext.callRefreshList();
    } else {
      isMounted.current = true;
    }
  }, [listContext.todos]);

  return (
    <div id="list-content-container" className="flex-div-column">
      <div id="list-content-subcontainer" className="flex-div-column">
        <div id="group-container">
          {listContext.groups.map((g) => (
            <ToDoGroupItem group={g} key={`group-${g.groupid}`}></ToDoGroupItem>
          ))}
        </div>
        <div style={{ border: "0.5rem dashed darkgreen" }}>
          {listContext.ungroupedTodos.map((t) => (
            <ToDoItem
              todo={listContext.todos.find((el) => {
                el.todoid == t ? true : false;
              })}
              key={`todo-${t}`}
            ></ToDoItem>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToDoListContent;
