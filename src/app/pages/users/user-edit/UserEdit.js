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
import SVG from "react-inlinesvg";
import UserEditForm from "./UserEditForm";
import { useSubheader } from "../../../../_ui/layout/core/Subheader";
import { CardProgressBar } from "./../../../../_ui/layout/elements";

const initUser = {
  id: undefined,
  userName: "",
  name: "",
  surname: "",
  emailAddress: "",
  isActive: true,
  fullName: "",
  roleNames: [],
  password: "",
};

function UserEdit({
  history,
  match: {
    params: { id },
  },
}) {
  //state
  const [title, setTitle] = useState("");

  // Subheader
  const subheader = useSubheader();

  const dispatch = useDispatch();

  //get state from store
  const { actionsLoading, userForEdit, roles } = useSelector(
    (state) => ({
      actionsLoading: state.users.actionsLoading,
      userForEdit: state.users.userForEdit,
      roles: state.roles.entities,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchUser(id));

    if (!roles) {
      dispatch(roleActions.fetchRoles());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (userForEdit && id) {
      const _title = `Edit user '${userForEdit.name}'`;
      setTitle(_title);
      subheader.setTitle(_title);
    }
  }, [userForEdit, id]);

  const updateUser = (values) => {
    dispatch(actions.updateUser(values)).then(() => backToUsersList());
  };

  const btnRef = useRef();
  const updateUserClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToUsersList = () => {
    history.push(`/settings/users`);
  };

  return (
    <Card>
      {actionsLoading && <CardProgressBar />}

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
            onClick={updateUserClick}
          >
            Update
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <UserEditForm
          actionsLoading={actionsLoading}
          user={userForEdit || initUser}
          btnRef={btnRef}
          updateUser={updateUser}
        />
      </CardBody>
    </Card>
  );
}

export default UserEdit;
