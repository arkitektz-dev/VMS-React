import React from "react";
import { Link } from "react-router-dom";
import UserProfileDropdown from "../extras/dropdowns/UserProfileDropdown";
import SiteSelectorDropdown from "../extras/dropdowns/SiteSelectorDropdown";

function Navbar() {
  return (
    <nav className="navbar p-0 fixed-top d-flex flex-row">
      <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
        <Link className="navbar-brand brand-logo-mini" to="/">
          <img
            src={require("../../../../assets/images/logo-mini.svg")}
            alt="logo"
          />
        </Link>
      </div>
      <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
        <button
          className="navbar-toggler align-self-center"
          type="button"
          onClick={() => document.body.classList.toggle("sidebar-icon-only")}
        >
          <span className="mdi mdi-menu"></span>
        </button>

        <ul className="navbar-nav navbar-nav-right">
          <SiteSelectorDropdown />

          <UserProfileDropdown />
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
