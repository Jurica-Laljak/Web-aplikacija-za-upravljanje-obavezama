import { PropsWithChildren } from "react";

function FilterMiddleware(props: PropsWithChildren) {
  return <>{props.children}</>;
}

export default FilterMiddleware;
