import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CardProgressBar } from "./../../../../_ui/layout/elements";
import * as actions from "./../../../store/tenants/tenantsActions";
import { useTenantsUIContext } from "./../TenantsUIContext";

const TenantDeleteDialog = ({ id, show, onHide }) => {
  // Tenants UI Context
  const tenantsUIContext = useTenantsUIContext();
  const tenantsUIProps = useMemo(() => {
    return {
      queryParams: tenantsUIContext.queryParams,
    };
  }, [tenantsUIContext]);

  // Tenants Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.tenants.actionsLoading }),
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

  const deleteTenant = () => {
    // request server for deleting the tenant by id
    dispatch(actions.deleteTenant(id)).then(() => {
      // to display the updated records, refresh the list after deletion
      dispatch(actions.fetchTenants(tenantsUIProps.queryParams));
      // closing the confirm delete modal
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      {isLoading && <CardProgressBar variant="query" />}

      <Modal.Header closeButton>
        <Modal.Title>Tenant Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this tenant?</span>
        )}
        {isLoading && <span>Tenant is deleting...</span>}
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
            onClick={deleteTenant}
            className="btn btn-delete btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default TenantDeleteDialog;
