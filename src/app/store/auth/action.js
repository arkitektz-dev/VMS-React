export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  SetUser: "[Set User] Action",

  ConfigurationRequested: "[Request Configuration] Action",
  ConfigurationLoaded: "[Load Configuration] Configuration API",
  SetConfiguration: "[Set Configuration] Action",
};

export const actions = {
  login: (payload) => ({ type: actionTypes.Login, payload }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: () => ({ type: actionTypes.UserRequested }),
  setUser: (payload) => ({ type: actionTypes.SetUser, payload }),
  requestConfiguration: () => ({ type: actionTypes.ConfigurationRequested }),
  setConfiguration: (payload) => ({
    type: actionTypes.SetConfiguration,
    payload,
  }),
};
