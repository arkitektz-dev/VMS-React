import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/users/usersActions";
import * as uiHelpers from "../UsersUIHelpers";
import {
  getHandlerTableChange,
  PleaseWaitMessage,
  NoRecordsFoundMessage,
  sortCaret,
} from "./../../../../_ui/layout/utilities";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "./../../../../_ui/layout/elements";
import { useUsersUIContext } from "../UsersUIContext";

function UsersTable() {
  // Users UI Context
  const usersUIContext = useUsersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      queryParams: usersUIContext.queryParams,
      setQueryParams: usersUIContext.setQueryParams,
      openEditUserPage: usersUIContext.openEditUserPage,
      openDeleteUserDialog: usersUIContext.openDeleteUserDialog,
    };
  }, [usersUIContext]);

  // Getting curret state of users list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.users }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Users Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchUsers(usersUIProps.queryParams));
  }, [usersUIProps.queryParams, dispatch]);

  // Table columns
  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
      sortCaret,
    },
    {
      dataField: "userName",
      text: "User Name",
      sort: true,
      sortCaret,
    },
    {
      dataField: "surname",
      text: "Surname",
      sort: true,
      sortCaret,
    },
    {
      dataField: "fullName",
      text: "Full Name",
      sort: true,
      sortCaret,
    },
    {
      dataField: "emailAddress",
      text: "Email Address",
      sort: true,
      sortCaret,
    },
    {
      dataField: "roleNames",
      text: "Roles",
      formatter: columnFormatters.RoleColumnFormatter,
    },
    {
      dataField: "isActive",
      text: "Status",
      sort: true,
      sortCaret,
      formatter: columnFormatters.StatusColumnFormatter,
    },
    {
      dataField: "creationTime",
      text: "Creation Time",
      sort: true,
      // sortCaret: sortCaret,
      formatter: (cell, row, rowIndex) => {
        return new Date(cell).toLocaleString();
      },
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditUserPage: usersUIProps.openEditUserPage,
        openDeleteUserDialog: usersUIProps.openDeleteUserDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: usersUIProps.queryParams.pageSize,
    page: usersUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                bordered={false}
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  usersUIProps.setQueryParams
                )}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}

export default UsersTable;
