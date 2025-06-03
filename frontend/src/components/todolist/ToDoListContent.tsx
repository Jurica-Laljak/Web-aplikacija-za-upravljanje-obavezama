import { useContext } from "react";
import "../../styles/todolist/list-content.css";
import { ListContext } from "../../context/listContext";
import { ListContextType } from "../../types/list/ListContextType";

function ToDoListContent() {
  const listContext = useContext(ListContext) as ListContextType;
  return <div id="list-content-container">{JSON.stringify(listContext)}</div>;
}

export default ToDoListContent;
