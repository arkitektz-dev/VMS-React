import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { SplashScreen } from "./../_ui/layout/elements";

import SettingDashboardPage from "./pages/dashboard/SettingDashboardPage";

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

import AssignedSitesPage from "./pages/assigned-sites/AssignedSitesPage";
import AssignedSiteEdit from "./pages/assigned-sites/assigned-site-edit/AssignedSiteEdit";
import AssignedSiteNew from "./pages/assigned-sites/assigned-site-new/AssignedSiteNew";

import AppointmentStatusesPage from "./pages/appointment-statuses/AppointmentStatusesPage";
import AppointmentStatusEdit from "./pages/appointment-statuses/appointment-status-edit/AppointmentStatusEdit";
import AppointmentStatusNew from "./pages/appointment-statuses/appointment-status-new/AppointmentStatusNew";

import InstallationsPage from "./pages/probe-application/installations/InstallationsPage";

function SettingsPage() {
  const { permissions } = useSelector(
    ({ auth }) => ({
      permissions: auth.permissions,
    }),
    shallowEqual
  );

  console.log(permissions);

  return (
    <Suspense fallback={<SplashScreen />}>
      <Switch>
        {/* tenants */}
        {permissions.grantedPermissions["Pages.Tenants"] && (
          <Switch path="/settings/tenants">
            <Route path="/settings/tenants/new" component={TenantNew} />
            <Route path="/settings/tenants/:id/edit" component={TenantEdit} />
            <Route path="/" component={TenantsPage} />
          </Switch>
        )}

        {/* users */}
        {permissions.grantedPermissions["Pages.Users"] && (
          <Switch path="/settings/users">
            <Route path="/settings/users/new" component={UserNew} />
            <Route path="/settings/users/:id/edit" component={UserEdit} />
            <Route path="/" component={UsersPage} />
          </Switch>
        )}

        {/* roles */}
        {permissions.grantedPermissions["Pages.Roles"] && (
          <Switch path="/settings/roles">
            <Route path="/settings/roles/new" component={RoleNew} />
            <Route path="/settings/roles/:id/edit" component={RoleEdit} />
            <Route path="/" component={RolesPage} />
          </Switch>
        )}

        {/* sites */}
        {permissions.grantedPermissions["Pages.Sites"] && (
          <Switch path="/settings/sites">
            <Route path="/settings/sites/new" component={SiteNew} />
            <Route path="/settings/sites/:id/edit" component={SiteEdit} />
            <Route path="/" component={SitesPage} />
          </Switch>
        )}

        {/* assigned sites */}
        {permissions.grantedPermissions["Pages.AssignedSites"] && (
          <Switch path="/settings/assigned-sites">
            <Route
              path="/settings/assigned-sites/new"
              component={AssignedSiteNew}
            />
            <Route
              path="/settings/assigned-sites/:id/edit"
              component={AssignedSiteEdit}
            />
            <Route path="/" component={AssignedSitesPage} />
          </Switch>
        )}

        {/* appointment-statuses */}
        {permissions.grantedPermissions["Pages.AppointmentStatus"] && (
          <Switch path="/settings/appointment-statuses">
            <Route
              path="/settings/appointment-statuses/new"
              component={AppointmentStatusNew}
            />
            <Route
              path="/settings/appointment-statuses/:id/edit"
              component={AppointmentStatusEdit}
            />
            <Route path="/" component={AppointmentStatusesPage} />
          </Switch>
        )}

        {/* probe application */}
        {permissions.grantedPermissions["Pages.DownloadProbeApplication"] && (
          <Switch path="/settings/probe-application">
            <Route path="/" component={InstallationsPage} />
          </Switch>
        )}

        <Route path="/" component={SettingDashboardPage} />
      </Switch>
    </Suspense>
  );
}

export default SettingsPage;
