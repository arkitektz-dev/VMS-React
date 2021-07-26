import React from "react";
import Brand from "../brand/Brand";
import SidebarMenu from "./sidebar-menu/SidebarMenu";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";

function Sidebar() {
  return (
    <nav
      className="sidebar sidebar-offcanvas"
      id="sidebar"
      style={{ position: "fixed", right: 0 }}
    >
      <ul className="nav">
        <li className={`nav-item menu-items`}>
          <Link className="nav-link" to="/dashboard">
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
            </span>
            <span className="menu-title">
              <Trans>Dashboard</Trans>
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
