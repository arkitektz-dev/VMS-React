import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./TenantsUIHelpers";

const TenantsUIContext = createContext();

export function useTenantsUIContext() {
  return useContext(TenantsUIContext);
}

export const TenantsUIConsumer = TenantsUIContext.Consumer;

function TenantsUIProvider({ tenantsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
        nextQueryParams.maxResultCount = nextQueryParams.pageSize;
        nextQueryParams.skipCount =
          (nextQueryParams.pageNumber - 1) * nextQueryParams.pageSize;
      }
      if (isEqual(prevQueryParams, nextQueryParams)) {
        prevQueryParams.maxResultCount = prevQueryParams.pageSize;
        prevQueryParams.skipCount =
          (prevQueryParams.pageNumber - 1) * prevQueryParams.pageSize;

        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const value = {
    queryParams,
    setQueryParamsBase,
    setQueryParams,
    newTenantButtonClick: tenantsUIEvents.newTenantButtonClick,
    openEditTenantPage: tenantsUIEvents.openEditTenantPage,
    openDeleteTenantDialog: tenantsUIEvents.openDeleteTenantDialog,
  };

  return (
    <TenantsUIContext.Provider value={value}>
      {children}
    </TenantsUIContext.Provider>
  );
}

export default TenantsUIProvider;
