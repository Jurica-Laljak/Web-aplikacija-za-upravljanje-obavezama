import { CheckboxArgs } from "../../types/other/CheckboxArgs";

function Checkbox(props: CheckboxArgs & { children?: React.ReactNode }) {
  function handleInteraction() {
    props.setChecked(props.customKey);
  }

  return (
    <div
      className="flex-div-row"
      style={{
        width: "100%",
        alignItems: "center",
        padding: "0.5rem",
      }}
    >
      <label
        htmlFor={props.customKey.toString()}
        className="flex-div-row"
        style={{ width: "100%" }}
      >
        {props.children}
      </label>
      <div style={{ width: "fit-content" }}>
        <input
          name={props.customKey.toString()}
          type="checkbox"
          value=""
          defaultChecked={props.checked}
          onChange={handleInteraction}
          className="checkbox"
          style={{ width: "fit-content", border: "unset", cursor: "pointer" }}
        ></input>
      </div>
    </div>
  );
}

export default Checkbox;
