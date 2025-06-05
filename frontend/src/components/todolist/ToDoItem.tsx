import { ToDoInternal } from "../../types/todo/ToDoInternal";
import "../../styles/todolist/list-content.css";

function ToDoItem(props: { todo: ToDoInternal | undefined }) {
  if (props.todo) {
    return <div className="todo-container">{JSON.stringify(props.todo)}</div>;
  }

  return <></>;
}

export default ToDoItem;
