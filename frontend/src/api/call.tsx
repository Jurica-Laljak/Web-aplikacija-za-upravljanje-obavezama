import { UserContextType } from "../types/user/UserContext";
import axios from "axios";

export async function call<Req extends Object, Res extends Object>(
  path: string,
  httpMethod: "get" | "post" | "put" | "patch" | "delete",
  content: Req,
  userContext?: UserContextType,
  customHeaders?: HeadersInit
): Promise<Res> {
  var authValue: HeadersInit = {};
  if (userContext) {
    authValue = { Authorization: "Bearer " + userContext.accessToken };
  }

  var reqConfig: Axios.AxiosXHRConfig<unknown> = {
    url: path,
    baseURL: "http://localhost:3000/api",
    method: httpMethod,
    data: JSON.stringify(content),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...customHeaders,
    },
  };

  var res = await axios(reqConfig);
  console.log("> Response data: " + JSON.stringify(res.data));

  return res.data as Res;
}
