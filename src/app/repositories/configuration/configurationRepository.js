import Repository from "../Repository";

class ConfigurationRepository {
  async getAll() {
    const result = await Repository.get(`AbpUserConfiguration/GetAll`);

    return result.data.result;
  }
}

export default new ConfigurationRepository();
