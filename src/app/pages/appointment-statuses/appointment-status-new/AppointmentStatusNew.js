import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../store/appointment-statuses/appointmentStatusesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_ui/layout/elements";
import AppointmentStatusNewForm from "./AppointmentStatusNewForm";
import SVG from "react-inlinesvg";
import { useSubheader } from "../../../../_ui/layout/core/Subheader";

const initAppointmentStatus = {
  status: "",
};

function AppointmentStatusNew({ history }) {
  const title = "New Appointment Status";

  // Subheader
  const subheader = useSubheader();

  const dispatch = useDispatch();

  useEffect(() => {
    subheader.setTitle(title);
  }, []);

  const saveAppointmentStatus = (values) => {
    dispatch(actions.createAppointmentStatus(values)).then(() =>
      backToAppointmentStatusesList()
    );
  };

  const btnRef = useRef();
  const saveAppointmentStatusClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToAppointmentStatusesList = () => {
    history.push(`/appointment-statuses`);
  };

  return (
    <Card>
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
            onClick={saveAppointmentStatusClick}
          >
            Save
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AppointmentStatusNewForm
          appointmentStatus={initAppointmentStatus}
          btnRef={btnRef}
          saveAppointmentStatus={saveAppointmentStatus}
        />
      </CardBody>
    </Card>
  );
}

export default AppointmentStatusNew;
