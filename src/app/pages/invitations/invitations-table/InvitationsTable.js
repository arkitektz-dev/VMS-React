import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/invitations/invitationsActions";
import * as uiHelpers from "../InvitationsUIHelpers";
import {
  getHandlerTableChange,
  PleaseWaitMessage,
  NoRecordsFoundMessage,
  sortCaret,
} from "./../../../../_ui/layout/utilities";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "./../../../../_ui/layout/elements";
import { useInvitationsUIContext } from "../InvitationsUIContext";

function InvitationsTable() {
  // Invitations UI Context
  const invitationsUIContext = useInvitationsUIContext();
  const invitationsUIProps = useMemo(() => {
    return {
      queryParams: invitationsUIContext.queryParams,
      setQueryParams: invitationsUIContext.setQueryParams,
      openEditInvitationPage: invitationsUIContext.openEditInvitationPage,
      openDeleteInvitationDialog:
        invitationsUIContext.openDeleteInvitationDialog,
    };
  }, [invitationsUIContext]);

  // Getting curret state of invitations list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.invitations }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  const dispatch = useDispatch();

  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchInvitations(invitationsUIProps.queryParams));
  }, [invitationsUIProps.queryParams, dispatch]);

  // Table columns
  const columns = [
    {
      dataField: "visitor.firstName",
      text: "Visitor Name",
      sort: false,
      sortCaret,
      formatter: columnFormatters.VisitorNameColumnFormatter,
    },
    {
      dataField: "visitor.emailAddress",
      text: "Email",
      sort: false,
      sortCaret,
    },
    {
      dataField: "visitor.contactNumber",
      text: "Contact No.",
      sort: false,
      sortCaret,
    },
    {
      dataField: "date",
      text: "Date Time",
      sort: false,
      sortCaret,
      formatter: columnFormatters.DateTimeColumnFormatter,
    },
    {
      dataField: "status",
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
        openEditInvitationPage: invitationsUIProps.openEditInvitationPage,
        openDeleteInvitationDialog:
          invitationsUIProps.openDeleteInvitationDialog,
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
    sizePerPage: invitationsUIProps.queryParams.pageSize,
    page: invitationsUIProps.queryParams.pageNumber,
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
                  invitationsUIProps.setQueryParams
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

export default InvitationsTable;
