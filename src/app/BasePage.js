import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { SplashScreen } from "./../_ui/layout/elements";
import DashboardPage from "./pages/dashboard/DashboardPage";

import UsersPage from "./pages/users/UsersPage";
import UserEdit from "./pages/users/user-edit/UserEdit";
import UserNew from "./pages/users/user-new/UserNew";

import TenantsPage from "./pages/tenants/TenantsPage";
import TenantEdit from "./pages/tenants/tenant-edit/TenantEdit";
import TenantNew from "./pages/tenants/tenant-new/TenantNew";

import RolesPage from "./pages/roles/RolesPage";
import RoleEdit from "./pages/roles/role-edit/RoleEdit";
import RoleNew from "./pages/roles/role-new/RoleNew";

import SitesPage from "./pages/sites/SitesPage";
import SiteEdit from "./pages/sites/site-edit/SiteEdit";
import SiteNew from "./pages/sites/site-new/SiteNew";

import VisitorsPage from "./pages/visitors/VisitorsPage";
import VisitorEdit from "./pages/visitors/visitor-edit/VisitorEdit";
import VisitorNew from "./pages/visitors/visitor-new/VisitorNew";

import InvitationsPage from "./pages/invitations/InvitationsPage";
import InvitationEdit from "./pages/invitations/invitation-edit/InvitationEdit";
import InvitationNew from "./pages/invitations/invitation-new/InvitationNew";

import AppointmentsPage from "./pages/appointments/AppointmentsPage";
import AppointmentEdit from "./pages/appointments/appointment-edit/AppointmentEdit";
import AppointmentNew from "./pages/appointments/appointment-new/AppointmentNew";

import AssignedSitesPage from "./pages/assigned-sites/AssignedSitesPage";
import AssignedSiteEdit from "./pages/assigned-sites/assigned-site-edit/AssignedSiteEdit";
import AssignedSiteNew from "./pages/assigned-sites/assigned-site-new/AssignedSiteNew";

import AppointmentStatusesPage from "./pages/appointment-statuses/AppointmentStatusesPage";
import AppointmentStatusEdit from "./pages/appointment-statuses/appointment-status-edit/AppointmentStatusEdit";
import AppointmentStatusNew from "./pages/appointment-statuses/appointment-status-new/AppointmentStatusNew";

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
        {/* users */}
        {permissions.grantedPermissions["Pages.Users"] && (
          <Switch path="/users">
            <Route path="/users/new" component={UserNew} />
            <Route path="/users/:id/edit" component={UserEdit} />
            <Route path="/" component={UsersPage} />
          </Switch>
        )}

        {/* tenants */}
        {permissions.grantedPermissions["Pages.Tenants"] && (
          <Switch path="/tenants">
            <Route path="/tenants/new" component={TenantNew} />
            <Route path="/tenants/:id/edit" component={TenantEdit} />
            <Route path="/" component={TenantsPage} />
          </Switch>
        )}

        {/* roles */}
        {permissions.grantedPermissions["Pages.Roles"] && (
          <Switch path="/roles">
            <Route path="/roles/new" component={RoleNew} />
            <Route path="/roles/:id/edit" component={RoleEdit} />
            <Route path="/" component={RolesPage} />
          </Switch>
        )}

        {/* sites */}
        {permissions.grantedPermissions["Pages.Sites"] && (
          <Switch path="/sites">
            <Route path="/sites/new" component={SiteNew} />
            <Route path="/sites/:id/edit" component={SiteEdit} />
            <Route path="/" component={SitesPage} />
          </Switch>
        )}

        {/* assigned sites */}
        {permissions.grantedPermissions["Pages.AssignedSites"] && (
          <Switch path="/assigned-sites">
            <Route path="/assigned-sites/new" component={AssignedSiteNew} />
            <Route
              path="/assigned-sites/:id/edit"
              component={AssignedSiteEdit}
            />
            <Route path="/" component={AssignedSitesPage} />
          </Switch>
        )}

        {/* visitors */}
        {permissions.grantedPermissions["Pages.Visitors"] && (
          <Switch path="/visitors">
            <Route path="/visitors/new" component={VisitorNew} />
            <Route path="/visitors/:id/edit" component={VisitorEdit} />
            <Route path="/" component={VisitorsPage} />
          </Switch>
        )}

        {/* invitations */}
        {permissions.grantedPermissions["Pages.Invitations"] && (
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

        {/* appointment-statuses */}
        {permissions.grantedPermissions["Pages.AppointmentStatuses"] && (
          <Switch path="/appointment-statuses">
            <Route
              path="/appointment-statuses/new"
              component={AppointmentStatusNew}
            />
            <Route
              path="/appointment-statuses/:id/edit"
              component={AppointmentStatusEdit}
            />
            <Route path="/" component={AppointmentStatusesPage} />
          </Switch>
        )}

        {/* dashboard */}
        <Route path="/" component={DashboardPage} />
      </Switch>
    </Suspense>
  );
}

export default BasePage;
