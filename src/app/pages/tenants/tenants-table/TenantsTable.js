import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/tenants/tenantsActions";
import * as uiHelpers from "../TenantsUIHelpers";
import {
  getHandlerTableChange,
  PleaseWaitMessage,
  NoRecordsFoundMessage,
  sortCaret,
} from "./../../../../_ui/layout/utilities";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "./../../../../_ui/layout/elements/pagination/Pagination";
import { useTenantsUIContext } from "../TenantsUIContext";

function TenantsTable() {
  // Tenants UI Context
  const tenantsUIContext = useTenantsUIContext();
  const tenantsUIProps = useMemo(() => {
    return {
      queryParams: tenantsUIContext.queryParams,
      setQueryParams: tenantsUIContext.setQueryParams,
      openEditTenantPage: tenantsUIContext.openEditTenantPage,
      openDeleteTenantDialog: tenantsUIContext.openDeleteTenantDialog,
    };
  }, [tenantsUIContext]);

  // Getting curret state of tenants list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.tenants }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  const dispatch = useDispatch();

  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchTenants(tenantsUIProps.queryParams));
  }, [tenantsUIProps.queryParams, dispatch]);

  // Table columns
  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: false,
      sortCaret,
    },
    {
      dataField: "tenancyName",
      text: "Tenancy Name",
      sort: false,
      sortCaret,
    },
    {
      dataField: "isActive",
      text: "Status",
      sort: false,
      sortCaret,
      formatter: columnFormatters.StatusColumnFormatter,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditTenantPage: tenantsUIProps.openEditTenantPage,
        openDeleteTenantDialog: tenantsUIProps.openDeleteTenantDialog,
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
    sizePerPage: tenantsUIProps.queryParams.pageSize,
    page: tenantsUIProps.queryParams.pageNumber,
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
                  tenantsUIProps.setQueryParams
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

export default TenantsTable;
