import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_ui/layout/elements";
import VisitorsFilter from "./visitors-filter/VisitorsFilter";
import VisitorsTable from "./visitors-table/VisitorsTable";
import { useVisitorsUIContext } from "./VisitorsUIContext";

function VisitorsCard() {
  const visitorsUIContext = useVisitorsUIContext();
  const visitorsUIProps = useMemo(() => {
    return {
      queryParams: visitorsUIContext.queryParams,
      setQueryParams: visitorsUIContext.setQueryParams,
      newVisitorButtonClick: visitorsUIContext.newVisitorButtonClick,
      openDeleteVisitorDialog: visitorsUIContext.openDeleteVisitorDialog,
      openEditVisitorPage: visitorsUIContext.openEditVisitorPage,
    };
  }, [visitorsUIContext]);

  return (
    <Card>
      <CardHeader title="Visitors list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={visitorsUIProps.newVisitorButtonClick}
          >
            New Visitor
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <VisitorsFilter />

        <VisitorsTable />
      </CardBody>
    </Card>
  );
}

export default VisitorsCard;
