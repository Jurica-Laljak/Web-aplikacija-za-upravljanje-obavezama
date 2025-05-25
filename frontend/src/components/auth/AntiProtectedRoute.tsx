import { PropsWithChildren, useContext } from "react";
import { UserContext } from "../../context/userContext";
import NotFoundPage from "./NotFoundPage";
import { RouteContext } from "../../context/routeContext";

function AntiProtectedRoute(props: PropsWithChildren) {
  const userContext = useContext(UserContext);
  const routeContext = useContext(RouteContext);

  if (
    !userContext ||
    !(
      userContext.accessToken &&
      userContext.username &&
      userContext.userId &&
      userContext.password
    )
  ) {
    return <>{props.children}</>;
  }

  return <NotFoundPage></NotFoundPage>;
}

export default AntiProtectedRoute;
