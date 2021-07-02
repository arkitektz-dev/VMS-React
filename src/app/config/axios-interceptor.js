import Repository from "../repositories/Repository";
import { useSelector } from "react-redux";

const abp = window.abp;

export default function setupAxiosInterceptors() {
  const onRequestSuccess = (config) => {
    if (!!abp.auth.getToken()) {
      config.headers.common["Authorization"] = "Bearer " + abp.auth.getToken();
    }

    config.headers.common["Abp.TenantId"] =
      abp.multiTenancy.getTenantIdCookie();

    return config;
  };
  const onRequestError = (error) => Promise.reject(error);

  const onResponseSuccess = (response) => response;
  const onResponseError = (error) => {
    if (
      !!error.response &&
      !!error.response.data.error &&
      !!error.response.data.error.message &&
      error.response.data.error.details
    ) {
      alert(
        "title " +
          error.response.data.error.message +
          "content " +
          error.response.data.error.details
      );
    } else if (
      !!error.response &&
      !!error.response.data.error &&
      !!error.response.data.error.message
    ) {
      alert(
        "title " +
          "LoginFailed" +
          "content " +
          error.response.data.error.message
      );
    } else if (!error.response) {
      alert("content " + "UnknownError");
    }

    return Promise.reject(error);
  };

  Repository.interceptors.request.use(onRequestSuccess, onRequestError);
  Repository.interceptors.response.use(onResponseSuccess, onResponseError);
}
