import { PropsWithChildren } from "react";

function ToDoListMiddleware(props: PropsWithChildren) {
  return <>{props.children}</>;
}

export default ToDoListMiddleware;
