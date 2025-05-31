function Button(props: {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
}) {
  return (
    <>
      <div
        className={["button-wrapper", props.className].join(" ")}
        onClick={props.onClick}
        style={props.style}
        id={props.id}
      >
        <div>{props.children}</div>
      </div>
    </>
  );
}

export default Button;
