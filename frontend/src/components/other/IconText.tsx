import { IconContext } from "react-icons";

function IconText(props: {
  children?: React.ReactNode;
  style?: React.CSSProperties;
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
        >
          {props.icon}
        </div>
      </IconContext.Provider>
      {props.children}
    </div>
  );
}

export default IconText;
