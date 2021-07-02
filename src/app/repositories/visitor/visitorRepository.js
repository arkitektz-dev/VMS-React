import Repository from "../Repository";
import AppConsts from "./../../config/appconst";

const baseEndpoint = `${AppConsts.apiUrl}/Visitor`;

class VisitorRepository {
  create(createVisitorInput) {
    return Repository.post(`${baseEndpoint}/Create`, createVisitorInput);
  }

  update(updateVisitorInput) {
    return Repository.put(`${baseEndpoint}/Update`, updateVisitorInput);
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

export default new VisitorRepository();
