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
import SiteEditForm from "./SiteEditForm";
import { useSubheader } from "../../../../_ui/layout/core/Subheader";
import { CardProgressBar } from "./../../../../_ui/layout/elements";

const initSite = {
  id: undefined,
  siteName: "",
  siteNamePrefix: "",
  siteAddress: "",
};

function SiteEdit({
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

  const { actionsLoading, siteForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.sites.actionsLoading,
      siteForEdit: state.sites.siteForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchSite(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (siteForEdit && id) {
      const _title = `Edit site '${siteForEdit.siteName}'`;
      setTitle(_title);
      subheader.setTitle(_title);
    }
  }, [siteForEdit, id]);

  const updateSite = (values) => {
    dispatch(actions.updateSite(values)).then(() => backToSitesList());
  };

  const btnRef = useRef();
  const updateSiteClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToSitesList = () => {
    history.push(`/settings/sites`);
  };

  return (
    <Card>
      {actionsLoading && <CardProgressBar />}

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
            onClick={updateSiteClick}
          >
            Update
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SiteEditForm
          actionsLoading={actionsLoading}
          site={siteForEdit || initSite}
          btnRef={btnRef}
          updateSite={updateSite}
        />
      </CardBody>
    </Card>
  );
}

export default SiteEdit;
