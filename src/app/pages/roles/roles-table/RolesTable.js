import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/roles/rolesActions";
import * as uiHelpers from "../RolesUIHelpers";
import {
  getHandlerTableChange,
  PleaseWaitMessage,
  NoRecordsFoundMessage,
  sortCaret,
} from "./../../../../_ui/layout/utilities";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "./../../../../_ui/layout/elements/pagination/Pagination";
import { useRolesUIContext } from "../RolesUIContext";

function RolesTable() {
  // Roles UI Context
  const rolesUIContext = useRolesUIContext();
  const rolesUIProps = useMemo(() => {
    return {
      queryParams: rolesUIContext.queryParams,
      setQueryParams: rolesUIContext.setQueryParams,
      openEditRolePage: rolesUIContext.openEditRolePage,
      openDeleteRoleDialog: rolesUIContext.openDeleteRoleDialog,
    };
  }, [rolesUIContext]);

  // Getting curret state of roles list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.roles }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Roles Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchRoles(rolesUIProps.queryParams));
  }, [rolesUIProps.queryParams, dispatch]);

  // Table columns
  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
      sortCaret,
    },
    {
      dataField: "displayName",
      text: "Display Name",
      sort: true,
      sortCaret,
    },
    {
      dataField: "description",
      text: "Description",
      sort: true,
      sortCaret,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditRolePage: rolesUIProps.openEditRolePage,
        openDeleteRoleDialog: rolesUIProps.openDeleteRoleDialog,
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
    sizePerPage: rolesUIProps.queryParams.pageSize,
    page: rolesUIProps.queryParams.pageNumber,
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
                  rolesUIProps.setQueryParams
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

export default RolesTable;
