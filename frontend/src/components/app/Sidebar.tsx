import { useContext } from "react";
import "../../styles/app/sidebar.css";
import NavBar from "./NavBar";
import { FaRegUserCircle } from "react-icons/fa";
import { UserContext } from "../../context/userContext";
import { IconContext } from "react-icons";
import IconText from "../other/IconText";
import { FaHome } from "react-icons/fa";
import ButtonLink from "../other/ButtonLink";

function Sidebar() {
  const userContext = useContext(UserContext);

  if (userContext) {
    return (
      <>
        <div id="sidebar-container">
          <div id="header-container">
            <div id="user-container">
              <IconContext.Provider value={{ size: "2rem" }}>
                <div>
                  <FaRegUserCircle />
                </div>
              </IconContext.Provider>
              <p className="text-c">{userContext.username}</p>
            </div>
            <ButtonLink to={"/"} style={{ border: "0px" }}>
              <IconText
                icon={<FaHome />}
                iconStyle={{ size: "2.5rem" }}
              ></IconText>
            </ButtonLink>
          </div>
          <NavBar></NavBar>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}

export default Sidebar;
