import { createSlice } from "@reduxjs/toolkit";

const initialSitesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  siteForEdit: undefined,
  lastError: null,
};

export const callTypes = {
  list: "list",
  action: "action",
};

export const sitesSlice = createSlice({
  name: "sites",
  initialState: initialSitesState,
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
    // findSites
    sitesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // getSiteById
    siteFetched: (state, action) => {
      state.actionsLoading = false;
      state.siteForEdit = action.payload.siteForEdit;
      state.error = null;
    },
    // deleteSite
    siteDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // createSite
    siteCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.site);
    },
    // updateSite
    siteUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.site.id) {
          return action.payload.site;
        }
        return entity;
      });
    },
  },
});
