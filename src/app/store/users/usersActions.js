import userRepository from "../../repositories/user/userRepository";
import { usersSlice, callTypes } from "./usersSlice";

const { actions } = usersSlice;

export const fetchUsers = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return userRepository
    .getAll(queryParams)
    .then((response) => {
      const { totalCount, items: entities } = response.data.result;
      dispatch(actions.usersFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find users";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchUser = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.userFetched({ userForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return userRepository
    .get({ id })
    .then((response) => {
      console.log(response);
      const user = response.data.result;
      dispatch(actions.userFetched({ userForEdit: user }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteUser = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return userRepository
    .delete({ id })
    .then((response) => {
      console.log(response);
      dispatch(actions.userDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createUser = (userForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return userRepository
    .create(userForCreation)
    .then((response) => {
      const { user } = response.data.result;
      dispatch(actions.userCreated({ user }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateUser = (user) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return userRepository
    .update(user)
    .then(() => {
      dispatch(actions.userUpdated({ user }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
