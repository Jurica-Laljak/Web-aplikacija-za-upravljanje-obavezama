import { IoAddCircleSharp } from "react-icons/io5";
import "../../styles/todolist/footer.css";
import { largeIcon } from "../../types/style/iconStyle";
import Button from "../element/Button";
import IconText from "../element/IconText";

function ToDoListFooter() {
  const borderStyle: React.CSSProperties = {
    border: "none",
  };

  return (
    <div id="list-footer-container" className="flex-row-div">
      <div id="list-footer-subcontainer">
        <Button
          className="interactable list-add-option"
          onClick={() => console.log()}
          style={borderStyle}
        >
          <IconText icon={<IoAddCircleSharp />} iconStyle={largeIcon}>
            Dodajte grupu obaveza
          </IconText>
        </Button>
        <Button
          className="interactable list-add-option"
          onClick={() => console.log()}
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
