import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { SplashScreen } from "./../_ui/layout/elements";
import SettingDashboardPage from "./pages/dashboard/SettingDashboardPage";

function SettingsPage() {
  return (
    <Suspense fallback={<SplashScreen />}>
      <Switch>
        <Route path="/settings" component={SettingDashboardPage} />
      </Switch>
    </Suspense>
  );
}

export default SettingsPage;
