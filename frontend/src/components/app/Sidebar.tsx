import "../../styles/app/sidebar.css";
import NavBar from "./NavBar";
import SidebarHeader from "./SidebarHeader";

function Sidebar() {
  return (
    <>
      <div id="sidebar-container">
        <SidebarHeader></SidebarHeader>
        <NavBar></NavBar>
      </div>
    </>
  );
}

export default Sidebar;
