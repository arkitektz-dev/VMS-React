import React from "react";
import { Route } from "react-router-dom";
import AssignedSitesLoadingDialog from "./assigned-sites-loading-dialog/AssignedSitesLoadingDialog";
import AssignedSiteDeleteDialog from "./assigned-site-delete-dialog/AssignedSiteDeleteDialog";
import AssignedSitesCard from "./AssignedSitesCard";
import AssignedSitesUIProvider from "./AssignedSitesUIContext";

function AssignedSitesPage({ history }) {
  const assignedSitesUIEvents = {
    newAssignedSiteButtonClick: () => {
      history.push("/settings/assigned-sites/new");
    },
    openEditAssignedSitePage: (id) => {
      history.push(`/settings/assigned-sites/${id}/edit`);
    },
    openDeleteAssignedSiteDialog: (id) => {
      history.push(`/settings/assigned-sites/${id}/delete`);
    },
  };

  return (
    <AssignedSitesUIProvider assignedSitesUIEvents={assignedSitesUIEvents}>
      <AssignedSitesLoadingDialog />

      <Route path="/settings/assigned-sites/:id/delete">
        {({ history, match }) => (
          <AssignedSiteDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/settings/assigned-sites");
            }}
          />
        )}
      </Route>

      <AssignedSitesCard />
    </AssignedSitesUIProvider>
  );
}

export default AssignedSitesPage;
