import dashboardRepository from "../../repositories/dashboard/dashboardRepository";
import { dashboardsSlice, callTypes } from "./dashboardsSlice";

const { actions } = dashboardsSlice;

export const fetchAdminDashboardStatistics = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return dashboardRepository
    .getAdmin(queryParams)
    .then((response) => {
      console.log(response);
      //   const { totalCount, items: entities } = response.data.result;
      //   dispatch(actions.dashboardsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find dashboards";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchTenantDashboardStatistics = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return dashboardRepository
    .getTenant(queryParams)
    .then((response) => {
      console.log(response);
      //   const { totalCount, items: entities } = response.data.result;
      //   dispatch(actions.dashboardsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find dashboards";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
