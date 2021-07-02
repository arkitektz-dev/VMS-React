import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CardProgressBar } from "./../../../../_ui/layout/elements";
import * as actions from "../../../store/sites/sitesActions";
import { useSitesUIContext } from "./../SitesUIContext";

const SiteDeleteDialog = ({ id, show, onHide }) => {
  // Sites UI Context
  const sitesUIContext = useSitesUIContext();
  const sitesUIProps = useMemo(() => {
    return {
      queryParams: sitesUIContext.queryParams,
    };
  }, [sitesUIContext]);

  // Sites Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.sites.actionsLoading }),
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

  const deleteSite = () => {
    // request server for deleting the site by id
    dispatch(actions.deleteSite(id)).then(() => {
      // to display the updated records, refresh the list after deletion 
      dispatch(actions.fetchSites(sitesUIProps.queryParams));
      // closing the confirm delete modal
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      {isLoading && <CardProgressBar variant="query" />}

      <Modal.Header closeButton>
        <Modal.Title>Site Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this site?</span>
        )}
        {isLoading && <span>Site is deleting...</span>}
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
            onClick={deleteSite}
            className="btn btn-delete btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default SiteDeleteDialog;
