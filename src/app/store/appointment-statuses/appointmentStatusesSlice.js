import { createSlice } from "@reduxjs/toolkit";

const initialAppointmentStatusesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  appointmentStatusForEdit: undefined,
  lastError: null,
};

export const callTypes = {
  list: "list",
  action: "action",
};

export const appointmentStatusesSlice = createSlice({
  name: "appointmentStatuses",
  initialState: initialAppointmentStatusesState,
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
    // findAppointmentStatuses
    appointmentStatusesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // getAppointmentStatusById
    appointmentStatusFetched: (state, action) => {
      state.actionsLoading = false;
      state.appointmentStatusForEdit = action.payload.appointmentStatusForEdit;
      state.error = null;
    },
    // deleteAppointmentStatus
    appointmentStatusDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // createAppointmentStatus
    appointmentStatusCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.appointmentStatus);
    },
    // updateAppointmentStatus
    appointmentStatusUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.appointmentStatus.id) {
          return action.payload.appointmentStatus;
        }
        return entity;
      });
    },
  },
});
