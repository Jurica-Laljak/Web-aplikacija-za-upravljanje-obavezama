import { PropsWithChildren, useContext, useEffect, useRef } from "react";
import { UserContext } from "../../context/userContext";
import { UserContextType } from "../../types/user/UserContext";
import { ListContext } from "../../context/listContext";
import { ListContextType } from "../../types/list/ListContextType";

function ToDoListMiddleware(props: PropsWithChildren) {
  const isMounted = useRef(false);
  const userContext = useContext(UserContext) as UserContextType;
  const listContext = useContext(ListContext) as ListContextType;

  useEffect(() => {
    if (isMounted.current) {
      // alert(JSON.stringify(listContext));
    } else {
      isMounted.current = true;
    }
  }, [userContext.listid]);

  return <div id="list-metawrapper">{props.children}</div>;
}

export default ToDoListMiddleware;
