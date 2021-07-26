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
import RoleNewForm from "./RoleNewForm";
import { useSubheader } from "../../../../_ui/layout/core/Subheader";

const initRole = {
  name: "",
  displayName: "",
  normalizedName: "",
  description: "",
  grantedPermissions: [],
  actions: [],
};

function RoleNew({ history }) {
  const title = "New Role";

  // Subheader
  const subheader = useSubheader();

  const dispatch = useDispatch();

  useEffect(() => {
    subheader.setTitle(title);
  }, []);

  const saveRole = (values) => {
    dispatch(actions.createRole(values)).then(() => backToRolesList());
  };

  const btnRef = useRef();
  const saveRoleClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToRolesList = () => {
    history.push(`/settings/roles`);
  };

  return (
    <Card>
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
            onClick={saveRoleClick}
          >
            Save
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RoleNewForm role={initRole} btnRef={btnRef} saveRole={saveRole} />
      </CardBody>
    </Card>
  );
}

export default RoleNew;
