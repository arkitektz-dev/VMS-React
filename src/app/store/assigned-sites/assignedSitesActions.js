import assignedSiteRepository from "../../repositories/assigned-site/assignedSiteRepository";
import { assignedSitesSlice, callTypes } from "./assignedSitesSlice";

const { actions } = assignedSitesSlice;

export const fetchAssignedSites = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return assignedSiteRepository
    .getAll(queryParams)
    .then((response) => {
      const { totalCount, items: entities } = response.data.result;
      dispatch(actions.assignedSitesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find assigned sites";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchAssignedSite = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.assignedSiteFetched({ assignedSiteForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return assignedSiteRepository
    .get({ id })
    .then((response) => {
      console.log(response);
      const assignedSite = response.data.result;
      dispatch(
        actions.assignedSiteFetched({ assignedSiteForEdit: assignedSite })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find assigned site";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteAssignedSite = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return assignedSiteRepository
    .delete({ id })
    .then((response) => {
      console.log(response);
      dispatch(actions.assignedSiteDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete assigned site";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createAssignedSite = (assignedSiteForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return assignedSiteRepository
    .create(assignedSiteForCreation)
    .then((response) => {
      const { assignedSite } = response.data.result;
      dispatch(actions.assignedSiteCreated({ assignedSite }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create assigned site";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateAssignedSite = (assignedSite) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return assignedSiteRepository
    .update(assignedSite)
    .then(() => {
      dispatch(actions.assignedSiteUpdated({ assignedSite }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update assigned site";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
