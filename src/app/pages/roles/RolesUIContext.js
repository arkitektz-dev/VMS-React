import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./RolesUIHelpers";

const RolesUIContext = createContext();

export function useRolesUIContext() {
  return useContext(RolesUIContext);
}

export const RolesUIConsumer = RolesUIContext.Consumer;

function RolesUIProvider({ rolesUIEvents, children }) {
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
    newRoleButtonClick: rolesUIEvents.newRoleButtonClick,
    openEditRolePage: rolesUIEvents.openEditRolePage,
    openDeleteRoleDialog: rolesUIEvents.openDeleteRoleDialog,
  };

  return (
    <RolesUIContext.Provider value={value}>
      {children}
    </RolesUIContext.Provider>
  );
}

export default RolesUIProvider;
