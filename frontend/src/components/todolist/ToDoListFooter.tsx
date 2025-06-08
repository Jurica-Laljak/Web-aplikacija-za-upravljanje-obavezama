import { IoAddCircleSharp } from "react-icons/io5";
import "../../styles/todolist/footer.css";
import { largeIcon } from "../../types/style/iconStyle";
import Button from "../element/Button";
import IconText from "../element/IconText";
import { ToDoInsert } from "../../../../backend/src/interfaces/todo/ToDoInsert";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { UserContextType } from "../../types/user/UserContext";
import { ViewContext } from "../../context/viewContext";
import { ViewContextType } from "../../types/other/ViewContext";
import { injectContent } from "../../handlers/app/injectContent";
import { apiPostTodo } from "../../handlers/todo/apiPostTodo";
import { ListContext } from "../../context/listContext";
import { ListContextType } from "../../types/list/ListContextType";
import { ToDoGroupInsert } from "../../../../backend/src/interfaces/group/ToDoGroupInsert";
import { apiPostGroup } from "../../handlers/group/apiPostGroup";

function ToDoListFooter() {
  const userContext = useContext(UserContext) as UserContextType;
  const listContext = useContext(ListContext) as ListContextType;
  const viewContext = useContext(ViewContext) as ViewContextType;

  const borderStyle: React.CSSProperties = {
    border: "none",
  };

  function handleAddGroup() {
    const emptyObj: Partial<ToDoGroupInsert> = {
      name: "",
    };

    const additionalProps: Partial<ToDoGroupInsert> = {
      serialnumber: listContext.groups.length + 1,
    };

    injectContent(
      viewContext,
      userContext,
      listContext,
      "Dodajte grupu",
      emptyObj,
      apiPostGroup,
      additionalProps
    );
  }

  function handleAddTodo() {
    const emptyObj: ToDoInsert = {
      content: "",
      duedate: new Date(),
    };

    injectContent(
      viewContext,
      userContext,
      listContext,
      "Dodajte obavezu",
      emptyObj,
      apiPostTodo
    );
  }

  return (
    <div id="list-footer-container" className="flex-row-div">
      <div id="list-footer-subcontainer">
        <Button
          className="interactable list-add-option"
          onClick={handleAddGroup}
          style={borderStyle}
        >
          <IconText icon={<IoAddCircleSharp />} iconStyle={largeIcon}>
            Dodajte grupu obaveza
          </IconText>
        </Button>
        <Button
          className="interactable list-add-option"
          onClick={handleAddTodo}
          style={borderStyle}
        >
          <IconText icon={<IoAddCircleSharp />} iconStyle={largeIcon}>
            Dodajte obavezu
          </IconText>
        </Button>
      </div>
    </div>
  );
}

export default ToDoListFooter;
