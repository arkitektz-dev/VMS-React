import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./AppointmentsUIHelpers";

const AppointmentsUIContext = createContext();

export function useAppointmentsUIContext() {
  return useContext(AppointmentsUIContext);
}

export const AppointmentsUIConsumer = AppointmentsUIContext.Consumer;

function AppointmentsUIProvider({ appointmentsUIEvents, children }) {
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
    newAppointmentButtonClick: appointmentsUIEvents.newAppointmentButtonClick,
    openEditAppointmentPage: appointmentsUIEvents.openEditAppointmentPage,
    openDeleteAppointmentDialog:
      appointmentsUIEvents.openDeleteAppointmentDialog,
  };

  return (
    <AppointmentsUIContext.Provider value={value}>
      {children}
    </AppointmentsUIContext.Provider>
  );
}

export default AppointmentsUIProvider;
