import React, { useEffect, useState, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/roles/rolesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_ui/layout/elements";
import SVG from "react-inlinesvg";
import RoleEditForm from "./RoleEditForm";
import { useSubheader } from "../../../../_ui/layout/core/Subheader";
import { CardProgressBar } from "./../../../../_ui/layout/elements";

const initRole = {
  id: undefined,
  name: "",
  displayName: "",
  normalizedName: "",
  description: "",
  grantedPermissions: [],
  actions: "",
};

function RoleEdit({
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

  const { actionsLoading, roleForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.roles.actionsLoading,
      roleForEdit: state.roles.roleForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchRole(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (roleForEdit && id) {
      const _title = `Edit role '${roleForEdit.name}'`;
      setTitle(_title);
      subheader.setTitle(_title);
    }
  }, [roleForEdit, id]);

  const updateRole = (values) => {
    dispatch(actions.updateRole(values)).then(() => backToRolesList());
  };

  const btnRef = useRef();
  const updateRoleClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToRolesList = () => {
    history.push(`/settings/roles`);
  };

  return (
    <Card>
      {actionsLoading && <CardProgressBar />}

      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToRolesList}
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
            onClick={updateRoleClick}
          >
            Update
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RoleEditForm
          actionsLoading={actionsLoading}
          role={roleForEdit || initRole}
          btnRef={btnRef}
          updateRole={updateRole}
        />
      </CardBody>
    </Card>
  );
}

export default RoleEdit;
