import { call } from "../../api/call";
import { UserContextType } from "../../types/user/UserContext";
import { ListContextType } from "../../types/list/ListContextType";
import { ToDoDto } from "../../../../shared/todo/ToDo.dto";
import { ToDo } from "../../../../backend/src/interfaces/todo/ToDo";

export async function apiPostTodo(
  object: Object,
  userContext: UserContextType,
  listContext: ListContextType
) {
  if ("duedate" in object && object.duedate === "") {
    object = Object.fromEntries(
      Object.entries(object).filter(([key]) => key !== "duedate")
    );
  }
  call<any, ToDoDto>(
    `/todo/${userContext.listid}/`,
    "post",
    object,
    userContext
  ).then((data) => {
    const newArr: ToDo[] = [];
    newArr.push(data);
    listContext.createTodos(newArr);
  });
}
