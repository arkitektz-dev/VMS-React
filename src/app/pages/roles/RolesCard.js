import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_ui/layout/elements";
import RolesFilter from "./roles-filter/RolesFilter";
import RolesTable from "./roles-table/RolesTable";
import { useRolesUIContext } from "./RolesUIContext";

function RolesCard() {
  const rolesUIContext = useRolesUIContext();
  const rolesUIProps = useMemo(() => {
    return {
      queryParams: rolesUIContext.queryParams,
      setQueryParams: rolesUIContext.setQueryParams,
      newRoleButtonClick: rolesUIContext.newRoleButtonClick,
      openDeleteRoleDialog: rolesUIContext.openDeleteRoleDialog,
      openEditRolePage: rolesUIContext.openEditRolePage,
    };
  }, [rolesUIContext]);

  return (
    <Card>
      <CardHeader title="Roles list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={rolesUIProps.newRoleButtonClick}
          >
            New Role
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RolesFilter />

        <RolesTable />
      </CardBody>
    </Card>
  );
}

export default RolesCard;
