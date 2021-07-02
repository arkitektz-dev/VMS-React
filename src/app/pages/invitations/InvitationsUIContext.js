import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./InvitationsUIHelpers";

const InvitationsUIContext = createContext();

export function useInvitationsUIContext() {
  return useContext(InvitationsUIContext);
}

export const InvitationsUIConsumer = InvitationsUIContext.Consumer;

function InvitationsUIProvider({ invitationsUIEvents, children }) {
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
    newInvitationButtonClick: invitationsUIEvents.newInvitationButtonClick,
    openEditInvitationPage: invitationsUIEvents.openEditInvitationPage,
    openDeleteInvitationDialog: invitationsUIEvents.openDeleteInvitationDialog,
  };

  return (
    <InvitationsUIContext.Provider value={value}>
      {children}
    </InvitationsUIContext.Provider>
  );
}

export default InvitationsUIProvider;
