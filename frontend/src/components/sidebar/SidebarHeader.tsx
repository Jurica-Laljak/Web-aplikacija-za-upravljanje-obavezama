import { IconContext } from "react-icons";
import { FaRegUserCircle } from "react-icons/fa";
import { UserContext } from "../../context/userContext";
import IconText from "../element/IconText";
import { FaHome } from "react-icons/fa";
import ButtonLink from "../element/ButtonLink";
import { useContext } from "react";
import { UserContextType } from "../../types/user/UserContext";
import "../../styles/app/sidebar-header.css";

function SidebarHeader() {
  const userContext = useContext(UserContext) as UserContextType;

  return (
    <>
      <div id="user-container-wrapper">
        {/* <div id="user-container">
          <IconContext.Provider value={{ size: "2rem" }}>
            <div>
              <FaRegUserCircle />
            </div>
          </IconContext.Provider>
          <p className="text-c">{userContext.username}</p>
        </div> */}
      </div>
    </>
  );
}

export default SidebarHeader;
