import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./SitesUIHelpers";

const SitesUIContext = createContext();

export function useSitesUIContext() {
  return useContext(SitesUIContext);
}

export const SitesUIConsumer = SitesUIContext.Consumer;

function SitesUIProvider({ sitesUIEvents, children }) {
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
    newSiteButtonClick: sitesUIEvents.newSiteButtonClick,
    openEditSitePage: sitesUIEvents.openEditSitePage,
    openDeleteSiteDialog: sitesUIEvents.openDeleteSiteDialog,
  };

  return (
    <SitesUIContext.Provider value={value}>
      {children}
    </SitesUIContext.Provider>
  );
}

export default SitesUIProvider;
