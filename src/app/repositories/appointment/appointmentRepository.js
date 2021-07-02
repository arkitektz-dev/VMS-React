import Repository from "../Repository";
import AppConsts from "./../../config/appconst";

const baseEndpoint = `${AppConsts.apiUrl}/Appointment`;

class AppointmentRepository {
  create(createAppointmentInput) {
    return Repository.post(`${baseEndpoint}/Create`, createAppointmentInput);
  }

  update(updateAppointmentInput) {
    return Repository.put(`${baseEndpoint}/Update`, updateAppointmentInput);
  }

  delete(entityDto) {
    return Repository.delete(`${baseEndpoint}/Delete`, {
      params: entityDto,
    });
  }

  get(entityDto) {
    return Repository.get(`${baseEndpoint}/GetAppointmentForEdit`, {
      params: entityDto,
    });
  }

  getAll(queryParams) {
    return Repository.get(`${baseEndpoint}/GetAll`, {
      params: queryParams,
    });
  }
}

export default new AppointmentRepository();
