import { PropsWithChildren, useContext } from "react";
import { UserContext } from "../../context/userContext";
import NotFoundPage from "./NotFoundPage";

function AntiProtectedRoute(props: PropsWithChildren) {
  const userContext = useContext(UserContext);

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
