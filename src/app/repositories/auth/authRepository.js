import Repository from "../Repository";

const abp = window.abp;

class AuthRepository {
  constructor(callback) {
    this.callback = callback;
  }

  async authenticate(payload) {
    let result = await Repository.post(`api/TokenAuth/Authenticate`, payload);
    return result.data.result;
  }

  async getCurrentLoginInformations() {
    let result = await Repository.get(
      `api/services/app/Session/GetCurrentLoginInformations`,
      {
        headers: {
          "Abp.TenantId": abp.multiTenancy.getTenantIdCookie(),
        },
      }
    );

    return result.data.result;
  }
}

export default new AuthRepository();
