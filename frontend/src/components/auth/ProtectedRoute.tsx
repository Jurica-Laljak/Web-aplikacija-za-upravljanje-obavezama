import { PropsWithChildren, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Navigate } from "react-router";
import { RouteContext } from "../../context/routeContext";

function ProtectedRoute(props: PropsWithChildren) {
  const userContext = useContext(UserContext);
  const routeContext = useContext(RouteContext);

  if (
    userContext &&
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
