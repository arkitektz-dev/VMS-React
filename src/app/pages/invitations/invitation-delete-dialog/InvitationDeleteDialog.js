import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CardProgressBar } from "./../../../../_ui/layout/elements";
import * as actions from "../../../store/invitations/invitationsActions";
import { useInvitationsUIContext } from "./../InvitationsUIContext";

const InvitationDeleteDialog = ({ id, show, onHide }) => {
  // Invitations UI Context
  const invitationsUIContext = useInvitationsUIContext();
  const invitationsUIProps = useMemo(() => {
    return {
      queryParams: invitationsUIContext.queryParams,
    };
  }, [invitationsUIContext]);

  // Invitations Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.invitations.actionsLoading }),
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

  const deleteInvitation = () => {
    // request server for deleting the invitation by id
    dispatch(actions.deleteInvitation(id)).then(() => {
      // to display the updated records, refresh the list after deletion
      dispatch(actions.fetchInvitations(invitationsUIProps.queryParams));
      // closing the confirm delete modal
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      {isLoading && <CardProgressBar variant="query" />}

      <Modal.Header closeButton>
        <Modal.Title>Invitation Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this invitation?</span>
        )}
        {isLoading && <span>Invitation is deleting...</span>}
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
            onClick={deleteInvitation}
            className="btn btn-delete btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default InvitationDeleteDialog;
