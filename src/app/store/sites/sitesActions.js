import siteRepository from "../../repositories/site/siteRepository";
import { sitesSlice, callTypes } from "./sitesSlice";

const { actions } = sitesSlice;

export const fetchSites = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return siteRepository
    .getAll(queryParams)
    .then((response) => {
      console.log(response);
      const { totalCount, items: entities } = response.data.result;
      dispatch(actions.sitesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find sites";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchSite = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.siteFetched({ siteForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return siteRepository
    .get({ id })
    .then((response) => {
      console.log(response);
      const site = response.data.result;
      dispatch(actions.siteFetched({ siteForEdit: site }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find site";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteSite = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return siteRepository
    .delete({ id })
    .then((response) => {
      console.log(response);
      dispatch(actions.siteDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete site";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createSite = (siteForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return siteRepository
    .create(siteForCreation)
    .then((response) => {
      const { site } = response.data.result;
      dispatch(actions.siteCreated({ site }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create site";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateSite = (site) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return siteRepository
    .update(site)
    .then(() => {
      dispatch(actions.siteUpdated({ site }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update site";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
