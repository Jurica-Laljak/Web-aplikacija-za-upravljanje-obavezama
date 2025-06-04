import { useContext } from "react";
import { GroupInternal } from "../../types/group/GroupInternal";
import ToDoItem from "./ToDoItem";
import { ListContext } from "../../context/listContext";
import { ListContextType } from "../../types/list/ListContextType";

function ToDoGroupItem(props: { group: GroupInternal }) {
  const listContext = useContext(ListContext) as ListContextType;

  return (
    <div>
      <div>{[props.group.groupid, props.group.name].join(" - ")}</div>
      <div style={{ border: "0.5rem dashed darkgreen" }}>
        {props.group.virtualToDoIds.map((vt) => (
          <ToDoItem
            key={`todo-${vt}`}
            todo={
              listContext.todos[
                listContext.todos.findIndex((t) => {
                  t.todoid == vt ? true : false;
                })
              ]
            }
          ></ToDoItem>
        ))}
      </div>
    </div>
  );
}

export default ToDoGroupItem;
