import { ToDoInternal } from "../../types/todo/ToDoInternal";

function ToDoItem(props: { todo: ToDoInternal | undefined }) {
  if (props.todo) {
    return (
      <div style={{ border: "0.25rem solid red" }}>
        {JSON.stringify(props.todo)}
      </div>
    );
  }

  return <></>;
}

export default ToDoItem;
