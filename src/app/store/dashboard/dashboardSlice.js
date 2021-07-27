import { createSlice } from "@reduxjs/toolkit";

const initialDashboardState = {
  listLoading: false,
  statistics: null,
  lastError: null,
};

export const callTypes = {
  list: "list",
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialDashboardState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      state.listLoading = false;
    },
    startCall: (state, action) => {
      state.error = null;
      state.listLoading = true;
    },
    statisticsFetched: (state, action) => {
      const { statistics } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.statistics = statistics;
    },
  },
});
