import React, { useEffect, useState, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/assigned-sites/assignedSitesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_ui/layout/elements";
import SVG from "react-inlinesvg";
import AssignedSiteEditForm from "./AssignedSiteEditForm";
import { useSubheader } from "../../../../_ui/layout/core/Subheader";
import { CardProgressBar } from "./../../../../_ui/layout/elements";

const initAssignedSite = {
  id: undefined,
  assignedSiteName: "",
  name: "",
  surname: "",
  emailAddress: "",
  isActive: true,
  fullName: "",
  roleNames: [],
  password: "",
};

function AssignedSiteEdit({
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
  const { actionsLoading, assignedSiteForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.assignedSites.actionsLoading,
      assignedSiteForEdit: state.assignedSites.assignedSiteForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchAssignedSite(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (assignedSiteForEdit && id) {
      const _title = `Edit assigned site '${assignedSiteForEdit.name}'`;
      setTitle(_title);
      subheader.setTitle(_title);
    }
  }, [assignedSiteForEdit, id]);

  const updateAssignedSite = (values) => {
    dispatch(actions.updateAssignedSite(values)).then(() =>
      backToAssignedSitesList()
    );
  };

  const btnRef = useRef();
  const updateAssignedSiteClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToAssignedSitesList = () => {
    history.push(`/assigned-sites`);
  };

  return (
    <Card>
      {actionsLoading && <CardProgressBar />}

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
            onClick={updateAssignedSiteClick}
          >
            Update
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AssignedSiteEditForm
          actionsLoading={actionsLoading}
          assignedSite={assignedSiteForEdit || initAssignedSite}
          btnRef={btnRef}
          updateAssignedSite={updateAssignedSite}
        />
      </CardBody>
    </Card>
  );
}

export default AssignedSiteEdit;
