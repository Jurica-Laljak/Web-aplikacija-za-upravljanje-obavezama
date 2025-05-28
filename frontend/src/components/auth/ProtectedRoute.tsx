import { PropsWithChildren, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Navigate } from "react-router";
import { UserContextType } from "../../types/user/UserContext";

function ProtectedRoute(props: PropsWithChildren) {
  const userContext = useContext(UserContext) as UserContextType;

  if (userContext.accessToken && userContext.username && userContext.password) {
    return <>{props.children}</>;
  } else {
    return <Navigate to={"/login"}></Navigate>;
  }
}

export default ProtectedRoute;
