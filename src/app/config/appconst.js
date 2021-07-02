const AppConsts = {
  userManagement: {
    defaultAdminUserName: "admin",
  },
  localization: {
    defaultLocalizationSourceName: "test",
  },
  authorization: {
    encrptedAuthTokenName: "enc_auth_token",
  },
  appBaseUrl: process.env.REACT_APP_APP_BASE_URL,
  remoteServiceBaseUrl: process.env.REACT_APP_REMOTE_SERVICE_BASE_URL,
  apiUrl: process.env.REACT_APP_API_URL,
};
export default AppConsts;
