import React from "react";
import { Dropdown } from "react-bootstrap";
import { Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { actions } from "./../../../../../app/store/auth/action";
import { useDispatch, useSelector } from "react-redux";

function UserProfileDropdown() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Dropdown alignRight as="li" className="nav-item">
      <Dropdown.Toggle as="a" className="nav-link cursor-pointer no-caret">
        <div className="navbar-profile">
          <img
            className="img-xs rounded-circle"
            src={require("../../../../../assets/images/faces/face15.jpg")}
            alt="profile"
          />
          <p className="mb-0 d-none d-sm-block navbar-profile-name">
            <Trans>{user.name}</Trans>
          </p>
          <i className="mdi mdi-menu-down d-none d-sm-block"></i>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className="navbar-dropdown preview-list navbar-profile-dropdown-menu">
        <h6 className="p-3 mb-0">
          <Trans>Profile</Trans>
        </h6>
        <Dropdown.Divider />
        <Dropdown.Item className="preview-item">
          <div className="preview-thumbnail">
            <div className="preview-icon bg-dark rounded-circle">
              <i className="mdi mdi-settings text-success"></i>
            </div>
          </div>
          <div className="preview-item-content">
            <p className="preview-subject mb-1">
              <Link to="/settings">
                <Trans>Settings</Trans>
              </Link>
            </p>
          </div>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          href="!#"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(actions.logout());
          }}
          className="preview-item"
        >
          <div className="preview-thumbnail">
            <div className="preview-icon bg-dark rounded-circle">
              <i className="mdi mdi-logout text-danger"></i>
            </div>
          </div>
          <div className="preview-item-content">
            <p className="preview-subject mb-1">
              <Trans>Log Out</Trans>
            </p>
          </div>
        </Dropdown.Item>
        <Dropdown.Divider />
        {/* <p className="p-3 mb-0 text-center">
          <Trans>Advanced settings</Trans>
        </p> */}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserProfileDropdown;
