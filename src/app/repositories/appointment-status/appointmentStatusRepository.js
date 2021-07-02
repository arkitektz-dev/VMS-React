import Repository from "../Repository";
import AppConsts from "../../config/appconst";

const baseEndpoint = `${AppConsts.apiUrl}/AppointmentStatus`;

class AppointmentStatusRepository {
  create(createAppointmentStatusInput) {
    return Repository.post(
      `${baseEndpoint}/Create`,
      createAppointmentStatusInput
    );
  }

  update(updateAppointmentStatusInput) {
    return Repository.put(
      `${baseEndpoint}/Update`,
      updateAppointmentStatusInput
    );
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

export default new AppointmentStatusRepository();
