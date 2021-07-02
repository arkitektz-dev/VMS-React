import React, { useEffect, useState, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/users/usersActions";
import * as roleActions from "../../../store/roles/rolesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_ui/layout/elements";
import UserNewForm from "./UserNewForm";
import SVG from "react-inlinesvg";
import { useSubheader } from "../../../../_ui/layout/core/Subheader";

const initUser = {
  userName: "",
  name: "",
  surname: "",
  emailAddress: "",
  isActive: true,
  roleNames: [],
  password: "",
};

function UserNew({ history }) {
  const title = "New User";

  // Subheader
  const subheader = useSubheader();

  const dispatch = useDispatch();

  // Getting roles list from store
  const { roles } = useSelector(
    (state) => ({ roles: state.roles.entities }),
    shallowEqual
  );

  useEffect(() => {
    subheader.setTitle(title);

    if (!roles) {
      dispatch(roleActions.fetchRoles());
    }
  }, []);

  const saveUser = (values) => {
    dispatch(actions.createUser(values)).then(() => backToUsersList());
  };

  const btnRef = useRef();
  const saveUserClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToUsersList = () => {
    history.push(`/users`);
  };

  return (
    <Card>
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToUsersList}
            className="btn btn-light"
          >
            <span className="svg-icon svg-icon-sm svg-icon-primary">
              <SVG src="/assets/images/icons/svg/arrow-left.svg" />
            </span>
            Back
          </button>
          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={saveUserClick}
          >
            Save
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <UserNewForm user={initUser} btnRef={btnRef} saveUser={saveUser} />
      </CardBody>
    </Card>
  );
}

export default UserNew;
