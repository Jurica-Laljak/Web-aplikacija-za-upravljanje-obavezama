import { PropsWithChildren } from "react";

function LoginMiddleware(props: PropsWithChildren) {
  return <>{props.children}</>;
}

export default LoginMiddleware;
