import roleRepository from "../../repositories/role/roleRepository";
import { rolesSlice, callTypes } from "./rolesSlice";

const { actions } = rolesSlice;

export const fetchRoles = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return roleRepository
    .getAll(queryParams)
    .then((response) => {
      console.log(response);
      const { totalCount, items: entities } = response.data.result;
      dispatch(actions.rolesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find roles";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchRole = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.roleFetched({ roleForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return roleRepository
    .get({ id })
    .then((response) => {
      console.log(response);
      const role = response.data.result;
      role.description = role.description === null ? "" : role.description;

      dispatch(actions.roleFetched({ roleForEdit: role }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find role";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteRole = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return roleRepository
    .delete({ id })
    .then((response) => {
      console.log(response);
      dispatch(actions.roleDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete role";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createRole = (roleForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return roleRepository
    .create(roleForCreation)
    .then((response) => {
      const { role } = response.data.result;
      dispatch(actions.roleCreated({ role }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create role";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateRole = (role) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return roleRepository
    .update(role)
    .then(() => {
      dispatch(actions.roleUpdated({ role }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update role";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
