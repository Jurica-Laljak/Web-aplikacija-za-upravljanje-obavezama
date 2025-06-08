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
        listContext.updateListAttributes("highlevelsort", data.highlevelsort);
        listContext.updateListAttributes("midlevelsort", data.midlevelsort);
        listContext.updateListAttributes("lowlevelsort", data.lowlevelsort);
        listContext.flushContent();
        let { todos: refreshedTodos } = listContext.createTodos(data.todos);
        listContext.createGroups(data.groups, refreshedTodos);
      });
    } else {
      isMounted.current = true;
    }
  }, [userContext.listid]);

  return <div id="list-metawrapper">{props.children}</div>;
}

export default ToDoListMiddleware;
