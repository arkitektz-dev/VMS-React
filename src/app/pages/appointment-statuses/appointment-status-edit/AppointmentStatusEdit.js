import React, { useEffect, useState, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/appointment-statuses/appointmentStatusesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_ui/layout/elements";
import SVG from "react-inlinesvg";
import AppointmentStatusEditForm from "./AppointmentStatusEditForm";
import { useSubheader } from "../../../../_ui/layout/core/Subheader";
import { CardProgressBar } from "./../../../../_ui/layout/elements";

const initAppointmentStatus = {
  id: undefined,
  status: "",
};

function AppointmentStatusEdit({
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
  const { actionsLoading, appointmentStatusForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.appointmentStatuses.actionsLoading,
      appointmentStatusForEdit:
        state.appointmentStatuses.appointmentStatusForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchAppointmentStatus(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (appointmentStatusForEdit && id) {
      const _title = `Edit appointment status '${appointmentStatusForEdit.status}'`;
      setTitle(_title);
      subheader.setTitle(_title);
    }
  }, [appointmentStatusForEdit, id]);

  const updateAppointmentStatus = (values) => {
    dispatch(actions.updateAppointmentStatus(values)).then(() =>
      backToAppointmentStatusesList()
    );
  };

  const btnRef = useRef();
  const updateAppointmentStatusClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToAppointmentStatusesList = () => {
    history.push(`/appointment-statuses`);
  };

  return (
    <Card>
      {actionsLoading && <CardProgressBar />}

      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToAppointmentStatusesList}
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
            onClick={updateAppointmentStatusClick}
          >
            Update
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AppointmentStatusEditForm
          actionsLoading={actionsLoading}
          appointmentStatus={appointmentStatusForEdit || initAppointmentStatus}
          btnRef={btnRef}
          updateAppointmentStatus={updateAppointmentStatus}
        />
      </CardBody>
    </Card>
  );
}

export default AppointmentStatusEdit;
