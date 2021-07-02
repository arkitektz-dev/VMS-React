import React from "react";
import { Route } from "react-router-dom";
// import UsersLoadingDialog from "./users-loading-dialog/UsersLoadingDialog";
import UserDeleteDialog from "./user-delete-dialog/UserDeleteDialog";
import UsersCard from "./UsersCard";
import UsersUIProvider from "./UsersUIContext";

function UsersPage({ history }) {
  const usersUIEvents = {
    newUserButtonClick: () => {
      history.push("/users/new");
    },
    openEditUserPage: (id) => {
      history.push(`/users/${id}/edit`);
    },
    openDeleteUserDialog: (id) => {
      history.push(`/users/${id}/delete`);
    },
  };

  return (
    <UsersUIProvider usersUIEvents={usersUIEvents}>
      {/* <UsersLoadingDialog /> */}
      <Route path="/users/:id/delete">
        {({ history, match }) => (
          <UserDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/users");
            }}
          />
        )}
      </Route>
      <UsersCard />
    </UsersUIProvider>
  );
}

export default UsersPage;
