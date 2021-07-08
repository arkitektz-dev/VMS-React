import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./InstallationsUIHelpers";

const InstallationsUIContext = createContext();

export function useInstallationsUIContext() {
  return useContext(InstallationsUIContext);
}

export const InstallationsUIConsumer = InstallationsUIContext.Consumer;

function InstallationsUIProvider({ installationsUIEvents, children }) {
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
    openUpdateInstallationStatusDialog:
      installationsUIEvents.openUpdateInstallationStatusDialog,
  };

  return (
    <InstallationsUIContext.Provider value={value}>
      {children}
    </InstallationsUIContext.Provider>
  );
}

export default InstallationsUIProvider;
