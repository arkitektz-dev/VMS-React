import Repository from "../Repository";
import AppConsts from "./../../config/appconst";

const baseEndpoint = `${AppConsts.apiUrl}/Tenant`;

class TenantRepository {
  create(createTenantInput) {
    return Repository.post(`${baseEndpoint}/Create`, createTenantInput);
  }

  update(updateTenantInput) {
    return Repository.put(`${baseEndpoint}/Update`, updateTenantInput);
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

  async getAll1(pagedFilterAndSortedRequest) {
    const result = await Repository.get(`api/services/app/Tenant/GetAll`, {
      params: pagedFilterAndSortedRequest,
    });

    return result.data.result;
  }
}

export default new TenantRepository();
