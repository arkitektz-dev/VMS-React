import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CardProgressBar } from "./../../../../_ui/layout/elements";
import * as actions from "../../../store/visitors/visitorsActions";
import { useVisitorsUIContext } from "./../VisitorsUIContext";

const VisitorDeleteDialog = ({ id, show, onHide }) => {
  // Visitors UI Context
  const visitorsUIContext = useVisitorsUIContext();
  const visitorsUIProps = useMemo(() => {
    return {
      queryParams: visitorsUIContext.queryParams,
    };
  }, [visitorsUIContext]);

  // Visitors Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.visitors.actionsLoading }),
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

  const deleteVisitor = () => {
    // request server for deleting the visitor by id
    dispatch(actions.deleteVisitor(id)).then(() => {
      // to display the updated records, refresh the list after deletion
      dispatch(actions.fetchVisitors(visitorsUIProps.queryParams));
      // closing the confirm delete modal
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      {isLoading && <CardProgressBar variant="query" />}

      <Modal.Header closeButton>
        <Modal.Title>Visitor Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this visitor?</span>
        )}
        {isLoading && <span>Visitor is deleting...</span>}
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
            onClick={deleteVisitor}
            className="btn btn-delete btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default VisitorDeleteDialog;
