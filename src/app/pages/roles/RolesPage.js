import React from "react";
import { Route } from "react-router-dom";
// import RolesLoadingDialog from "./roles-loading-dialog/RolesLoadingDialog";
import RoleDeleteDialog from "./role-delete-dialog/RoleDeleteDialog";
import RolesCard from "./RolesCard";
import RolesUIProvider from "./RolesUIContext";

function RolesPage({ history }) {
  const rolesUIEvents = {
    newRoleButtonClick: () => {
      history.push("/settings/roles/new");
    },
    openEditRolePage: (id) => {
      history.push(`/settings/roles/${id}/edit`);
    },
    openDeleteRoleDialog: (id) => {
      history.push(`/settings/roles/${id}/delete`);
    },
  };

  return (
    <RolesUIProvider rolesUIEvents={rolesUIEvents}>
      {/* <RolesLoadingDialog /> */}
      <Route path="/settings/roles/:id/delete">
        {({ history, match }) => (
          <RoleDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/settings/roles");
            }}
          />
        )}
      </Route>
      <RolesCard />
    </RolesUIProvider>
  );
}

export default RolesPage;
