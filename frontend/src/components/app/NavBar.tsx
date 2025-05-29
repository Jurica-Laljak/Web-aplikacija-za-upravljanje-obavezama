import { useContext, useState } from "react";
import "../../styles/app/sidebar.css";
import ButtonLink from "../other/ButtonLink";
import IconText from "../other/IconText";
import { FaCalendarAlt } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { FaTableList } from "react-icons/fa6";
import { UserContext } from "../../context/userContext";
import { UserContextType } from "../../types/user/UserContext";
import { GoDotFill } from "react-icons/go";
import { largeIcon, mediumIcon, smallIcon } from "../../types/style/iconStyle";
import Button from "../other/Button";
import { MdExpandMore } from "react-icons/md";
import { IconBaseProps, IconContext } from "react-icons";
import { IoMdAdd } from "react-icons/io";
import { IoAddCircleOutline, IoAddCircleSharp } from "react-icons/io5";

function NavBar() {
  const userContext = useContext(UserContext) as UserContextType;

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
  const gapStyle: React.CSSProperties = { gap: "0.75rem" };
  const transformIcon: React.CSSProperties = { transform: "rotate(-90deg)" };
  const listOptionStyle: React.CSSProperties = {
    width: "100%",
    alignSelf: "start",
    fontSize: "1.15rem",
    justifyContent: "start",
    margin: "0.25rem",
  };

  return (
    <div id="navbar-container">
      <Button
        onClick={() => {
          userContext.setShowList(true);
        }}
        className="navbar-option transition"
        style={buttonStyle}
      >
        <div>
          <IconText
            style={gapStyle}
            icon={
              <MdExpandMore
                className="transition"
                style={userContext.showList ? transformIcon : {}}
              />
            }
            iconStyle={iconStyle}
          >
            Popisi obaveza
          </IconText>
          <div
            id="list-options-wrapper"
            style={userContext.showList ? {} : { display: "none" }}
            className="long-transition"
          >
            {userContext.lists.map((li) => (
              <ButtonLink
                key={li.listid}
                to={"/list/" + li.listid}
                className="list-option transition"
                id={
                  userContext.listid == li.listid ? "selected-list-option" : ""
                }
                style={listOptionStyle}
                onClick={() => {
                  userContext.setListid(li.listid);
                }}
              >
                <IconText icon={<GoDotFill />} iconStyle={smallIcon}>
                  {li.name}
                </IconText>
              </ButtonLink>
            ))}
            <Button
              className="list-option transition interactable"
              style={Object.assign(listOptionStyle)}
            >
              <IconText icon={<IoAddCircleSharp />} iconStyle={largeIcon}>
                Dodaj popis obaveza
              </IconText>
            </Button>
          </div>
        </div>
      </Button>
      <ButtonLink
        className="navbar-option  transition"
        id={userContext.openedTab === "filters" ? "selected-option" : ""}
        style={buttonStyle}
        to={"/filters"}
      >
        <IconText style={gapStyle} icon={<FaFilter />} iconStyle={iconStyle}>
          Filtri
        </IconText>
      </ButtonLink>
      <ButtonLink
        className="navbar-option  transition"
        id={userContext.openedTab === "calendar" ? "selected-option" : ""}
        style={buttonStyle}
        to={"/calendar"}
      >
        <IconText
          style={gapStyle}
          icon={<FaCalendarAlt />}
          iconStyle={iconStyle}
        >
          Kalendar
        </IconText>
      </ButtonLink>
    </div>
  );
}

export default NavBar;
