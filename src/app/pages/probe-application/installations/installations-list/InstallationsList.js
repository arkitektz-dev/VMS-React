import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../store/probe-application/installations/installationsActions";
import { useInstallationsUIContext } from "../InstallationsUIContext";

function InstallationsTable() {
  // Installations UI Context
  const installationsUIContext = useInstallationsUIContext();
  const installationsUIProps = useMemo(() => {
    return {
      queryParams: installationsUIContext.queryParams,
      setQueryParams: installationsUIContext.setQueryParams,
      openUpdateInstallationStatusDialog:
        installationsUIContext.openUpdateInstallationStatusDialog,
    };
  }, [installationsUIContext]);

  // Getting curret state of probe application installations list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.probeApplication.installations }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  const dispatch = useDispatch();

  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchInstallations(installationsUIProps.queryParams));
  }, [installationsUIProps.queryParams, dispatch]);
  return (
    <>
      <div className="row">
        <div className="col-6">
          {entities !== null &&
            entities.map((e) => (
              <div
                className="card flex-row flex-stack flex-wrap p-2"
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                key={e.id}
              >
                <div className="d-flex flex-column py-2">
                  <div className="d-flex align-items-center mb-1">
                    VMS Probe @ {e.hostName}
                  </div>
                  <div className="">
                    <p className="mb-1" style={{ fontSize: "0.8rem" }}>
                      <span>Status: </span>Active
                    </p>
                    <p className="mb-1" style={{ fontSize: "0.8rem" }}>
                      <span>App Version: </span>
                      {e.appVersion}
                    </p>
                    <p className="mb-1" style={{ fontSize: "0.8rem" }}>
                      <span>Host OS: </span>
                      {e.host}
                    </p>
                    <p className="mb-1" style={{ fontSize: "0.8rem" }}>
                      <span>Location: </span>Pakistan
                    </p>
                    <p className="mb-1" style={{ fontSize: "0.8rem" }}>
                      <span>Managed By: </span>Khan
                    </p>
                  </div>
                </div>
                <div className="d-flex flex-column py-2">
                  <div className="d-flex align-items-center mb-1">
                    <button
                      type="button"
                      onClick={() =>
                        installationsUIProps.openUpdateInstallationStatusDialog(
                          e.id
                        )
                      }
                    >
                      {e.isOpen ? "Disable" : "Enable"}
                    </button>
                  </div>
                  <div className="">
                    <p className="mb-1" style={{ fontSize: "0.8rem" }}>
                      <span>Host Name: </span>
                      {e.hostName}
                    </p>
                    <p className="mb-1" style={{ fontSize: "0.8rem" }}>
                      <span>IP Address: </span>
                      {e.ipAddress}
                    </p>
                    <p className="mb-1" style={{ fontSize: "0.8rem" }}>
                      <span>Last Refreshed: </span>Thu, May 6 2021 at 3:14 AM
                    </p>
                    <p className="mb-1" style={{ fontSize: "0.8rem" }}>
                      <span>User Field Mapping: </span>Default
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default InstallationsTable;
