import React from "react";
import { Link } from "react-router-dom";
import { Tile } from "./../../../_ui/layout/elements";

function SettingDashboardPage() {
  return (
    <div>
      <div className="row">
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <Link to="/settings/users">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h5 className="mb-0">Users</h5>
                      {/* <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p> */}
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success ">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                {/* <h6 className="text-muted font-weight-normal">Users</h6> */}
              </div>
            </Link>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <Link to="/settings/roles">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h5 className="mb-0">Roles</h5>
                      {/*  <p className="text-success ml-2 mb-0 font-weight-medium">+11%</p> */}
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                {/* <h6 className="text-muted font-weight-normal">Roles</h6> */}
              </div>
            </Link>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <Link to="/settings/sites">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h5 className="mb-0">Sites</h5>
                      {/* <p className="text-danger ml-2 mb-0 font-weight-medium">-2.4%</p> */}
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-danger">
                      <span className="mdi mdi-arrow-bottom-left icon-item"></span>
                    </div>
                  </div>
                </div>
                {/* <h6 className="text-muted font-weight-normal">Sites</h6> */}
              </div>
            </Link>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <Link to="/settings/assigned-sites">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h5 className="mb-0">Assigned Sites</h5>
                      {/* <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p> */}
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success ">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                {/* <h6 className="text-muted font-weight-normal">Assigned Sites</h6> */}
              </div>
            </Link>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <Link to="/settings/appointment-statuses">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h5 className="mb-0">Appointment Statuses</h5>
                      {/* <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p> */}
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success ">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                {/* <h6 className="text-muted font-weight-normal">Appointment Statuses</h6> */}
              </div>
            </Link>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <Link to="/settings/probe-application">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h5 className="mb-0">Probe Application</h5>
                      {/*<p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p> */}
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success ">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                {/* <h6 className="text-muted font-weight-normal">Probe Application</h6> */}
              </div>
            </Link>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <Link to="/settings/login-options">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h5 className="mb-0">Login Options</h5>
                      {/*<p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p> */}
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success ">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                {/* <h6 className="text-muted font-weight-normal">Login Options</h6> */}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingDashboardPage;
