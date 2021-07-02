import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
// import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

function TenantsLoadingDialog() {
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.tenants.listLoading }),
    shallowEqual
  );

  useEffect(() => {}, [isLoading]);

  return <div>{isLoading && <p>Loading...</p>}</div>;
  //   return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}

export default TenantsLoadingDialog;
