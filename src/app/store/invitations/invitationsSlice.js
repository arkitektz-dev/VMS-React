import { createSlice } from "@reduxjs/toolkit";

const initialInvitationsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  invitationForEdit: undefined,
  lastError: null,
};

export const callTypes = {
  list: "list",
  action: "action",
};

export const invitationsSlice = createSlice({
  name: "invitations",
  initialState: initialInvitationsState,
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
    // findInvitations
    invitationsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // getInvitationById
    invitationFetched: (state, action) => {
      state.actionsLoading = false;
      state.invitationForEdit = action.payload.invitationForEdit;
      state.error = null;
    },
    // deleteInvitation
    invitationDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // createInvitation
    invitationCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.invitation);
    },
    // updateInvitation
    invitationUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.invitation.id) {
          return action.payload.invitation;
        }
        return entity;
      });
    },
  },
});
