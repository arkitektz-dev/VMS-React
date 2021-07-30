import UsersPage from "../pages/users/UsersPage";
import TenantsPage from "../pages/tenants/TenantsPage";
import RolesPage from "../pages/roles/RolesPage";
import VisitorsPage from "../pages/visitors/VisitorsPage";
import InvitationsPage from "../pages/invitations/InvitationsPage";
import AppointmentsPage from "../pages/appointments/AppointmentsPage";

export const appRouters = [
  {
    name: "users",
    title: "Users",
    path: "/settings/users",
    exact: true,
    permission: "Pages.Users",
    showInAdminMenu: true,
    component: UsersPage,
  },
  {
    name: "tenants",
    title: "Tenants",
    path: "/settings/tenants",
    exact: true,
    permission: "Pages.Tenants",
    showInAdminMenu: true,
    component: TenantsPage,
  },
  {
    name: "roles",
    title: "Roles",
    path: "/settings/roles",
    exact: true,
    permission: "Pages.Roles",
    showInAdminMenu: true,
    component: RolesPage,
  },
  {
    name: "visitors",
    title: "Visitors",
    path: "/visitors",
    exact: true,
    permission: "Pages.Visitors",
    showInAdminMenu: false,
    component: VisitorsPage,
  },
  {
    name: "invitations",
    title: "Invitations",
    path: "/invitations",
    exact: true,
    permission: "Pages.MyInvitations",
    showInAdminMenu: false,
    component: InvitationsPage,

  },
  {
    name: "appointments",
    title: "Appointments",
    path: "/appointments",
    exact: true,
    permission: "Pages.Appointments",
    showInAdminMenu: false,
    component: AppointmentsPage,
  },
];

export const routers = appRouters;
