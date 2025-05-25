import { IconContext } from "react-icons";

function IconText(props: {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  icon: React.ReactElement;
  iconStyle: IconContext;
}) {
  return (
    <div
      style={Object.assign(
        {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "fit-content",
          justifContent: "center",
          gap: "0.25rem",
        },
        props.style
      )}
    >
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
