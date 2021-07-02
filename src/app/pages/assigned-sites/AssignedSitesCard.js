import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_ui/layout/elements";
import AssignedSitesFilter from "./assigned-sites-filter/AssignedSitesFilter";
import AssignedSitesTable from "./assigned-sites-table/AssignedSitesTable";
import { useAssignedSitesUIContext } from "./AssignedSitesUIContext";

function AssignedSitesCard() {
  const assignedSitesUIContext = useAssignedSitesUIContext();
  const assignedSitesUIProps = useMemo(() => {
    return {
      queryParams: assignedSitesUIContext.queryParams,
      setQueryParams: assignedSitesUIContext.setQueryParams,
      newAssignedSiteButtonClick:
        assignedSitesUIContext.newAssignedSiteButtonClick,
      openDeleteAssignedSiteDialog:
        assignedSitesUIContext.openDeleteAssignedSiteDialog,
      openEditAssignedSitePage: assignedSitesUIContext.openEditAssignedSitePage,
    };
  }, [assignedSitesUIContext]);

  return (
    <Card>
      <CardHeader title="Assigned Sites list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={assignedSitesUIProps.newAssignedSiteButtonClick}
          >
            New Assigned Site
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AssignedSitesFilter />

        <AssignedSitesTable />
      </CardBody>
    </Card>
  );
}

export default AssignedSitesCard;
