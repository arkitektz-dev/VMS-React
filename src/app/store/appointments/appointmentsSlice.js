import { createSlice } from "@reduxjs/toolkit";

const initialAppointmentsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  appointmentForEdit: undefined,
  lastError: null,
};

export const callTypes = {
  list: "list",
  action: "action",
};

export const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: initialAppointmentsState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // findAppointments
    appointmentsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // getAppointmentById
    appointmentFetched: (state, action) => {
      state.actionsLoading = false;
      state.appointmentForEdit = action.payload.appointmentForEdit;
      state.error = null;
    },
    // deleteAppointment
    appointmentDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // createAppointment
    appointmentCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.appointment);
    },
    // updateAppointment
    appointmentUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.appointment.id) {
          return action.payload.appointment;
        }
        return entity;
      });
    },
  },
});
