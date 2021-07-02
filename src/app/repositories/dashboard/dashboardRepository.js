import Repository from "../Repository";
import AppConsts from "./../../config/appconst";

const baseEndpoint = `${AppConsts.apiUrl}/Dashboard`;

class DashboardRepository {
  getAdmin() {
    return Repository.get(`${baseEndpoint}/GetAdminStatistics`);
  }

  getTenant() {
    return Repository.get(`${baseEndpoint}/GetTenantStatistics`);
  }
}

export default new DashboardRepository();
