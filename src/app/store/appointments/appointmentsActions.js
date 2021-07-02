import appointmentRepository from "../../repositories/appointment/appointmentRepository";
import { appointmentsSlice, callTypes } from "./appointmentsSlice";

const { actions } = appointmentsSlice;

export const fetchAppointments = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return appointmentRepository
    .getAll(queryParams)
    .then((response) => {
      const { totalCount, items: entities } = response.data.result;
      dispatch(actions.appointmentsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find appointments";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchAppointment = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.appointmentFetched({ appointmentForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return appointmentRepository
    .get({ id })
    .then((response) => {
      console.log(response);
      const appointment = response.data.result.appointment;
      //format date and time;
      appointment.time = new Date(appointment.time).toLocaleString("en-us", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const dt = new Date(appointment.date);
      const year = dt.getFullYear();
      const month = (dt.getMonth() + 1).toString().padStart(2, "0");
      const day = dt.getDate().toString().padStart(2, "0");
      appointment.date = year + "-" + month + "-" + day;

      dispatch(actions.appointmentFetched({ appointmentForEdit: appointment }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find appointment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteAppointment = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return appointmentRepository
    .delete({ id })
    .then((response) => {
      console.log(response);
      dispatch(actions.appointmentDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete appointment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createAppointment = (appointmentForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return appointmentRepository
    .create(appointmentForCreation)
    .then((response) => {
      const { appointment } = response.data.result;
      dispatch(actions.appointmentCreated({ appointment }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create appointment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateAppointment = (appointment) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return appointmentRepository
    .update(appointment)
    .then(() => {
      dispatch(actions.appointmentUpdated({ appointment }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update appointment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
