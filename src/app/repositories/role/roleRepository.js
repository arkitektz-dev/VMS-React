import Repository from "../Repository";
import AppConsts from "./../../config/appconst";

const baseEndpoint = `${AppConsts.apiUrl}/Role`;

class RoleRepository {
  create(createRoleInput) {
    return Repository.post(`${baseEndpoint}/Create`, createRoleInput);
  }

  update(updateRoleInput) {
    return Repository.put(`${baseEndpoint}/Update`, updateRoleInput);
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

export default new RoleRepository();
