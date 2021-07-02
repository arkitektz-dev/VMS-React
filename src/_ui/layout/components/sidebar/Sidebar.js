import React from "react";
import Brand from "../brand/Brand";
import SidebarMenu from "./sidebar-menu/SidebarMenu";

function Sidebar() {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <Brand />

      <SidebarMenu />
    </nav>
  );
}

export default Sidebar;
