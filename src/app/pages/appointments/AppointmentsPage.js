import React from "react";
import { Route } from "react-router-dom";
import AppointmentsLoadingDialog from "./appointments-loading-dialog/AppointmentsLoadingDialog";
import AppointmentDeleteDialog from "./appointment-delete-dialog/AppointmentDeleteDialog";
import AppointmentsCard from "./AppointmentsCard";
import AppointmentsUIProvider from "./AppointmentsUIContext";

function AppointmentsPage({ history }) {
  const appointmentsUIEvents = {
    newAppointmentButtonClick: () => {
      history.push("/appointments/new");
    },
    openEditAppointmentPage: (id) => {
      history.push(`/appointments/${id}/edit`);
    },
    openDeleteAppointmentDialog: (id) => {
      history.push(`/appointments/${id}/delete`);
    },
  };

  return (
    <AppointmentsUIProvider appointmentsUIEvents={appointmentsUIEvents}>
      <AppointmentsLoadingDialog />

      <Route path="/appointments/:id/delete">
        {({ history, match }) => (
          <AppointmentDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/appointments");
            }}
          />
        )}
      </Route>

      <AppointmentsCard />
    </AppointmentsUIProvider>
  );
}

export default AppointmentsPage;
