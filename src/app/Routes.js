import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { Layout } from "../_ui/layout";
import BasePage from "./BasePage";
import AuthPage from "./pages/auth/AuthPage";
import SettingsPage from "./SettingsPage";
import { SettingsLayout } from "./../_ui/layout/components/SettingsLayout";
import { shallowEqual, useSelector } from "react-redux";

function Routes() {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized:
        auth.accessToken != null && auth.user !== null && auth.permissions,
    }),
    shallowEqual
  );

  return (
    <Switch>
      {!isAuthorized ? (
        /*Render auth page when user at `/auth` and not authorized.*/
        <Route>
          <AuthPage />
        </Route>
      ) : (
        /*Otherwise redirect to root page (`/`)*/
        <Redirect from="/auth" to="/" />
      )}

      {!isAuthorized ? (
        /*Redirect to `/auth` when user is not authorized*/
        <Redirect to="/auth/login" />
      ) : (
        <>
          <Switch>
            <Route path="/settings">
              <SettingsLayout>
                <SettingsPage />
              </SettingsLayout>
            </Route>
            <Route>
              <Layout>
                <BasePage />
              </Layout>
            </Route>
          </Switch>
        </>
      )}
    </Switch>
  );
}

export default Routes;
