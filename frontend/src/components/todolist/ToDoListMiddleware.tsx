import { PropsWithChildren, useContext, useEffect, useRef } from "react";
import { UserContext } from "../../context/userContext";
import { UserContextType } from "../../types/user/UserContext";
import { ListContext } from "../../context/listContext";
import { ListContextType } from "../../types/list/ListContextType";
import { ToDoListDto } from "../../../../shared/list/ToDoList.dto";
import { call } from "../../api/call";

function ToDoListMiddleware(props: PropsWithChildren) {
  const isMounted = useRef(false);
  const userContext = useContext(UserContext) as UserContextType;
  const listContext = useContext(ListContext) as ListContextType;

  useEffect(() => {
    if (isMounted.current) {
      call<any, ToDoListDto>(
        `/list/${userContext.listid}`,
        "get",
        {},
        userContext
      ).then((data) => {
        listContext.setName(data.name);
        listContext.updateListAttributes(
          "highlevelsort",
          data.highlevelsort,
          false
        );
        listContext.updateListAttributes(
          "midlevelsort",
          data.midlevelsort,
          false
        );
        listContext.updateListAttributes(
          "lowlevelsort",
          data.lowlevelsort,
          false
        );
        listContext.flushContent();
        listContext.createTodos(data.todos, false);
        listContext.createGroups(data.groups, false);
      });
    } else {
      isMounted.current = true;
    }
  }, [userContext.listid]);

  return <div id="list-metawrapper">{props.children}</div>;
}

export default ToDoListMiddleware;
