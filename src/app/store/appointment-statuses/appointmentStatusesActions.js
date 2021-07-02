import appointmentStatusRepository from "../../repositories/appointment-status/appointmentStatusRepository";
import {
  appointmentStatusesSlice,
  callTypes,
} from "./appointmentStatusesSlice";

const { actions } = appointmentStatusesSlice;

export const fetchAppointmentStatuses = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return appointmentStatusRepository
    .getAll(queryParams)
    .then((response) => {
      const { totalCount, items: entities } = response.data.result;
      dispatch(actions.appointmentStatusesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find appointment statuses";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchAppointmentStatus = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.appointmentStatusFetched({ appointmentStatusForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return appointmentStatusRepository
    .get({ id })
    .then((response) => {
      console.log(response);
      const appointmentStatus = response.data.result;
      dispatch(
        actions.appointmentStatusFetched({
          appointmentStatusForEdit: appointmentStatus,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find appointment status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteAppointmentStatus = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return appointmentStatusRepository
    .delete({ id })
    .then((response) => {
      console.log(response);
      dispatch(actions.appointmentStatusDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete appointment status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createAppointmentStatus =
  (appointmentStatusForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return appointmentStatusRepository
      .create(appointmentStatusForCreation)
      .then((response) => {
        const { appointmentStatus } = response.data.result;
        dispatch(actions.appointmentStatusCreated({ appointmentStatus }));
      })
      .catch((error) => {
        error.clientMessage = "Can't create appointment status";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
      });
  };

export const updateAppointmentStatus = (appointmentStatus) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return appointmentStatusRepository
    .update(appointmentStatus)
    .then(() => {
      dispatch(actions.appointmentStatusUpdated({ appointmentStatus }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update appointment status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
