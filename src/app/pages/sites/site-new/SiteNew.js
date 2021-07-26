import React, { useEffect, useState, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/sites/sitesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_ui/layout/elements";
import SVG from "react-inlinesvg";
import SiteNewForm from "./SiteNewForm";
import { useSubheader } from "../../../../_ui/layout/core/Subheader";

const initSite = {
  siteName: "",
  siteNamePrefix: "",
  siteAddress: "",
};

function SiteNew({ history }) {
  const title = "New Site";

  // Subheader
  const subheader = useSubheader();

  const dispatch = useDispatch();

  useEffect(() => {
    subheader.setTitle(title);
  }, []);

  const saveSite = (values) => {
    dispatch(actions.createSite(values)).then(() => backToSitesList());
  };

  const btnRef = useRef();
  const saveSiteClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToSitesList = () => {
    history.push(`/settings/sites`);
  };

  return (
    <Card>
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToSitesList}
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
            onClick={saveSiteClick}
          >
            Save
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SiteNewForm site={initSite} btnRef={btnRef} saveSite={saveSite} />
      </CardBody>
    </Card>
  );
}

export default SiteNew;
