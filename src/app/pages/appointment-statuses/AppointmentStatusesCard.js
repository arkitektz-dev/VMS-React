import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_ui/layout/elements";
import AppointmentStatusesFilter from "./appointment-statuses-filter/AppointmentStatusesFilter";
import AppointmentStatusesTable from "./appointment-statuses-table/AppointmentStatusesTable";
import { useAppointmentStatusesUIContext } from "./AppointmentStatusesUIContext";

function AppointmentStatusesCard() {
  const appointmentStatusesUIContext = useAppointmentStatusesUIContext();
  const appointmentStatusesUIProps = useMemo(() => {
    return {
      queryParams: appointmentStatusesUIContext.queryParams,
      setQueryParams: appointmentStatusesUIContext.setQueryParams,
      newAppointmentStatusButtonClick:
        appointmentStatusesUIContext.newAppointmentStatusButtonClick,
      openDeleteAppointmentStatusDialog:
        appointmentStatusesUIContext.openDeleteAppointmentStatusDialog,
      openEditAppointmentStatusPage:
        appointmentStatusesUIContext.openEditAppointmentStatusPage,
    };
  }, [appointmentStatusesUIContext]);

  return (
    <Card>
      <CardHeader title="Appointment Statuses list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={appointmentStatusesUIProps.newAppointmentStatusButtonClick}
          >
            New Appointment Status
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AppointmentStatusesFilter />

        <AppointmentStatusesTable />
      </CardBody>
    </Card>
  );
}

export default AppointmentStatusesCard;
