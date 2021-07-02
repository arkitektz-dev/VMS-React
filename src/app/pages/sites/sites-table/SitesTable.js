import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/sites/sitesActions";
import * as uiHelpers from "../SitesUIHelpers";
import {
  getHandlerTableChange,
  PleaseWaitMessage,
  NoRecordsFoundMessage,
  sortCaret,
} from "./../../../../_ui/layout/utilities";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "./../../../../_ui/layout/elements/pagination/Pagination";
import { useSitesUIContext } from "../SitesUIContext";

function SitesTable() {
  // Sites UI Context
  const sitesUIContext = useSitesUIContext();
  const sitesUIProps = useMemo(() => {
    return {
      queryParams: sitesUIContext.queryParams,
      setQueryParams: sitesUIContext.setQueryParams,
      openEditSitePage: sitesUIContext.openEditSitePage,
      openDeleteSiteDialog: sitesUIContext.openDeleteSiteDialog,
    };
  }, [sitesUIContext]);

  // Getting curret state of sites list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.sites }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Sites Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchSites(sitesUIProps.queryParams));
  }, [sitesUIProps.queryParams, dispatch]);

  // Table columns
  const columns = [
    {
      dataField: "siteName",
      text: "Site Name",
      sort: false,
      sortCaret,
    },
    {
      dataField: "siteNamePrefix",
      text: "Site Name Prefix",
      sort: false,
      sortCaret,
    },
    {
      dataField: "siteAddress",
      text: "siteAddress",
      sort: false,
      sortCaret,
    },
    {
      dataField: "creationTime",
      text: "Created Time",
      sort: false,
      formatter: columnFormatters.CreatedTimeColumnFormatter,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditSitePage: sitesUIProps.openEditSitePage,
        openDeleteSiteDialog: sitesUIProps.openDeleteSiteDialog,
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
    sizePerPage: sitesUIProps.queryParams.pageSize,
    page: sitesUIProps.queryParams.pageNumber,
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
                  sitesUIProps.setQueryParams
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

export default SitesTable;
