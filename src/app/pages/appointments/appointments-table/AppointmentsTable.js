import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/appointments/appointmentsActions";
import * as uiHelpers from "../AppointmentsUIHelpers";
import {
  getHandlerTableChange,
  PleaseWaitMessage,
  NoRecordsFoundMessage,
  sortCaret,
} from "./../../../../_ui/layout/utilities";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "./../../../../_ui/layout/elements";
import { useAppointmentsUIContext } from "../AppointmentsUIContext";

function AppointmentsTable() {
  // Appointments UI Context
  const appointmentsUIContext = useAppointmentsUIContext();
  const appointmentsUIProps = useMemo(() => {
    return {
      queryParams: appointmentsUIContext.queryParams,
      setQueryParams: appointmentsUIContext.setQueryParams,
      openEditAppointmentPage: appointmentsUIContext.openEditAppointmentPage,
      openDeleteAppointmentDialog:
        appointmentsUIContext.openDeleteAppointmentDialog,
    };
  }, [appointmentsUIContext]);

  // Getting curret state of appointments list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.appointments }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Appointments Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchAppointments(appointmentsUIProps.queryParams));
  }, [appointmentsUIProps.queryParams, dispatch]);

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
        openEditAppointmentPage: appointmentsUIProps.openEditAppointmentPage,
        openDeleteAppointmentDialog:
          appointmentsUIProps.openDeleteAppointmentDialog,
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
    sizePerPage: appointmentsUIProps.queryParams.pageSize,
    page: appointmentsUIProps.queryParams.pageNumber,
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
                  appointmentsUIProps.setQueryParams
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

export default AppointmentsTable;
