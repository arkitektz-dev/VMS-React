import tenantRepository from "../../repositories/tenant/tenantRepository";
import { tenantsSlice, callTypes } from "./tenantsSlice";

const { actions } = tenantsSlice;

export const fetchTenants = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return tenantRepository
    .getAll(queryParams)
    .then((response) => {
      console.log(response);
      const { totalCount, items: entities } = response.data.result;
      dispatch(actions.tenantsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find tenants";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchTenant = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.tenantFetched({ tenantForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return tenantRepository
    .get({ id })
    .then((response) => {
      console.log(response);
      const tenant = response.data.result;
      dispatch(actions.tenantFetched({ tenantForEdit: tenant }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find tenant";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteTenant = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return tenantRepository
    .delete({ id })
    .then((response) => {
      console.log(response);
      dispatch(actions.tenantDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete tenant";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createTenant = (tenantForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return tenantRepository
    .create(tenantForCreation)
    .then((response) => {
      const { tenant } = response.data.result;
      dispatch(actions.tenantCreated({ tenant }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create tenant";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateTenant = (tenant) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return tenantRepository
    .update(tenant)
    .then(() => {
      dispatch(actions.tenantUpdated({ tenant }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update tenant";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
