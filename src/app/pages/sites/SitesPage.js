import React from "react";
import { Route } from "react-router-dom";
import SitesLoadingDialog from "./sites-loading-dialog/SitesLoadingDialog";
import SiteDeleteDialog from "./site-delete-dialog/SiteDeleteDialog";
import SitesCard from "./SitesCard";
import SitesUIProvider from "./SitesUIContext";

function SitesPage({ history }) {
  const sitesUIEvents = {
    newSiteButtonClick: () => {
      history.push("/settings/sites/new");
    },
    openEditSitePage: (id) => {
      history.push(`/settings/sites/${id}/edit`);
    },
    openDeleteSiteDialog: (id) => {
      history.push(`/settings/sites/${id}/delete`);
    },
  };

  return (
    <SitesUIProvider sitesUIEvents={sitesUIEvents}>
      <SitesLoadingDialog />

      <Route path="/settings/sites/:id/delete">
        {({ history, match }) => (
          <SiteDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/settings/sites");
            }}
          />
        )}
      </Route>

      <SitesCard />
    </SitesUIProvider>
  );
}

export default SitesPage;
