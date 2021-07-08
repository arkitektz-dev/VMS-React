import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CardProgressBar } from "./../../../../../_ui/layout/elements";
import * as actions from "../../../../store/probe-application/installations/installationsActions";
import { useInstallationsUIContext } from "./../InstallationsUIContext";

const InstallationUpdateStatusDialog = ({ id, show, onHide }) => {
  // Getting curret state of probe application installations list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.probeApplication.installations }),
    shallowEqual
  );
  const { entities } = currentState;

  // Installations UI Context
  const installationsUIContext = useInstallationsUIContext();
  const installationsUIProps = useMemo(() => {
    return {
      queryParams: installationsUIContext.queryParams,
    };
  }, [installationsUIContext]);

  // Getting curret state of probe application installations list from store (Redux)

  // Installations Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({
      isLoading: state.probeApplication.installations.actionsLoading,
    }),
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

  const updateInstallationStatus = () => {
    // getting status of the particular entity
    const status = !entities.find((e) => e.id === parseInt(id)).isOpen;
    // request server for updating the installation status
    dispatch(actions.updateInstallationStatus(id, status)).then(() => {
      // to display the updated records, refresh the list after updating status
      dispatch(actions.fetchInstallations(installationsUIProps.queryParams));
      // closing the confirm update status modal
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      {isLoading && <CardProgressBar variant="query" />}

      <Modal.Header closeButton>
        <Modal.Title>Installation Update Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to update status of this installation?</span>
        )}
        {isLoading && <span>Updating status...</span>}
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
            onClick={updateInstallationStatus}
            className="btn btn-delete btn-elevate"
          >
            Confirm
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default InstallationUpdateStatusDialog;
