import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../store/tenants/tenantsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_ui/layout/elements";
import SVG from "react-inlinesvg";
import TenantNewForm from "./TenantNewForm";
import { useSubheader } from "../../../../_ui/layout/core/Subheader";

const initTenant = {
  tenancyName: "",
  name: "",
  adminEmailAddress: "",
  connectionString: "",
  isActive: true,
};

function TenantNew({ history }) {
  const title = "New Tenant";

  // Subheader
  const subheader = useSubheader();

  const dispatch = useDispatch();

  useEffect(() => {
    subheader.setTitle(title);
  }, []);

  const saveTenant = (values) => {
    dispatch(actions.createTenant(values)).then(() => backToTenantsList());
  };

  const btnRef = useRef();
  const saveTenantClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToTenantsList = () => {
    history.push(`/settings/tenants`);
  };

  return (
    <Card>
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
            onClick={saveTenantClick}
          >
            Save
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <TenantNewForm
          tenant={initTenant}
          btnRef={btnRef}
          saveTenant={saveTenant}
        />
      </CardBody>
    </Card>
  );
}

export default TenantNew;
