import visitorRepository from "../../repositories/visitor/visitorRepository";
import { visitorsSlice, callTypes } from "./visitorsSlice";

const { actions } = visitorsSlice;

export const fetchVisitors = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return visitorRepository
    .getAll(queryParams)
    .then((response) => {
      const { totalCount, items: entities } = response.data.result;
      dispatch(actions.visitorsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find visitors";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchVisitor = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.visitorFetched({ visitorForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return visitorRepository
    .get({ id })
    .then((response) => {
      console.log(response);
      const visitor = response.data.result;
      dispatch(actions.visitorFetched({ visitorForEdit: visitor }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find visitor";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteVisitor = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return visitorRepository
    .delete({ id })
    .then((response) => {
      console.log(response);
      dispatch(actions.visitorDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete visitor";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createVisitor = (visitorForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return visitorRepository
    .create(visitorForCreation)
    .then((response) => {
      const { visitor } = response.data.result;
      dispatch(actions.visitorCreated({ visitor }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create visitor";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateVisitor = (visitor) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return visitorRepository
    .update(visitor)
    .then(() => {
      dispatch(actions.visitorUpdated({ visitor }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update visitor";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
