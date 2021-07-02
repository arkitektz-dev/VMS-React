import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CardProgressBar } from "./../../../../_ui/layout/elements";
import * as actions from "../../../store/appointment-statuses/appointmentStatusesActions";
import { useAppointmentStatusesUIContext } from "./../AppointmentStatusesUIContext";

const AppointmentStatusDeleteDialog = ({ id, show, onHide }) => {
  // AppointmentStatuses UI Context
  const appointmentStatusesUIContext = useAppointmentStatusesUIContext();
  const appointmentStatusesUIProps = useMemo(() => {
    return {
      queryParams: appointmentStatusesUIContext.queryParams,
    };
  }, [appointmentStatusesUIContext]);

  // Appointment Statuses Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.appointmentStatuses.actionsLoading }),
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

  const deleteAppointmentStatus = () => {
    // request server for deleting the appointmentStatus by id
    dispatch(actions.deleteAppointmentStatus(id)).then(() => {
      // to display the updated records, refresh the list after deletion
      dispatch(
        actions.fetchAppointmentStatuses(appointmentStatusesUIProps.queryParams)
      );
      // closing the confirm delete modal
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      {isLoading && <CardProgressBar variant="query" />}

      <Modal.Header closeButton>
        <Modal.Title>Appointment Status Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            Are you sure to permanently delete this appointment status?
          </span>
        )}
        {isLoading && <span>Appointment status is deleting...</span>}
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
            onClick={deleteAppointmentStatus}
            className="btn btn-delete btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AppointmentStatusDeleteDialog;
