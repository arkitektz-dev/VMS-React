import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_ui/layout/elements";
import TenantsFilter from "./tenants-filter/TenantsFilter";
import TenantsTable from "./tenants-table/TenantsTable";
import { useTenantsUIContext } from "./TenantsUIContext";

function TenantsCard() {
  const tenantsUIContext = useTenantsUIContext();
  const tenantsUIProps = useMemo(() => {
    return {
      queryParams: tenantsUIContext.queryParams,
      setQueryParams: tenantsUIContext.setQueryParams,
      newTenantButtonClick: tenantsUIContext.newTenantButtonClick,
      openDeleteTenantDialog: tenantsUIContext.openDeleteTenantDialog,
      openEditTenantPage: tenantsUIContext.openEditTenantPage,
    };
  }, [tenantsUIContext]);

  return (
    <Card>
      <CardHeader title="Tenants list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={tenantsUIProps.newTenantButtonClick}
          >
            New Tenant
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <TenantsFilter />

        <TenantsTable />
      </CardBody>
    </Card>
  );
}

export default TenantsCard;
