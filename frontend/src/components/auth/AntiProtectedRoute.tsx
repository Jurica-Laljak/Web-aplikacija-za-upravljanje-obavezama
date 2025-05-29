import { PropsWithChildren, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Navigate } from "react-router";
import { UserContextType } from "../../types/user/UserContext";

function AntiProtectedRoute(props: PropsWithChildren) {
  const userContext = useContext(UserContext) as UserContextType;
  const contextValid =
    userContext.accessToken &&
    userContext.username &&
    userContext.password &&
    userContext.lists;

  if (!contextValid) {
    return <>{props.children}</>;
  }

  return <Navigate to={"/"}></Navigate>;
}

export default AntiProtectedRoute;
