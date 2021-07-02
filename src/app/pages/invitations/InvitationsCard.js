import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_ui/layout/elements";
import InvitationsFilter from "./invitations-filter/InvitationsFilter";
import InvitationsTable from "./invitations-table/InvitationsTable";
import { useInvitationsUIContext } from "./InvitationsUIContext";

function InvitationsCard() {
  const invitationsUIContext = useInvitationsUIContext();
  const invitationsUIProps = useMemo(() => {
    return {
      queryParams: invitationsUIContext.queryParams,
      setQueryParams: invitationsUIContext.setQueryParams,
      newInvitationButtonClick: invitationsUIContext.newInvitationButtonClick,
      openDeleteInvitationDialog:
        invitationsUIContext.openDeleteInvitationDialog,
      openEditInvitationPage: invitationsUIContext.openEditInvitationPage,
    };
  }, [invitationsUIContext]);

  return (
    <Card>
      <CardHeader title="Invitations list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={invitationsUIProps.newInvitationButtonClick}
          >
            New Invitation
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <InvitationsFilter />

        <InvitationsTable />
      </CardBody>
    </Card>
  );
}

export default InvitationsCard;
