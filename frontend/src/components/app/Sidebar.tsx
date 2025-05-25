import { useContext } from "react";
import "../../styles/app/sidebar.css";
import NavBar from "./NavBar";
import { FaRegUserCircle } from "react-icons/fa";
import { UserContext } from "../../context/userContext";
import { IconContext } from "react-icons";

function Sidebar() {
  const userContext = useContext(UserContext);

  if (userContext) {
    return (
      <>
        <div id="user-container">
          <IconContext.Provider
            value={{ color: "var(--main-color)", size: "2rem" }}
          >
            <div>
              <FaRegUserCircle />
            </div>
          </IconContext.Provider>
          <p className="text-c">{userContext.username}</p>
        </div>
        <div id="sidebar-container">
          <NavBar></NavBar>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}

export default Sidebar;
