import { createSlice } from "@reduxjs/toolkit";

const initialAssignedSitesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  assignedSiteForEdit: undefined,
  lastError: null,
};

export const callTypes = {
  list: "list",
  action: "action",
};

export const assignedSitesSlice = createSlice({
  name: "assignedSites",
  initialState: initialAssignedSitesState,
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
    // findAssignedSites
    assignedSitesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // getAssignedSiteById
    assignedSiteFetched: (state, action) => {
      state.actionsLoading = false;
      state.assignedSiteForEdit = action.payload.assignedSiteForEdit;
      state.error = null;
    },
    // deleteAssignedSite
    assignedSiteDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // createAssignedSite
    assignedSiteCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.assignedSite);
    },
    // updateAssignedSite
    assignedSiteUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.assignedSite.id) {
          return action.payload.assignedSite;
        }
        return entity;
      });
    },
  },
});
