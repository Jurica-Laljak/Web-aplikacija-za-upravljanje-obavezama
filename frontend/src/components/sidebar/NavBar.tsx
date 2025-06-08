import { useContext, useEffect } from "react";
import "../../styles/app/sidebar.css";
import ButtonLink from "../element/ButtonLink";
import IconText from "../element/IconText";
import { FaCalendarAlt, FaHome, FaRegListAlt } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { UserContext } from "../../context/userContext";
import { UserContextType } from "../../types/user/UserContext";
import { GoDotFill } from "react-icons/go";
import { largeIcon, mediumIcon, smallIcon } from "../../types/style/iconStyle";
import Button from "../element/Button";
import { MdExpandMore } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import { IconContext } from "react-icons";
import { ViewContext } from "../../context/viewContext";
import { ViewContextType } from "../../types/other/ViewContext";
import { filterNames } from "../../data/filterNames";
import { capitalize } from "../../helper/capitalize";
import { filterIcon } from "../../data/filterIcon";
import { useLocation } from "react-router";
import TextField from "../element/TextField";
import { FilterContext } from "../../context/filterContext";
import { FilterContextType } from "../../types/filter/FilterContextType";
import { injectContent } from "../../handlers/app/injectContent";
import { ToDoListInsert } from "../../../../backend/src/interfaces/list/ToDoListInsert";
import { apiPostList } from "../../handlers/list/apiPostList";

function NavBar() {
  const userContext = useContext(UserContext) as UserContextType;
  const viewContext = useContext(ViewContext) as ViewContextType;
  const location = useLocation();

  // styles
  const buttonStyle: React.CSSProperties = {
    border: "hidden",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    borderRadius: "1rem",
    textDecoration: "underline",
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "var(--main-color)",
  };
  const iconStyle: IconContext = { size: "2rem" };
  const gapStyle: React.CSSProperties = {
    gap: "0.75rem",
    justifyContent: "flex-start",
  };
  // const transformIcon: React.CSSProperties = { transform: "rotate(-90deg)" };
  const listOptionStyle: React.CSSProperties = {
    width: "100%",
    alignSelf: "start",
    fontSize: "1.15rem",
    justifyContent: "start",
    margin: "0.25rem",
  };

  //handlers
  function handleAddList() {
    const emptyObj: ToDoListInsert = {
      name: "",
    };

    injectContent(
      viewContext,
      userContext,
      undefined,
      "Dodajte popis obaveza",
      emptyObj,
      apiPostList
    );
  }

  return (
    <>
      <div className="navbar-container">
        <ButtonLink
          className="navbar-option"
          id={location.pathname === "/" ? "selected-list-option" : ""}
          style={buttonStyle}
          to={"/"}
        >
          <IconText icon={<FaHome />} iconStyle={largeIcon}>
            Početna stranica
          </IconText>
        </ButtonLink>
      </div>
      <div className="navbar-container">
        <Button className="navbar-option" style={buttonStyle}>
          <div>
            <IconText
              className="option-header"
              style={gapStyle}
              icon={<FaRegListAlt />}
              iconStyle={iconStyle}
            >
              Popisi obaveza
            </IconText>
            <div className="options-wrapper" id="todolistlabel">
              {userContext.lists.map((li) => (
                <ButtonLink
                  key={li.listid}
                  to={`/list/${li.listid}`}
                  className="list-option"
                  id={
                    location.pathname == `/list/${li.listid}`
                      ? "selected-list-option"
                      : ""
                  }
                  style={listOptionStyle}
                >
                  <IconText icon={<GoDotFill />} iconStyle={smallIcon}>
                    {li.name}
                  </IconText>
                </ButtonLink>
              ))}
              <Button
                className="list-option transition interactable"
                style={Object.assign(listOptionStyle)}
                onClick={() => handleAddList()}
              >
                <IconText icon={<IoAddCircleSharp />} iconStyle={largeIcon}>
                  Dodajte popis obaveza{" "}
                </IconText>
              </Button>
            </div>
          </div>
        </Button>
        <Button className="navbar-option" style={buttonStyle}>
          <div>
            <IconText
              className="option-header"
              style={gapStyle}
              icon={<FaFilter />}
              iconStyle={iconStyle}
            >
              Filtri
            </IconText>
            <div className="options-wrapper">
              {filterNames.map((fi) => (
                <ButtonLink
                  to={`/filter/${fi}`}
                  id={
                    location.pathname == `/filter/${fi}`
                      ? "selected-list-option"
                      : ""
                  }
                  key={fi}
                  style={listOptionStyle}
                  className="list-option"
                >
                  <IconText icon={filterIcon[fi]} iconStyle={largeIcon}>
                    {capitalize(fi)} filtri
                  </IconText>
                </ButtonLink>
              ))}
            </div>
          </div>
        </Button>
      </div>
    </>
  );
}

export default NavBar;
