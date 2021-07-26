import React, { useEffect, useState, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/assigned-sites/assignedSitesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_ui/layout/elements";
import AssignedSiteNewForm from "./AssignedSiteNewForm";
import SVG from "react-inlinesvg";
import { useSubheader } from "../../../../_ui/layout/core/Subheader";

const initAssignedSite = {
  assignedSiteName: "",
  name: "",
  surname: "",
  emailAddress: "",
  isActive: true,
  roleNames: [],
  password: "",
};

function AssignedSiteNew({ history }) {
  const title = "New Assigned Site";

  // Subheader
  const subheader = useSubheader();

  const dispatch = useDispatch();

  useEffect(() => {
    subheader.setTitle(title);
  }, []);

  const saveAssignedSite = (values) => {
    dispatch(actions.createAssignedSite(values)).then(() =>
      backToAssignedSitesList()
    );
  };

  const btnRef = useRef();
  const saveAssignedSiteClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToAssignedSitesList = () => {
    history.push(`/settings/assigned-sites`);
  };

  return (
    <Card>
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToAssignedSitesList}
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
            onClick={saveAssignedSiteClick}
          >
            Save
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AssignedSiteNewForm
          assignedSite={initAssignedSite}
          btnRef={btnRef}
          saveAssignedSite={saveAssignedSite}
        />
      </CardBody>
    </Card>
  );
}

export default AssignedSiteNew;
