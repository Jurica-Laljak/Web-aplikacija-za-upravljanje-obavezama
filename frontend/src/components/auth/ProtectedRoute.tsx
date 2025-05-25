import { PropsWithChildren, useContext } from "react";
import { UserContext, UserContextType } from "../../context/userContext";
import { Navigate } from "react-router";

function ProtectedRoute(props: PropsWithChildren) {
  const userContext = useContext(UserContext) as UserContextType;

  if (
    userContext.accessToken &&
    userContext.username &&
    userContext.userId &&
    userContext.password
  ) {
    return <>{props.children}</>;
  } else {
    return <Navigate to={"/login"}></Navigate>;
  }
}

export default ProtectedRoute;
