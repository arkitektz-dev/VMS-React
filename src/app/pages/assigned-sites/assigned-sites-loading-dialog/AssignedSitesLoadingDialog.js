import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
// import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

const AssignedSitesLoadingDialog = () => {
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.assignedSites.listLoading }),
    shallowEqual
  );

  useEffect(() => {}, [isLoading]);

  return <div>{isLoading && <p>Loading...</p>}</div>;
  // return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
};

export default AssignedSitesLoadingDialog;
