import React from "react";
import { Route } from "react-router-dom";
import TenantsLoadingDialog from "./tenants-loading-dialog/TenantsLoadingDialog";
import TenantDeleteDialog from "./tenant-delete-dialog/TenantDeleteDialog";
import TenantsCard from "./TenantsCard";
import TenantsUIProvider from "./TenantsUIContext";

function TenantsPage({ history }) {
  const tenantsUIEvents = {
    newTenantButtonClick: () => {
      history.push("/settings/tenants/new");
    },
    openEditTenantPage: (id) => {
      history.push(`/settings/tenants/${id}/edit`);
    },
    openDeleteTenantDialog: (id) => {
      history.push(`/settings/tenants/${id}/delete`);
    },
  };

  return (
    <TenantsUIProvider tenantsUIEvents={tenantsUIEvents}>
      <TenantsLoadingDialog />

      <Route path="/settings/tenants/:id/delete">
        {({ history, match }) => (
          <TenantDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/settings/tenants");
            }}
          />
        )}
      </Route>

      <TenantsCard />
    </TenantsUIProvider>
  );
}

export default TenantsPage;
