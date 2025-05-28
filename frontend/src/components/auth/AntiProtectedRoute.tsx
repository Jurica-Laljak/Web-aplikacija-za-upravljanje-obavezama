import { PropsWithChildren, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Navigate } from "react-router";

function AntiProtectedRoute(props: PropsWithChildren) {
  const userContext = useContext(UserContext);

  if (
    !userContext ||
    !(userContext.accessToken && userContext.username && userContext.password)
  ) {
    return <>{props.children}</>;
  }

  return <Navigate to={"/"}></Navigate>;
}

export default AntiProtectedRoute;
