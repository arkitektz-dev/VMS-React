import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_ui/layout/elements";
import AppointmentsFilter from "./appointments-filter/AppointmentsFilter";
import AppointmentsTable from "./appointments-table/AppointmentsTable";
import { useAppointmentsUIContext } from "./AppointmentsUIContext";

function AppointmentsCard() {
  const appointmentsUIContext = useAppointmentsUIContext();
  const appointmentsUIProps = useMemo(() => {
    return {
      queryParams: appointmentsUIContext.queryParams,
      setQueryParams: appointmentsUIContext.setQueryParams,
      newAppointmentButtonClick:
        appointmentsUIContext.newAppointmentButtonClick,
      openDeleteAppointmentDialog:
        appointmentsUIContext.openDeleteAppointmentDialog,
      openEditAppointmentPage: appointmentsUIContext.openEditAppointmentPage,
    };
  }, [appointmentsUIContext]);

  return (
    <Card>
      <CardHeader title="Appointments list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={appointmentsUIProps.newAppointmentButtonClick}
          >
            New Appointment
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AppointmentsFilter />

        <AppointmentsTable />
      </CardBody>
    </Card>
  );
}

export default AppointmentsCard;
