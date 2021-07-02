import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/visitors/visitorsActions";
import * as uiHelpers from "../VisitorsUIHelpers";
import {
  getHandlerTableChange,
  PleaseWaitMessage,
  NoRecordsFoundMessage,
  sortCaret,
} from "./../../../../_ui/layout/utilities";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "./../../../../_ui/layout/elements";
import { useVisitorsUIContext } from "../VisitorsUIContext";

function VisitorsTable() {
  // Visitors UI Context
  const visitorsUIContext = useVisitorsUIContext();
  const visitorsUIProps = useMemo(() => {
    return {
      queryParams: visitorsUIContext.queryParams,
      setQueryParams: visitorsUIContext.setQueryParams,
      openEditVisitorPage: visitorsUIContext.openEditVisitorPage,
      openDeleteVisitorDialog: visitorsUIContext.openDeleteVisitorDialog,
    };
  }, [visitorsUIContext]);

  // Getting curret state of visitors list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.visitors }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Visitors Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchVisitors(visitorsUIProps.queryParams));
  }, [visitorsUIProps.queryParams, dispatch]);

  // Table columns
  const columns = [
    {
      dataField: "firstName",
      text: "First Name",
      sort: false,
      sortCaret,
    },
    {
      dataField: "lastName",
      text: "Last Name",
      sort: false,
      sortCaret,
    },
    {
      dataField: "contactNumber",
      text: "Contact Number",
      sort: false,
      sortCaret,
    },
    {
      dataField: "company",
      text: "Company",
      sort: false,
      sortCaret,
    },
    {
      dataField: "emailAddress",
      text: "Email Address",
      sort: false,
      sortCaret,
    },
    {
      dataField: "isBlackListed",
      text: "BlackListed",
      sort: false,
      sortCaret,
      formatter: columnFormatters.BlacklistColumnFormatter,
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
        openEditVisitorPage: visitorsUIProps.openEditVisitorPage,
        openDeleteVisitorDialog: visitorsUIProps.openDeleteVisitorDialog,
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
    sizePerPage: visitorsUIProps.queryParams.pageSize,
    page: visitorsUIProps.queryParams.pageNumber,
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
                  visitorsUIProps.setQueryParams
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

export default VisitorsTable;
