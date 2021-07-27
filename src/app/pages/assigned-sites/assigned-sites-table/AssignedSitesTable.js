import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/assigned-sites/assignedSitesActions";
import * as uiHelpers from "../AssignedSitesUIHelpers";
import {
  getHandlerTableChange,
  PleaseWaitMessage,
  NoRecordsFoundMessage,
  sortCaret,
} from "./../../../../_ui/layout/utilities";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "./../../../../_ui/layout/elements";
import { useAssignedSitesUIContext } from "../AssignedSitesUIContext";

function AssignedSitesTable() {
  // AssignedSites UI Context
  const assignedSitesUIContext = useAssignedSitesUIContext();
  const assignedSitesUIProps = useMemo(() => {
    return {
      queryParams: assignedSitesUIContext.queryParams,
      setQueryParams: assignedSitesUIContext.setQueryParams,
      openEditAssignedSitePage: assignedSitesUIContext.openEditAssignedSitePage,
      openDeleteAssignedSiteDialog:
        assignedSitesUIContext.openDeleteAssignedSiteDialog,
    };
  }, [assignedSitesUIContext]);

  // Getting curret state of assignedSites list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.assignedSites }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
    console.log(entities);
  // AssignedSites Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchAssignedSites(assignedSitesUIProps.queryParams));
  }, [assignedSitesUIProps.queryParams, dispatch]);

  // Table columns
  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: false,
      sortCaret,
    },
    {
      dataField: "assignedSitesName",
      text: "Assigned Sites",
      formatter: columnFormatters.AssignedSiteColumnFormatter,
      sort: false,
      sortCaret,
    },
    // {
    //   dataField: "action",
    //   text: "Actions",
    //   formatter: columnFormatters.ActionsColumnFormatter,
    //   formatExtraData: {
    //     openEditAssignedSitePage: assignedSitesUIProps.openEditAssignedSitePage,
    //     openDeleteAssignedSiteDialog:
    //       assignedSitesUIProps.openDeleteAssignedSiteDialog,
    //   },
    //   classes: "text-right pr-0",
    //   headerClasses: "text-right pr-3",
    //   style: {
    //     minWidth: "100px",
    //   },
    // },
  ];

  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: assignedSitesUIProps.queryParams.pageSize,
    page: assignedSitesUIProps.queryParams.pageNumber,
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
                keyField="userId"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  assignedSitesUIProps.setQueryParams
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

export default AssignedSitesTable;
