import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_ui/layout/elements";
import UsersFilter from "./users-filter/UsersFilter";
import UsersTable from "./users-table/UsersTable";
import { useUsersUIContext } from "./UsersUIContext";

function UsersCard() {
  const usersUIContext = useUsersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      queryParams: usersUIContext.queryParams,
      setQueryParams: usersUIContext.setQueryParams,
      newUserButtonClick: usersUIContext.newUserButtonClick,
      openDeleteUserDialog: usersUIContext.openDeleteUserDialog,
      openEditUserPage: usersUIContext.openEditUserPage,
    };
  }, [usersUIContext]);

  return (
    <Card>
      <CardHeader title="Users list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={usersUIProps.newUserButtonClick}
          >
            New User
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <UsersFilter />

        <UsersTable />
      </CardBody>
    </Card>
  );
}

export default UsersCard;
