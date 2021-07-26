import React, { useEffect, useState, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/tenants/tenantsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_ui/layout/elements";
import SVG from "react-inlinesvg";
import TenantEditForm from "./TenantEditForm";
import { useSubheader } from "../../../../_ui/layout/core/Subheader";
import { CardProgressBar } from "./../../../../_ui/layout/elements";

const initTenant = {
  id: undefined,
  tenancyName: "",
  name: "",
  isActive: true,
};

function TenantEdit({
  history,
  match: {
    params: { id },
  },
}) {
  //state
  const [title, setTitle] = useState("");

  // Subheader
  const subheader = useSubheader();

  const dispatch = useDispatch();

  const { actionsLoading, tenantForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.tenants.actionsLoading,
      tenantForEdit: state.tenants.tenantForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchTenant(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (tenantForEdit && id) {
      const _title = `Edit tenant '${tenantForEdit.name}'`;
      setTitle(_title);
      subheader.setTitle(_title);
    }
  }, [tenantForEdit, id]);

  const updateTenant = (values) => {
    dispatch(actions.updateTenant(values)).then(() => backToTenantsList());
  };

  const btnRef = useRef();
  const updateTenantClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToTenantsList = () => {
    history.push(`/settings/tenants`);
  };

  return (
    <Card>
      {actionsLoading && <CardProgressBar />}

      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToTenantsList}
            className="btn btn-light"
          >
            <span className="svg-icon svg-icon-sm svg-icon-primary">
              <SVG src="/assets/images/icons/svg/arrow-left.svg" />
            </span>
            Back
          </button>
          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={updateTenantClick}
          >
            Update
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <TenantEditForm
          actionsLoading={actionsLoading}
          tenant={tenantForEdit || initTenant}
          btnRef={btnRef}
          updateTenant={updateTenant}
        />
      </CardBody>
    </Card>
  );
}

export default TenantEdit;
