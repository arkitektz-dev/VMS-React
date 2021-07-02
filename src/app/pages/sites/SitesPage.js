import React from "react";
import { Route } from "react-router-dom";
import SitesLoadingDialog from "./sites-loading-dialog/SitesLoadingDialog";
import SiteDeleteDialog from "./site-delete-dialog/SiteDeleteDialog";
import SitesCard from "./SitesCard";
import SitesUIProvider from "./SitesUIContext";

function SitesPage({ history }) {
  const sitesUIEvents = {
    newSiteButtonClick: () => {
      history.push("/sites/new");
    },
    openEditSitePage: (id) => {
      history.push(`/sites/${id}/edit`);
    },
    openDeleteSiteDialog: (id) => {
      history.push(`/sites/${id}/delete`);
    },
  };

  return (
    <SitesUIProvider sitesUIEvents={sitesUIEvents}>
      <SitesLoadingDialog />

      <Route path="/sites/:id/delete">
        {({ history, match }) => (
          <SiteDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/sites");
            }}
          />
        )}
      </Route>

      <SitesCard />
    </SitesUIProvider>
  );
}

export default SitesPage;
