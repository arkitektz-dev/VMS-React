import React from "react";
import { Route } from "react-router-dom";
import InvitationsLoadingDialog from "./invitations-loading-dialog/InvitationsLoadingDialog";
import InvitationDeleteDialog from "./invitation-delete-dialog/InvitationDeleteDialog";
import InvitationsCard from "./InvitationsCard";
import InvitationsUIProvider from "./InvitationsUIContext";

function InvitationsPage({ history }) {
  const invitationsUIEvents = {
    newInvitationButtonClick: () => {
      history.push("/invitations/new");
    },
    openEditInvitationPage: (id) => {
      history.push(`/invitations/${id}/edit`);
    },
    openDeleteInvitationDialog: (id) => {
      history.push(`/invitations/${id}/delete`);
    },
  };

  return (
    <InvitationsUIProvider invitationsUIEvents={invitationsUIEvents}>
      <InvitationsLoadingDialog />

      <Route path="/invitations/:id/delete">
        {({ history, match }) => (
          <InvitationDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/invitations");
            }}
          />
        )}
      </Route>

      <InvitationsCard />
    </InvitationsUIProvider>
  );
}

export default InvitationsPage;
