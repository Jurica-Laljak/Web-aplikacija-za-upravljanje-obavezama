import { call } from "../api/call";
import { FilterContextType } from "../types/filter/FilterContextType";
import { ListContextType } from "../types/list/ListContextType";
import { UserContextType } from "../types/user/UserContext";



export async function (data: Object,
  userContext: UserContextType,
  context: ListContextType | FilterContextType) {
  call<any, >("/", "get", data, context).then((data) => {
    
    
  });
}