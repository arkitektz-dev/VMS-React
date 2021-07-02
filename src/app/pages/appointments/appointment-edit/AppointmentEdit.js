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
import AppointmentEditForm from "./AppointmentEditForm";
import { useSubheader } from "../../../../_ui/layout/core/Subheader";
import { CardProgressBar } from "./../../../../_ui/layout/elements";

const initAppointment = {
  id: undefined,
  visitorId: "",
  employeeId: "",
  date: "",
  time: "",
  purposeOfVisit: "",
  arrivalInstructions: "",
  destination: "",
};

function AppointmentEdit({
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

  const { actionsLoading, appointmentForEdit, users, visitors } = useSelector(
    (state) => ({
      actionsLoading: state.appointments.actionsLoading,
      appointmentForEdit: state.appointments.appointmentForEdit,
      users: state.users.entities,
      visitors: state.visitors.entities,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchAppointment(id));

    if (!users) {
      dispatch(userActions.fetchUsers());
    }

    if (!visitors) {
      dispatch(visitorActions.fetchVisitors());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (appointmentForEdit && id) {
      const _title = `Edit invitation`;
      // const _title = `Edit appointment '${appointmentForEdit.appointmentName}'`;
      setTitle(_title);
      subheader.setTitle(_title);
    }
  }, [appointmentForEdit, id]);

  const updateAppointment = (values) => {
    var val = {
      ...values,
      id,
    };

    dispatch(actions.updateAppointment(val)).then(() =>
      backToAppointmentsList()
    );
  };

  const btnRef = useRef();
  const updateAppointmentClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToAppointmentsList = () => {
    history.push(`/appointments`);
  };

  return (
    <Card>
      {actionsLoading && <CardProgressBar />}

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
            onClick={updateAppointmentClick}
          >
            Update
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AppointmentEditForm
          actionsLoading={actionsLoading}
          appointment={appointmentForEdit || initAppointment}
          btnRef={btnRef}
          updateAppointment={updateAppointment}
        />
      </CardBody>
    </Card>
  );
}

export default AppointmentEdit;
