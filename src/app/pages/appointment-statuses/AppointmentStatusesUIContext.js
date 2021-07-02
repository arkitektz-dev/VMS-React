import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./AppointmentStatusesUIHelpers";

const AppointmentStatusesUIContext = createContext();

export function useAppointmentStatusesUIContext() {
  return useContext(AppointmentStatusesUIContext);
}

export const AppointmentStatusesUIConsumer =
  AppointmentStatusesUIContext.Consumer;

function AppointmentStatusesUIProvider({
  appointmentStatusesUIEvents,
  children,
}) {
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
    newAppointmentStatusButtonClick:
      appointmentStatusesUIEvents.newAppointmentStatusButtonClick,
    openEditAppointmentStatusPage:
      appointmentStatusesUIEvents.openEditAppointmentStatusPage,
    openDeleteAppointmentStatusDialog:
      appointmentStatusesUIEvents.openDeleteAppointmentStatusDialog,
  };

  return (
    <AppointmentStatusesUIContext.Provider value={value}>
      {children}
    </AppointmentStatusesUIContext.Provider>
  );
}

export default AppointmentStatusesUIProvider;
