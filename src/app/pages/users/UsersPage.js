import React from "react";
import { Route } from "react-router-dom";
// import UsersLoadingDialog from "./users-loading-dialog/UsersLoadingDialog";
import UserDeleteDialog from "./user-delete-dialog/UserDeleteDialog";
import UsersCard from "./UsersCard";
import UsersUIProvider from "./UsersUIContext";

function UsersPage({ history }) {
  const usersUIEvents = {
    newUserButtonClick: () => {
      history.push("/settings/users/new");
    },
    openEditUserPage: (id) => {
      history.push(`/settings/users/${id}/edit`);
    },
    openDeleteUserDialog: (id) => {
      history.push(`/settings/users/${id}/delete`);
    },
  };

  return (
    <UsersUIProvider usersUIEvents={usersUIEvents}>
      {/* <UsersLoadingDialog /> */}
      <Route path="/settings/users/:id/delete">
        {({ history, match }) => (
          <UserDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/settings/users");
            }}
          />
        )}
      </Route>
      <UsersCard />
    </UsersUIProvider>
  );
}

export default UsersPage;
