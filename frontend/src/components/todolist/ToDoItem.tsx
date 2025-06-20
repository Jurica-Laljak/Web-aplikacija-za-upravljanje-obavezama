import { ToDoInternal } from "../../types/todo/ToDoInternal";
import "../../styles/todolist/list-content.css";
import IconText from "../element/IconText";
import {
  MdDateRange,
  MdDelete,
  MdGroupOff,
  MdOutlinePriorityHigh,
} from "react-icons/md";
import { mediumIcon, smallIcon } from "../../types/style/iconStyle";
import Button from "../element/Button";
import { FaUserGroup } from "react-icons/fa6";
import { useContext } from "react";
import { ListContext } from "../../context/listContext";
import { ListContextType } from "../../types/list/ListContextType";
import { injectContent } from "../../handlers/app/injectContent";
import { UserContext } from "../../context/userContext";
import { UserContextType } from "../../types/user/UserContext";
import { ViewContext } from "../../context/viewContext";
import { ViewContextType } from "../../types/other/ViewContext";
import { apiPatchTodo } from "../../handlers/todo/apiPatchTodo";
import { deleteContent } from "../../handlers/app/deleteContent";
import { apiDeleteTodo } from "../../handlers/todo/apiDeleteTodo";
import { capitalize } from "../../helper/capitalize";
import { apiGroupTodo } from "../../handlers/todo/apiGroupTodo";
import { apiUngroupTodo } from "../../handlers/todo/apiUngroupTodo";

function ToDoItem(props: { todo: ToDoInternal | undefined }) {
  if (!props.todo) {
    return <></>;
  }

  const userContext = useContext(UserContext) as UserContextType;
  const viewContext = useContext(ViewContext) as ViewContextType;
  const listContext = useContext(ListContext) as ListContextType;

  const buttonStyle: React.CSSProperties = {
    borderColor: "white",
    color: "white",
    fontSize: "1rem",
    padding: "0.25rem",
  };

  function handleGroupTodo(groupId: string) {
    if (groupId === "") return;
    apiGroupTodo(
      { todoid: props.todo?.todoid, groupid: groupId },
      userContext,
      listContext
    );
  }

  function handleUngroupTodo() {
    apiUngroupTodo(
      { todoid: props.todo?.todoid, groupid: props.todo?.groupid },
      userContext,
      listContext
    );
  }

  function handleEditTodo() {
    const currState = {
      content: props.todo?.content,
      duedate: props.todo?.duedate,
      priority: props.todo?.priority,
    };
    injectContent(
      viewContext,
      userContext,
      listContext,
      "Uredite obavezu",
      currState,
      apiPatchTodo,
      { ...currState, todoid: props.todo?.todoid }
    );
  }

  function handleRemoveDuedate() {
    apiPatchTodo(
      { todoid: props.todo?.todoid, duedate: null },
      userContext,
      listContext
    );
  }

  function handleDeleteTodo() {
    deleteContent(
      viewContext,
      userContext,
      listContext,
      "obavezu",
      { todoid: props.todo?.todoid },
      apiDeleteTodo
    );
  }

  return (
    <div
      className={`todo-container priority-${props.todo.priority} ${
        props.todo.groupid !== null ? "todo-forced" : ""
      } `}
    >
      <div className="flex-div-row todo-left-container">
        <div className="flex-div-row">
          <Button style={{ all: "unset" }} onClick={handleDeleteTodo}>
            <IconText
              icon={<MdDelete />}
              iconStyle={{ ...mediumIcon, color: "var(--secondary-color)" }}
              className="hover"
            ></IconText>
          </Button>
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
          {props.todo.duedate !== null ? (
            <Button
              className="interactable remove-duedate-button"
              onClick={handleRemoveDuedate}
            >
              x
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex-div-row">
        {props.todo.groupid !== null ? (
          <Button
            className="interactable"
            style={buttonStyle}
            onClick={handleUngroupTodo}
          >
            <IconText icon={<MdGroupOff />} iconStyle={mediumIcon}></IconText>
          </Button>
        ) : (
          <></>
        )}
        {listContext.groups.length > 0 && props.todo.groupid === null ? (
          <select
            className="todo-dropdown-content"
            onChange={(e) => {
              handleGroupTodo(e.target.value);
            }}
          >
            <option value="" id="current-todo-group-option">
              {props.todo.groupid === null
                ? "- Grupirajte obavezu -"
                : `Grupa: ${capitalize(
                    listContext.groups.find((g) =>
                      g.groupid == props.todo?.groupid ? true : false
                    )?.name
                  )}`}
            </option>
            {listContext.groups.map((g) => (
              <option value={g.groupid} key={`group-option-${g.groupid}`}>
                {capitalize(g.name)}
              </option>
            ))}
          </select>
        ) : (
          <></>
        )}
        <Button
          className="interactable"
          style={buttonStyle}
          onClick={handleEditTodo}
        >
          Uredite obavezu
        </Button>
      </div>
    </div>
  );
}

export default ToDoItem;
