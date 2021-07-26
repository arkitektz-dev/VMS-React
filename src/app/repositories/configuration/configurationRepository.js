import Repository from "../Repository";
import AppConsts from "./../../config/appconst";

const baseEndpoint = `${AppConsts.appBaseUrl}AbpUserConfiguration`;

class ConfigurationRepository {
  getAll() {
    return Repository.get(`${baseEndpoint}/GetAll`);
  }
}

export default new ConfigurationRepository();
