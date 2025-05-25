import { Link, To } from "react-router";

function ButtonLink(props: {
  to: To;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  style?: React.CSSProperties;
}) {
  return (
    <>
      <Link
        className="button-wrapper link-wrapper"
        to={props.to}
        onClick={props.onClick}
        style={props.style}
      >
        <div>{props.children}</div>
      </Link>
    </>
  );
}

export default ButtonLink;
