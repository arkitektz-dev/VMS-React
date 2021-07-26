import React from "react";
import { Route } from "react-router-dom";
import AppointmentStatusesLoadingDialog from "./appointment-statuses-loading-dialog/AppointmentStatusesLoadingDialog";
import AppointmentStatusDeleteDialog from "./appointment-status-delete-dialog/AppointmentStatusDeleteDialog";
import AppointmentStatusesCard from "./AppointmentStatusesCard";
import AppointmentStatusesUIProvider from "./AppointmentStatusesUIContext";

function AppointmentStatusesPage({ history }) {
  const appointmentStatusesUIEvents = {
    newAppointmentStatusButtonClick: () => {
      history.push("/settings/appointment-statuses/new");
    },
    openEditAppointmentStatusPage: (id) => {
      history.push(`/settings/appointment-statuses/${id}/edit`);
    },
    openDeleteAppointmentStatusDialog: (id) => {
      history.push(`/settings/appointment-statuses/${id}/delete`);
    },
  };

  return (
    <AppointmentStatusesUIProvider
      appointmentStatusesUIEvents={appointmentStatusesUIEvents}
    >
      <AppointmentStatusesLoadingDialog />

      <Route path="/settings/appointment-statuses/:id/delete">
        {({ history, match }) => (
          <AppointmentStatusDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/settings/appointment-statuses");
            }}
          />
        )}
      </Route>

      <AppointmentStatusesCard />
    </AppointmentStatusesUIProvider>
  );
}

export default AppointmentStatusesPage;
