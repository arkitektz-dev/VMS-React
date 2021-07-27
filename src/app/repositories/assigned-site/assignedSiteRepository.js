import Repository from "../Repository";
import AppConsts from "./../../config/appconst";

const baseEndpoint = `${AppConsts.apiUrl}/AssignedSites`;

class AssignedSiteRepository {
  create(createAssignedSiteInput) {
    return Repository.post(`${baseEndpoint}/Create`, createAssignedSiteInput);
  }

  update(updateAssignedSiteInput) {
    return Repository.put(`${baseEndpoint}/Update`, updateAssignedSiteInput);
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

  assignSites(createAssignedSiteInput) {
    return Repository.post(
      `${baseEndpoint}/InsertNewSites?userId=${createAssignedSiteInput.userId}`,
      createAssignedSiteInput.sites
    );
  }
}

export default new AssignedSiteRepository();
