import React from "react";
import { Route } from "react-router-dom";
import VisitorsLoadingDialog from "./visitors-loading-dialog/VisitorsLoadingDialog";
import VisitorDeleteDialog from "./visitor-delete-dialog/VisitorDeleteDialog";
import VisitorsCard from "./VisitorsCard";
import VisitorsUIProvider from "./VisitorsUIContext";

function VisitorsPage({ history }) {
  const visitorsUIEvents = {
    newVisitorButtonClick: () => {
      history.push("/visitors/new");
    },
    openEditVisitorPage: (id) => {
      history.push(`/visitors/${id}/edit`);
    },
    openDeleteVisitorDialog: (id) => {
      history.push(`/visitors/${id}/delete`);
    },
  };

  return (
    <VisitorsUIProvider visitorsUIEvents={visitorsUIEvents}>
      <VisitorsLoadingDialog />

      <Route path="/visitors/:id/delete">
        {({ history, match }) => (
          <VisitorDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/visitors");
            }}
          />
        )}
      </Route>

      <VisitorsCard />
    </VisitorsUIProvider>
  );
}

export default VisitorsPage;
