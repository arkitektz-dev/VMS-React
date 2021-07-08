import Repository from "../../Repository";
import AppConsts from "./../../../config/appconst";

const baseEndpoint = `${AppConsts.apiUrl}/ProbeInstallation`;

class installationRepository {
  // UPDATE Status
  updateStatus(id, status) {
    return Repository.put(`${baseEndpoint}/updateProbeStatus`, {
      id,
      status,
      ipAddress: "123456",
    });
  }

  getAll(queryParams) {
    return Repository.get(`${baseEndpoint}/GetAll`, {
      params: queryParams,
    });
  }
}

export default new installationRepository();
