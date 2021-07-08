import { createSlice } from "@reduxjs/toolkit";

const initialInstallationsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  installationForEdit: undefined,
  lastError: null,
};

export const callTypes = {
  list: "list",
  action: "action",
};

export const installationsSlice = createSlice({
  name: "intallations",
  initialState: initialInstallationsState,
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
    // findInstallations
    installationsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // installationUpdateStatus
    intallationStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { id, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (id === entity.id) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
