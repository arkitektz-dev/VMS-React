import Repository from "../../Repository";
import AppConsts from "./../../../config/appconst";

const baseEndpoint = `${AppConsts.apiUrl}/Configuration`;

class actionRepository {
  getSetupStatus(appSecret) {
    appSecret = "abc";
    return Repository.post(`${baseEndpoint}/CheckSetupStatus`, appSecret);
  }

  getSetup(appSecret) {
    return Repository.get(`${baseEndpoint}/GetSetup`, {
      params: { appSecret: "abc" },
    });
  }

  requestSetup(appSecret) {
    return Repository.post(`${baseEndpoint}/CreateSetup`, {
      appSecret,
    });
  }
}

export default new actionRepository();
