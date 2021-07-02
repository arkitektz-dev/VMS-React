import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_ui/layout/elements";
import SitesFilter from "./sites-filter/SitesFilter";
import SitesTable from "./sites-table/SitesTable";
import { useSitesUIContext } from "./SitesUIContext";

function SitesCard() {
  const sitesUIContext = useSitesUIContext();
  const sitesUIProps = useMemo(() => {
    return {
      queryParams: sitesUIContext.queryParams,
      setQueryParams: sitesUIContext.setQueryParams,
      newSiteButtonClick: sitesUIContext.newSiteButtonClick,
      openDeleteSiteDialog: sitesUIContext.openDeleteSiteDialog,
      openEditSitePage: sitesUIContext.openEditSitePage,
    };
  }, [sitesUIContext]);

  return (
    <Card>
      <CardHeader title="Sites list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={sitesUIProps.newSiteButtonClick}
          >
            New Site
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SitesFilter />

        <SitesTable />
      </CardBody>
    </Card>
  );
}

export default SitesCard;
