import { ToDoInternal } from "../../types/todo/ToDoInternal";
import "../../styles/todolist/list-content.css";
import IconText from "../element/IconText";
import { MdDateRange, MdDelete, MdOutlinePriorityHigh } from "react-icons/md";
import { mediumIcon, smallIcon } from "../../types/style/iconStyle";
import Button from "../element/Button";
import { FaUserGroup } from "react-icons/fa6";

function ToDoItem(props: { todo: ToDoInternal | undefined }) {
  if (!props.todo) {
    return <></>;
  }

  const buttonStyle: React.CSSProperties = {
    borderColor: "white",
    color: "white",
    fontSize: "1rem",
    padding: "0.25rem",
  };

  return (
    <div
      className={`todo-container priority-${props.todo.priority} ${
        props.todo.groupid !== null ? "todo-forced" : ""
      } `}
    >
      <div className="flex-div-row todo-left-container">
        <div className="flex-div-row">
          <Button style={{ all: "unset" }}>
            <IconText
              icon={<MdDelete />}
              iconStyle={{ ...mediumIcon, color: "var(--secondary-color)" }}
              className="hover"
            ></IconText>
          </Button>
          {props.todo.groupid !== null ? (
            <IconText icon={<FaUserGroup />} iconStyle={smallIcon}></IconText>
          ) : (
            <></>
          )}
          {props.todo.content}
        </div>
        <div className="flex-div-row" style={{ gap: "0rem" }}>
          <IconText
            icon={<MdOutlinePriorityHigh />}
            iconStyle={mediumIcon}
          ></IconText>
          {props.todo.priority}
        </div>
        <div className="flex-div-row" style={{ gap: "0rem" }}>
          <IconText
            icon={<MdDateRange />}
            iconStyle={mediumIcon}
            className={`${props.todo.duedate === null ? "invisible" : ""}`}
          ></IconText>
          {props.todo.duedate !== null ? props.todo.duedate.toString() : ""}
        </div>
      </div>
      <div className="flex-div-row">
        {props.todo.groupid === null ? (
          <Button className="interactable" style={buttonStyle}>
            + Grupirajte
          </Button>
        ) : (
          <Button className="interactable" style={buttonStyle}>
            - Odgrupirajte
          </Button>
        )}
        <Button className="interactable" style={buttonStyle}>
          Uredite obavezu
        </Button>
      </div>
    </div>
  );
}

export default ToDoItem;
