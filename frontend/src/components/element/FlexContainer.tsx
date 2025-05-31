function FlexContainer(props: {
  isRow: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const componentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: `${props.isRow ? "row" : "column"}`,
    justifyContent: "center",
    alignItems: "center",
  };
  return <div style={props.style}>{props.children}</div>;
}
