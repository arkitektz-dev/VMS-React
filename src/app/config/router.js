import UsersPage from "../pages/users/UsersPage";
import TenantsPage from "../pages/tenants/TenantsPage";
import RolesPage from "../pages/roles/RolesPage";
import SitesPage from "../pages/sites/SitesPage";
import VisitorsPage from "../pages/visitors/VisitorsPage";
import InvitationsPage from "../pages/invitations/InvitationsPage";
import AppointmentsPage from "../pages/appointments/AppointmentsPage";
import AssignedSitesPage from "../pages/assigned-sites/AssignedSitesPage";
import AppointmentStatusesPage from "../pages/appointment-statuses/AppointmentStatusesPage";

import InstallationsPage from "../pages/probe-application/installations/InstallationsPage";

export const appRouters = [
  // {
  //   path: "/users",
  //   exact: true,
  //   name: "users",
  //   permission: "Pages.Users",
  //   title: "Users",
  //   component: UsersPage,
  //   isLayout: true,
  //   showInMenu: false,
  // },
  // {
  //   path: "/tenants",
  //   exact: true,
  //   name: "tenants",
  //   permission: "Pages.Tenants",
  //   title: "Tenants",
  //   component: TenantsPage,
  //   isLayout: true,
  //   showInMenu: false,
  // },
  // {
  //   path: "/roles",
  //   exact: true,
  //   name: "roles",
  //   permission: "Pages.Roles",
  //   title: "Roles",
  //   component: RolesPage,
  //   isLayout: true,
  //   showInMenu: false,
  // },
  // {
  //   path: "/sites",
  //   exact: true,
  //   name: "sites",
  //   permission: "Pages.Sites",
  //   title: "Sites",
  //   component: SitesPage,
  //   isLayout: true,
  //   showInMenu: false,
  // },
  // {
  //   path: "/assigned-sites",
  //   exact: true,
  //   name: "assigned-sites",
  //   permission: "Pages.AssignedSites",
  //   title: "AssignedSites",
  //   component: AssignedSitesPage,
  //   isLayout: true,
  //   showInMenu: false,
  // },
  {
    path: "/visitors",
    exact: true,
    name: "visitors",
    permission: "Pages.Visitors",
    title: "Visitors",
    component: VisitorsPage,
    isLayout: true,
    showInMenu: false,
  },
  {
    path: "/invitations",
    exact: true,
    name: "invitations",
    permission: "Pages.MyInvitations",
    title: "Invitations",
    component: InvitationsPage,
    isLayout: true,
    showInMenu: false,
  },
  {
    path: "/appointments",
    exact: true,
    name: "appointments",
    permission: "Pages.Appointments",
    title: "Appointments",
    component: AppointmentsPage,
    isLayout: true,
    showInMenu: false,
  },
  // {
  //   path: "/appointment-statuses",
  //   exact: true,
  //   name: "appointment-statuses",
  //   permission: "Pages.AppointmentStatuses",
  //   title: "Appointment Statuses",
  //   component: AppointmentStatusesPage,
  //   isLayout: true,
  //   showInMenu: false,
  // },
  // {
  //   path: "/probe-application/installations",
  //   exact: true,
  //   name: "probe application",
  //   permission: "Pages.Users",
  //   title: "Probe Application",
  //   component: InstallationsPage,
  //   isLayout: true,
  //   showInMenu: false,
  // },
];

export const routers = appRouters;
