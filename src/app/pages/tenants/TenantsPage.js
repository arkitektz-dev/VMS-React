import React from "react";
import { Route } from "react-router-dom";
import TenantsLoadingDialog from "./tenants-loading-dialog/TenantsLoadingDialog";
import TenantDeleteDialog from "./tenant-delete-dialog/TenantDeleteDialog";
import TenantsCard from "./TenantsCard";
import TenantsUIProvider from "./TenantsUIContext";

function TenantsPage({ history }) {
  const tenantsUIEvents = {
    newTenantButtonClick: () => {
      history.push("/tenants/new");
    },
    openEditTenantPage: (id) => {
      history.push(`/tenants/${id}/edit`);
    },
    openDeleteTenantDialog: (id) => {
      history.push(`/tenants/${id}/delete`);
    },
  };

  return (
    <TenantsUIProvider tenantsUIEvents={tenantsUIEvents}>
      <TenantsLoadingDialog />

      <Route path="/tenants/:id/delete">
        {({ history, match }) => (
          <TenantDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/tenants");
            }}
          />
        )}
      </Route>

      <TenantsCard />
    </TenantsUIProvider>
  );
}

export default TenantsPage;
