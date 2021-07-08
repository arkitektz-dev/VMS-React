import React from "react";
import { Route } from "react-router-dom";
import InstallationsLoadingDialog from "./intallations-loading-dialog/InstallationsLoadingDialog";
import InstallationUpdateStatusDialog from "./installation-update-status-dialog/InstallationUpdateStatusDialog";
import InstallationsCard from "./InstallationsCard";
import InstallationsUIProvider from "./InstallationsUIContext";

function InstallationsPage({ history }) {
  const installationsUIEvents = {
    openUpdateInstallationStatusDialog: (id) => {
      history.push(`/probe-application/installations/${id}/updateStatus`);
    },
  };

  return (
    <InstallationsUIProvider installationsUIEvents={installationsUIEvents}>
      <InstallationsLoadingDialog />

      <Route path="/probe-application/installations/:id/updateStatus">
        {({ history, match }) => (
          <InstallationUpdateStatusDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/probe-application/installations");
            }}
          />
        )}
      </Route>

      <InstallationsCard />
    </InstallationsUIProvider>
  );
}

export default InstallationsPage;
