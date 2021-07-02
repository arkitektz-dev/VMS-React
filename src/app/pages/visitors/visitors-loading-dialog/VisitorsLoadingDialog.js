import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
// import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

function VisitorsLoadingDialog() {
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.visitors.listLoading }),
    shallowEqual
  );

  useEffect(() => {}, [isLoading]);

  return <div>{isLoading && <p>Loading...</p>}</div>;
  //   return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}

export default VisitorsLoadingDialog;
