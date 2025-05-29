import { Link, To } from "react-router";

function ButtonLink(props: {
  to: To;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
}) {
  return (
    <>
      <Link
        className={["button-wrapper link-wrapper", props.className].join(" ")}
        to={props.to}
        onClick={props.onClick}
        style={props.style}
        id={props.id}
      >
        <div>{props.children}</div>
      </Link>
    </>
  );
}

export default ButtonLink;
