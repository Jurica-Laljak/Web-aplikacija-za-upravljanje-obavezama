import { useContext, useState } from "react";
import { GroupInternal } from "../../types/group/GroupInternal";
import ToDoItem from "./ToDoItem";
import { ListContext } from "../../context/listContext";
import { ListContextType } from "../../types/list/ListContextType";
import IconText from "../element/IconText";
import {
  largeIcon,
  mediumIcon,
  veryLargeIcon,
} from "../../types/style/iconStyle";
import { CgRename } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import Button from "../element/Button";
import { IoMdArrowDropdown } from "react-icons/io";
import { FilterContext } from "../../context/filterContext";
import { FilterContextType } from "../../types/filter/FilterContextType";
import { FaChevronDown, FaChevronUp, FaFilter } from "react-icons/fa";
import FilterFragment from "./FilterFragment";

function ToDoGroupItem(props: { group: GroupInternal }) {
  const listContext = useContext(ListContext) as ListContextType;
  const filterContext = useContext(FilterContext) as FilterContextType;
  const [selected, setSelected] = useState(true);

  function handleExpandGroup() {
    setSelected(!selected);
  }

  return (
    <div className="group-container flex-div-column">
      <div
        className="flex-div-row"
        style={{ width: "100%", justifyContent: "start" }}
      >
        <div className="group-name flex-div-row">
          <div className="flex-div-column" id="arrow-container">
            <Button style={{ all: "unset" }}>
              <IconText
                icon={<FaChevronUp />}
                iconStyle={{ size: "1.15rem" }}
                className={`interactable hover ${
                  props.group.serialnumber == 1 ? "hidden" : "group-arrow"
                }`}
              ></IconText>
            </Button>
            <Button style={{ all: "unset" }}>
              <IconText
                icon={<FaChevronDown />}
                iconStyle={{ size: "1.15rem" }}
                className={`interactable hover ${
                  props.group.serialnumber == listContext.groups.length
                    ? "hidden"
                    : "group-arrow"
                }`}
              ></IconText>
            </Button>
          </div>
          <Button style={{ all: "unset" }} onClick={handleExpandGroup}>
            <IconText
              icon={<IoMdArrowDropdown />}
              iconStyle={{ ...veryLargeIcon, color: "var(--secondary-color)" }}
              className={`hover transition ${
                selected ? "expand-arrow-selected" : "expand-arrow"
              }`}
            ></IconText>
          </Button>
          <br />
          <Button style={{ all: "unset" }}>
            <IconText
              icon={<CgRename />}
              iconStyle={{ ...largeIcon, color: "var(--secondary-color)" }}
              className="hover"
            ></IconText>
          </Button>
          {props.group.name}
          <Button style={{ all: "unset" }}>
            <IconText
              icon={<MdDelete />}
              iconStyle={{ ...largeIcon, color: "var(--secondary-color)" }}
              className="hover"
            ></IconText>
          </Button>
        </div>
        <div className="group-filter-container flex-div-row">
          {props.group.filterids.map((fId) => (
            <FilterFragment
              filter={
                filterContext.filters[
                  filterContext.filters.findIndex((f) =>
                    f.filterid == fId ? true : false
                  )
                ]
              }
            ></FilterFragment>
          ))}

          <Button
            className="interactable"
            style={{
              borderColor: "white",
              color: "white",
            }}
          >
            <IconText icon={<FaFilter />} iconStyle={mediumIcon}>
              {props.group.filterids.length > 0
                ? "Uredite filtre"
                : "Dodajte filtre"}
            </IconText>
          </Button>
        </div>
      </div>
      <div
        className={`group-todos-container flex-div-column ${
          selected ? "" : "invisible"
        }`}
      >
        {props.group.virtualToDoIds.map((vt) => (
          <ToDoItem
            key={`todo-${vt}`}
            todo={
              listContext.todos[
                listContext.todos.findIndex((t) =>
                  t.todoid == vt ? true : false
                )
              ]
            }
          ></ToDoItem>
        ))}
      </div>
    </div>
  );
}

export default ToDoGroupItem;
