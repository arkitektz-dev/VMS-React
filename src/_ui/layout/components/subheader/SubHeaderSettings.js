import React, { useMemo, useLayoutEffect, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import BreadCrumbs from "./components/BreadCrumbs";
import { useSubheader, getBreadcrumbsAndTitle } from "../../core/Subheader";

function SubHeaderSettings() {
  const location = useLocation();
  const subheader = useSubheader();

  useLayoutEffect(() => {
    const aside = getBreadcrumbsAndTitle("sidebar", location.pathname);

    const breadcrumbs =
      aside && aside.breadcrumbs.length > 0 ? aside.breadcrumbs : [];
    subheader.setBreadcrumbs(breadcrumbs);
    subheader.setTitle(
      aside && aside.title && aside.title.length > 0 ? aside.title : ""
    );
    // eslint-disable-next-line
  }, [location.pathname]);

  useEffect(() => {}, [subheader]);

  return (
    <div className="subheader py-2 py-lg-4 d-flex flex-row" style={{ left: 0 }}>
      <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <div className="d-flex align-items-center flex-wrap mr-1">
          <div className="d-flex align-items-baseline mr-5">
            <h5 className="text-dark font-weight-bold my-2 mr-5">
              {subheader.title}
            </h5>
          </div>
          <BreadCrumbs items={subheader.breadcrumbs} />
        </div>
      </div>
    </div>
  );
}

export default SubHeaderSettings;
