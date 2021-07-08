import installationRepository from "../../../repositories/probe-application/installation/installationRepository";
import { installationsSlice, callTypes } from "./installationsSlice";

const { actions } = installationsSlice;

export const fetchInstallations = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return installationRepository
    .getAll(queryParams)
    .then((response) => {
      console.log(response);
      const { totalCount, items: entities } = response.data.result;
      dispatch(actions.installationsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find installations";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const updateInstallationStatus = (id, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return installationRepository
    .updateStatus(id, status)
    .then(() => {
      dispatch(actions.intallationStatusUpdated({ id, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update installation status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
