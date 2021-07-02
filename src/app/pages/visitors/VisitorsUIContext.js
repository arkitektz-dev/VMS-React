import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./VisitorsUIHelpers";

const VisitorsUIContext = createContext();

export function useVisitorsUIContext() {
  return useContext(VisitorsUIContext);
}

export const VisitorsUIConsumer = VisitorsUIContext.Consumer;

function VisitorsUIProvider({ visitorsUIEvents, children }) {
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
    newVisitorButtonClick: visitorsUIEvents.newVisitorButtonClick,
    openEditVisitorPage: visitorsUIEvents.openEditVisitorPage,
    openDeleteVisitorDialog: visitorsUIEvents.openDeleteVisitorDialog,
  };

  return (
    <VisitorsUIContext.Provider value={value}>
      {children}
    </VisitorsUIContext.Provider>
  );
}

export default VisitorsUIProvider;
