import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { SplashScreen } from "./../_ui/layout/elements";

import DashboardPage from "./pages/dashboard/DashboardPage";
import TenantDashboardPage from "./pages/dashboard/TenantDashboardPage";

import VisitorsPage from "./pages/visitors/VisitorsPage";
import VisitorEdit from "./pages/visitors/visitor-edit/VisitorEdit";
import VisitorNew from "./pages/visitors/visitor-new/VisitorNew";

import InvitationsPage from "./pages/invitations/InvitationsPage";
import InvitationEdit from "./pages/invitations/invitation-edit/InvitationEdit";
import InvitationNew from "./pages/invitations/invitation-new/InvitationNew";

import AppointmentsPage from "./pages/appointments/AppointmentsPage";
import AppointmentEdit from "./pages/appointments/appointment-edit/AppointmentEdit";
import AppointmentNew from "./pages/appointments/appointment-new/AppointmentNew";

function BasePage() {
  const { permissions } = useSelector(
    ({ auth }) => ({
      permissions: auth.permissions,
    }),
    shallowEqual
  );

  return (
    <Suspense fallback={<SplashScreen />}>
      <Switch>
        {/* visitors */}
        {permissions.grantedPermissions["Pages.Visitors"] && (
          <Switch path="/visitors">
            <Route path="/visitors/new" component={VisitorNew} />
            <Route path="/visitors/:id/edit" component={VisitorEdit} />
            <Route path="/" component={VisitorsPage} />
          </Switch>
        )}

        {/* invitations */}
        {permissions.grantedPermissions["Pages.MyInvitations"] && (
          <Switch path="/invitations">
            <Route path="/invitations/new" component={InvitationNew} />
            <Route path="/invitations/:id/edit" component={InvitationEdit} />
            <Route path="/" component={InvitationsPage} />
          </Switch>
        )}

        {/* appointments */}
        {permissions.grantedPermissions["Pages.Appointments"] && (
          <Switch path="/appointments">
            <Route path="/appointments/new" component={AppointmentNew} />
            <Route path="/appointments/:id/edit" component={AppointmentEdit} />
            <Route path="/" component={AppointmentsPage} />
          </Switch>
        )}

        {/* dashboard */}
        {/* <Route path="/" component={TenantDashboardPage} /> */}
        <Route path="/" component={DashboardPage} />
      </Switch>
    </Suspense>
  );
}

export default BasePage;
