import Repository from "../Repository";
import AppConsts from "./../../config/appconst";

const baseEndpoint = `${AppConsts.apiUrl}/Site`;

class SiteRepository {
  create(createSiteInput) {
    return Repository.post(`${baseEndpoint}/Create`, createSiteInput);
  }

  update(updateSiteInput) {
    return Repository.put(`${baseEndpoint}/Update`, updateSiteInput);
  }

  delete(entityDto) {
    return Repository.delete(`${baseEndpoint}/Delete`, {
      params: entityDto,
    });
  }

  get(entityDto) {
    return Repository.get(`${baseEndpoint}/Get`, {
      params: entityDto,
    });
  }

  getAll(queryParams) {
    return Repository.get(`${baseEndpoint}/GetAll`, {
      params: queryParams,
    });
  }
}

export default new SiteRepository();
