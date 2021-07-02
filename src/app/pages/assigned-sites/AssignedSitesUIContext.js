import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./AssignedSitesUIHelpers";

const AssignedSitesUIContext = createContext();

export function useAssignedSitesUIContext() {
  return useContext(AssignedSitesUIContext);
}

export const AssignedSitesUIConsumer = AssignedSitesUIContext.Consumer;

function AssignedSitesUIProvider({ assignedSitesUIEvents, children }) {
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
    newAssignedSiteButtonClick:
      assignedSitesUIEvents.newAssignedSiteButtonClick,
    openEditAssignedSitePage: assignedSitesUIEvents.openEditAssignedSitePage,
    openDeleteAssignedSiteDialog:
      assignedSitesUIEvents.openDeleteAssignedSiteDialog,
  };

  return (
    <AssignedSitesUIContext.Provider value={value}>
      {children}
    </AssignedSitesUIContext.Provider>
  );
}

export default AssignedSitesUIProvider;
