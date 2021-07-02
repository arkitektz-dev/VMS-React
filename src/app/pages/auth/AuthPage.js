import React from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import Login from "./Login";

function AuthPage() {
  return (
    <div className="d-lg-flex half">
      <div
        className="bg"
        style={{ backgroundImage: `url(/assets/images/bg/bg-6.jpg)` }}
      >
        <div className="d-flex flex-row-fluid flex-column justify-content-between">
          {/* start:: Aside header */}
          <Link to="/" className="flex-column-auto mt-5 pb-lg-0 pb-10">
            <img
              alt="Logo"
              className="max-h-70px"
              src="https://preview.keenthemes.com/metronic/react/demo1/media/logos/logo-letter-1.png"
            />
          </Link>
          {/* end:: Aside header */}

          <div className="flex-column-fluid d-flex flex-column justify-content-center">
            <h3 className="font-size-h1 mb-5 text-white">Welcome to VMS!</h3>
            <p className="font-weight-lighter text-white opacity-80">
              The ultimate Bootstrap & React 16 admin theme framework for next
              generation web apps.
            </p>
          </div>
        </div>
      </div>
      <div className="contents">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-7">
              {/* <h3></h3>
              <p className="mb-4"></p> */}
              <Switch>
                <Route path="/auth/login" component={Login} />
                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
