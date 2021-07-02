import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/appointment-statuses/appointmentStatusesActions";
import * as uiHelpers from "../AppointmentStatusesUIHelpers";
import {
  getHandlerTableChange,
  PleaseWaitMessage,
  NoRecordsFoundMessage,
  sortCaret,
} from "./../../../../_ui/layout/utilities";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "./../../../../_ui/layout/elements";
import { useAppointmentStatusesUIContext } from "../AppointmentStatusesUIContext";

function AppointmentStatusesTable() {
  // Appointment Statuses UI Context
  const appointmentStatusesUIContext = useAppointmentStatusesUIContext();
  const appointmentStatusesUIProps = useMemo(() => {
    return {
      queryParams: appointmentStatusesUIContext.queryParams,
      setQueryParams: appointmentStatusesUIContext.setQueryParams,
      openEditAppointmentStatusPage:
        appointmentStatusesUIContext.openEditAppointmentStatusPage,
      openDeleteAppointmentStatusDialog:
        appointmentStatusesUIContext.openDeleteAppointmentStatusDialog,
    };
  }, [appointmentStatusesUIContext]);

  // Getting curret state of appointment statuses list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.appointmentStatuses }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // AppointmentStatuses Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(
      actions.fetchAppointmentStatuses(appointmentStatusesUIProps.queryParams)
    );
  }, [appointmentStatusesUIProps.queryParams, dispatch]);

  // Table columns
  const columns = [
    {
      dataField: "status",
      text: "Status",
      sort: false,
      sortCaret,
    },
    {
      dataField: "creationTime",
      text: "Creation Time",
      sort: false,
      formatter: columnFormatters.CreatedTimeColumnFormatter,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditAppointmentStatusPage:
          appointmentStatusesUIProps.openEditAppointmentStatusPage,
        openDeleteAppointmentStatusDialog:
          appointmentStatusesUIProps.openDeleteAppointmentStatusDialog,
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
    sizePerPage: appointmentStatusesUIProps.queryParams.pageSize,
    page: appointmentStatusesUIProps.queryParams.pageNumber,
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
                  appointmentStatusesUIProps.setQueryParams
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

export default AppointmentStatusesTable;
