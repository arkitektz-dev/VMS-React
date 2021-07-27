import Repository from "../Repository";
import AppConsts from "./../../config/appconst";

const baseEndpoint = `${AppConsts.apiUrl}/MyInvitation`;

class InvitationRepository {
  create(createInvitationInput) {
    return Repository.post(`${baseEndpoint}/Create`, createInvitationInput);
  }

  update(updateInvitationInput) {
    return Repository.put(`${baseEndpoint}/Update`, updateInvitationInput);
  }

  delete(entityDto) {
    return Repository.delete(`${baseEndpoint}/Delete`, {
      params: entityDto,
    });
  }

  get(entityDto) {
    return Repository.get(`${baseEndpoint}/GetMyInvitationForEdit`, {
      params: entityDto,
    });
  }

  getAll(queryParams) {
    return Repository.get(`${baseEndpoint}/GetAll`, {
      params: queryParams,
    });
  }
  
  getVisitorsByKeyword(queryParams) {
    return Repository.get(`${baseEndpoint}/GetVisitorsForSelect`, {
      params: queryParams,
    });
  }
}

export default new InvitationRepository();
