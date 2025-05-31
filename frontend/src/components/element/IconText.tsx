import { IconContext } from "react-icons";

function IconText(props: {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  icon: React.ReactElement;
  iconStyle: IconContext;
  className?: string;
  id?: string;
}) {
  const coreStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "fit-content",
    justifyContent: "center",
  };

  var divStyle: React.CSSProperties;
  if (props.style && props.style.gap) {
    divStyle = Object.assign({}, coreStyle, props.style);
  } else {
    divStyle = Object.assign({}, { gap: "0.75rem" }, coreStyle, props.style);
  }

  return (
    <div style={divStyle} id={props.id} className={props.className}>
      <IconContext.Provider value={Object.assign(props.iconStyle)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
          onClick={props.onClick}
        >
          {props.icon}
        </div>
      </IconContext.Provider>
      {props.children}
    </div>
  );
}

export default IconText;
