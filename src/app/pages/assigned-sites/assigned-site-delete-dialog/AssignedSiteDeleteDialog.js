import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CardProgressBar } from "./../../../../_ui/layout/elements";
import * as actions from "../../../store/assigned-sites/assignedSitesActions";
import { useAssignedSitesUIContext } from "./../AssignedSitesUIContext";

const AssignedSiteDeleteDialog = ({ id, show, onHide }) => {
  // AssignedSites UI Context
  const assignedSitesUIContext = useAssignedSitesUIContext();
  const assignedSitesUIProps = useMemo(() => {
    return {
      queryParams: assignedSitesUIContext.queryParams,
    };
  }, [assignedSitesUIContext]);

  // AssignedSites Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.assignedSites.actionsLoading }),
    shallowEqual
  );

  // if no id is available we should close the confirm delete modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteAssignedSite = () => {
    // request server for deleting the assignedSite by id
    dispatch(actions.deleteAssignedSite(id)).then(() => {
      // to display the updated records, refresh the list after deletion
      dispatch(actions.fetchAssignedSites(assignedSitesUIProps.queryParams));
      // closing the confirm delete modal
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      {isLoading && <CardProgressBar variant="query" />}

      <Modal.Header closeButton>
        <Modal.Title>Assigned Site Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this assigned site?</span>
        )}
        {isLoading && <span>Assigned Site is deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteAssignedSite}
            className="btn btn-delete btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignedSiteDeleteDialog;
