function Button(props: {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}) {
  return (
    <>
      <div
        className="button-wrapper"
        onClick={props.onClick}
        style={props.style}
      >
        <div>{props.children}</div>
      </div>
    </>
  );
}

export default Button;
