import AppConsts from "./../config/appconst";
import axios from "axios";

export default axios.create({
  baseURL: AppConsts.appBaseUrl,
  timeout: 30000,
});
