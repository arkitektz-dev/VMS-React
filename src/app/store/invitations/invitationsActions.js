import invitationRepository from "../../repositories/invitation/invitationRepository";
import { invitationsSlice, callTypes } from "./invitationsSlice";

const { actions } = invitationsSlice;

export const fetchInvitations = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return invitationRepository
    .getAll(queryParams)
    .then((response) => {
      console.log(response);
      const { totalCount, items: entities } = response.data.result;
      dispatch(actions.invitationsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find invitations";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchInvitation = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.invitationFetched({ invitationForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return invitationRepository
    .get({ id })
    .then((response) => {
      const invitation = response.data.result.myInvitation;
      //format date and time;
      invitation.time = new Date(invitation.time).toLocaleString("en-us", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const dt = new Date(invitation.date);
      const year = dt.getFullYear();
      const month = (dt.getMonth() + 1).toString().padStart(2, "0");
      const day = dt.getDate().toString().padStart(2, "0");
      invitation.date = year + "-" + month + "-" + day;

      dispatch(actions.invitationFetched({ invitationForEdit: invitation }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find invitation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteInvitation = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return invitationRepository
    .delete({ id })
    .then((response) => {
      console.log(response);
      dispatch(actions.invitationDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete invitation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createInvitation = (invitationForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return invitationRepository
    .create(invitationForCreation)
    .then((response) => {
      const { invitation } = response.data.result;
      dispatch(actions.invitationCreated({ invitation }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create invitation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateInvitation = (invitation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return invitationRepository
    .update(invitation)
    .then(() => {
      dispatch(actions.invitationUpdated({ invitation }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update invitation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
