import React, { useEffect, useState, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/appointments/appointmentsActions";
import * as visitorActions from "../../../store/visitors/visitorsActions";
import * as userActions from "../../../store/users/usersActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_ui/layout/elements";
import SVG from "react-inlinesvg";
import AppointmentNewForm from "./AppointmentNewForm";
import { useSubheader } from "../../../../_ui/layout/core/Subheader";

const initAppointment = {
  visitorId: "",
  employeeId: "",
  date: "",
  time: "",
  purposeOfVisit: "",
  arrivalInstructions: "",
  destination: "",
};

function AppointmentNew({ history }) {
  const title = "New Appointment";

  // Subheader
  const subheader = useSubheader();

  const dispatch = useDispatch();

  // Getting visitors and users list from store
  const { visitors, users } = useSelector(
    (state) => ({
      visitors: state.visitors.entities,
      users: state.users.entities,
    }),
    shallowEqual
  );

  useEffect(() => {
    subheader.setTitle(title);

    if (!users) {
      dispatch(userActions.fetchUsers());
    }

    if (!visitors) {
      dispatch(visitorActions.fetchVisitors());
    }
  }, []);

  const saveAppointment = (values) => {
    dispatch(actions.createAppointment(values)).then(() =>
      backToAppointmentsList()
    );
  };

  const btnRef = useRef();
  const saveAppointmentClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToAppointmentsList = () => {
    history.push(`/appointments`);
  };

  return (
    <Card>
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToAppointmentsList}
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
            onClick={saveAppointmentClick}
          >
            Save
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AppointmentNewForm
          appointment={initAppointment}
          btnRef={btnRef}
          saveAppointment={saveAppointment}
        />
      </CardBody>
    </Card>
  );
}

export default AppointmentNew;
