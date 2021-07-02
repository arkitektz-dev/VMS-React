import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CardProgressBar } from "./../../../../_ui/layout/elements";
import * as actions from "../../../store/appointments/appointmentsActions";
import { useAppointmentsUIContext } from "./../AppointmentsUIContext";

const AppointmentDeleteDialog = ({ id, show, onHide }) => {
  // Appointments UI Context
  const appointmentsUIContext = useAppointmentsUIContext();
  const appointmentsUIProps = useMemo(() => {
    return {
      queryParams: appointmentsUIContext.queryParams,
    };
  }, [appointmentsUIContext]);

  // Appointments Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.appointments.actionsLoading }),
    shallowEqual
  );

  // if no id is available we should close the confirm delete modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteAppointment = () => {
    // request server for deleting the appointment by id
    dispatch(actions.deleteAppointment(id)).then(() => {
      // to display the updated records, refresh the list after deletion
      dispatch(actions.fetchAppointments(appointmentsUIProps.queryParams));
      // closing the confirm delete modal
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      {isLoading && <CardProgressBar variant="query" />}

      <Modal.Header closeButton>
        <Modal.Title>Appointment Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this appointment?</span>
        )}
        {isLoading && <span>Appointment is deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteAppointment}
            className="btn btn-delete btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AppointmentDeleteDialog;
