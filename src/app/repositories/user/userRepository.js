import Repository from "../Repository";
import AppConsts from "./../../config/appconst";

const baseEndpoint = `${AppConsts.apiUrl}/User`;

class UserRepository {
  create(createUserInput) {
    return Repository.post(`${baseEndpoint}/Create`, createUserInput);
  }

  update(updateUserInput) {
    return Repository.put(`${baseEndpoint}/Update`, updateUserInput);
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

export default new UserRepository();
