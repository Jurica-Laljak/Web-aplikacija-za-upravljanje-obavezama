import { PropsWithChildren } from "react";
import "../../styles/app/content.css";

function ContentArea(props: PropsWithChildren) {
  return <div id="content-container">{props.children}</div>;
}

export default ContentArea;
