import { useContext, useEffect, useState } from "react";
import { ViewContext } from "../../context/viewContext";

function TextField(props: {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
}) {
  const viewContext = useContext(ViewContext);
  const [content, setContent] = useState<string>("");

  useEffect(() => setContent(""), [viewContext?.elementFocused]);

  return (
    <input
      type="text"
      onChange={(e) => setContent(e.target.value)}
      className={["text-field", props.className].join(" ")}
      id={props.id}
      style={props.style}
    >
      {props.children}
    </input>
  );
}
export default TextField;
