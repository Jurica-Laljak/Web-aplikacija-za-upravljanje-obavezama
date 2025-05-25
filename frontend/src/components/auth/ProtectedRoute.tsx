import { PropsWithChildren, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Navigate } from "react-router";

function ProtectedRoute(props: PropsWithChildren) {
  const userContext = useContext(UserContext);
  if (
    userContext &&
    userContext.accessToken &&
    userContext.username &&
    userContext.userId &&
    userContext.password
  ) {
    return <>{props.children}</>;
  }

  return <Navigate to={"/login"}></Navigate>;
}

export default ProtectedRoute;
