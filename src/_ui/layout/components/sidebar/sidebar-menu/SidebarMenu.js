import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import { Trans } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { appRouters } from "./../../../../../app/config/router";
import { isGranted } from "./../../../utilities/route";
import { useSelector } from "react-redux";
import { shallowEqual } from "react-redux";

function SidebarMenu() {
  const { permissions, isSuperAdmin } = useSelector(
    ({ auth }) => ({
      permissions: auth.permissions,
      isSuperAdmin: auth.tenant === null,
    }),
    shallowEqual
  );

    console.log(isSuperAdmin);
  const [menuExpandedItems, setMenuExpandedItems] = useState([]);

  const { pathname } = useLocation();

  const toggleMenuState = (menuItem) => {
    if (!menuExpandedItems.includes(menuItem)) {
      setMenuExpandedItems([menuItem, ...menuExpandedItems]);
    } else {
      const expandedItems = menuExpandedItems.filter(
        (item) => item !== menuItem
      );
      setMenuExpandedItems(expandedItems);
    }
  };

  const getExpandedStateClass = (menuItem) => {
    return menuExpandedItems.includes(menuItem) ? " menu-expanded" : "";
  };

  const getActiveClass = (path) => {
    return pathname.startsWith(path) ? " active" : "";
  };

  return (
    <ul className="nav">
      <li className={`nav-item menu-items${getActiveClass("/dashboard")}`}>
        <Link className="nav-link" to="/dashboard">
          <span className="menu-icon">
            <i className="mdi mdi-speedometer"></i>
          </span>
          <span className="menu-title">
            <Trans>Dashboard</Trans>
          </span>
        </Link>
      </li>
      {appRouters.map((route, index) => {
        if (route.permission && !isGranted(route.permission, permissions))
          return null;

        if (route.showInAdminMenu && !isSuperAdmin) return null;

        return (
          <li
            key={route.name}
            className={`nav-item menu-items${getActiveClass(route.path)}`}
          >
            <Link className="nav-link" to={route.path}>
              <span className="menu-icon">
                <i className="mdi mdi-speedometer"></i>
              </span>
              <span className="menu-title">
                <Trans>{route.title}</Trans>
              </span>
            </Link>
          </li>
        );
      })}

      {/* <li className={`nav-item menu-items${getActiveClass("/dashboard")}`}>
        <Link className="nav-link" to="/dashboard">
          <span className="menu-icon">
            <i className="mdi mdi-speedometer"></i>
          </span>
          <span className="menu-title">
            <Trans>Dashboard</Trans>
          </span>
        </Link>
      </li>
      <li className={`nav-item menu-items${getActiveClass("/users")}`}>
        <Link className="nav-link" to="/users">
          <span className="menu-icon">
            <i className="mdi mdi-speedometer"></i>
          </span>
          <span className="menu-title">
            <Trans>Users</Trans>
          </span>
        </Link>
      </li>
      <li className={`nav-item menu-items${getActiveClass("/tenants")}`}>
        <Link className="nav-link" to="/tenants">
          <span className="menu-icon">
            <i className="mdi mdi-speedometer"></i>
          </span>
          <span className="menu-title">
            <Trans>Tenants</Trans>
          </span>
        </Link>
      </li>
      <li className={`nav-item menu-items${getActiveClass("/sites")}`}>
        <Link className="nav-link" to="/sites">
          <span className="menu-icon">
            <i className="mdi mdi-speedometer"></i>
          </span>
          <span className="menu-title">
            <Trans>Sites</Trans>
          </span>
        </Link>
      </li>
      <li className={`nav-item menu-items${getActiveClass("/roles")}`}>
        <Link className="nav-link" to="/roles">
          <span className="menu-icon">
            <i className="mdi mdi-speedometer"></i>
          </span>
          <span className="menu-title">
            <Trans>Roles</Trans>
          </span>
        </Link>
      </li>
      <li className={`nav-item menu-items${getActiveClass("/visitors")}`}>
        <Link className="nav-link" to="/visitors">
          <span className="menu-icon">
            <i className="mdi mdi-speedometer"></i>
          </span>
          <span className="menu-title">
            <Trans>Visitors</Trans>
          </span>
        </Link>
      </li>
      <li className={`nav-item menu-items${getActiveClass("/invitations")}`}>
        <Link className="nav-link" to="/invitations">
          <span className="menu-icon">
            <i className="mdi mdi-speedometer"></i>
          </span>
          <span className="menu-title">
            <Trans>Invitations</Trans>
          </span>
        </Link>
      </li>
      <li className={`nav-item menu-items${getActiveClass("/appointments")}`}>
        <Link className="nav-link" to="/appointments">
          <span className="menu-icon">
            <i className="mdi mdi-speedometer"></i>
          </span>
          <span className="menu-title">
            <Trans>Appointments</Trans>
          </span>
        </Link>
      </li>
      <li className={`nav-item menu-items${getActiveClass("/assigned-sites")}`}>
        <Link className="nav-link" to="/assigned-sites">
          <span className="menu-icon">
            <i className="mdi mdi-speedometer"></i>
          </span>
          <span className="menu-title">
            <Trans>Assigned Sites</Trans>
          </span>
        </Link>
      </li>
      <li
        className={`nav-item menu-items${getActiveClass(
          "/appointment-statuses"
        )}`}
      >
        <Link className="nav-link" to="/appointment-statuses">
          <span className="menu-icon">
            <i className="mdi mdi-speedometer"></i>
          </span>
          <span className="menu-title">
            <Trans>Appointment Statuses</Trans>
          </span>
        </Link>
      </li> */}
    </ul>
  );
}

export default SidebarMenu;
