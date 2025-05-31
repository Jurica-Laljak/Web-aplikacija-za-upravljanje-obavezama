import { EXPRESS_URI } from "../data/URIs";
import { UserContextType } from "../types/user/UserContext";
import axios from "axios";

export async function call<Req extends Object, Res extends Object>(
  path: string,
  httpMethod: "get" | "post" | "put" | "patch" | "delete",
  content: Req,
  userContext?: UserContextType,
  customHeaders?: HeadersInit
): Promise<Res> {
  var reqConfig: Axios.AxiosXHRConfig<unknown> = {
    url: EXPRESS_URI + path,
    method: httpMethod,
    headers: {
      Authorization: `Bearer ${userContext?.accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      ...customHeaders,
    },
  };

  if (httpMethod == "post" || httpMethod == "patch" || httpMethod == "put") {
    reqConfig.data = content;
  }

  //
  // alert(JSON.stringify(reqConfig));
  //

  var res = await axios(reqConfig);
  console.log("> Response data: " + JSON.stringify(res.data));

  return res.data as Res;
}
