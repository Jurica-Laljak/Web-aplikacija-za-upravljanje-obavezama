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
import { injectContent } from "../../handlers/app/injectContent";
import { UserContext } from "../../context/userContext";
import { UserContextType } from "../../types/user/UserContext";
import { ViewContext } from "../../context/viewContext";
import { ViewContextType } from "../../types/other/ViewContext";
import { deleteContent } from "../../handlers/app/deleteContent";
import { apiPatchGroup } from "../../handlers/group/apiPatchGroup";
import { apiDeleteGroup } from "../../handlers/group/apiDeleteGroup";
import { apiPatchMultipleGroups } from "../../handlers/group/apiPatchMultipleGroups";
import { injectCheckbox } from "../../handlers/app/injectCheckbox";
import { apiAssociateFilters } from "../../handlers/group/apiAssociateFilters";

function ToDoGroupItem(props: { group: GroupInternal }) {
  const userContext = useContext(UserContext) as UserContextType;
  const viewContext = useContext(ViewContext) as ViewContextType;
  const listContext = useContext(ListContext) as ListContextType;
  const filterContext = useContext(FilterContext) as FilterContextType;
  const [selected, setSelected] = useState(true);

  function handleEditGroup() {
    const currState = {
      name: props.group.name,
    };
    injectContent(
      viewContext,
      userContext,
      listContext,
      "Preimenujte grupu obaveza",
      currState,
      apiPatchGroup,
      { ...currState, groupid: props.group.groupid }
    );
  }

  function handleDeleteGroup() {
    deleteContent(
      viewContext,
      userContext,
      listContext,
      "grupu obaveza",
      { groupid: props.group.groupid },
      apiDeleteGroup
    );
  }

  function handleExpandGroup() {
    setSelected(!selected);
  }

  function handleSwitchOrder(moveUp: boolean) {
    var otherGroupId: number | undefined;
    if (moveUp)
      otherGroupId = listContext.groups.find(
        (g) => g.serialnumber == props.group.serialnumber - 1
      )?.groupid;
    else
      otherGroupId = listContext.groups.find(
        (g) => g.serialnumber == props.group.serialnumber + 1
      )?.groupid;

    if (otherGroupId)
      apiPatchMultipleGroups(
        { group1Id: props.group.groupid, group2Id: otherGroupId },
        userContext,
        listContext
      );
  }

  function handleModifyFilters() {
    injectCheckbox(
      viewContext,
      userContext,
      listContext,
      filterContext,
      `Uredite filtre za grupu - "${props.group.name}"`,
      props.group.groupid,
      filterContext.filters.map((f) =>
        props.group.filterids.some((fId) => fId == f.filterid)
          ? { key: f.filterid, value: f.name, checked: true }
          : { key: f.filterid, value: f.name, checked: false }
      ),
      apiAssociateFilters
    );
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
                onClick={() => handleSwitchOrder(true)}
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
                onClick={() => handleSwitchOrder(false)}
              ></IconText>
            </Button>
          </div>
          <Button style={{ all: "unset" }} onClick={handleExpandGroup}>
            <IconText
              icon={<IoMdArrowDropdown />}
              iconStyle={
                props.group.virtualToDoIds.length > 0
                  ? { ...veryLargeIcon, color: "var(--secondary-color)" }
                  : { ...veryLargeIcon, color: "white" }
              }
              className={`hover transition ${
                selected ? "expand-arrow-selected" : "expand-arrow"
              }`}
            ></IconText>
          </Button>
          <br />
          <Button style={{ all: "unset" }} onClick={handleEditGroup}>
            <IconText
              icon={<CgRename />}
              iconStyle={{ ...largeIcon, color: "var(--secondary-color)" }}
              className="hover"
            ></IconText>
          </Button>
          {props.group.name}
          <Button style={{ all: "unset" }} onClick={handleDeleteGroup}>
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
            onClick={handleModifyFilters}
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
