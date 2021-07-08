import { combineReducers } from "redux";
import auth from "./auth/reducer";
import { usersSlice } from "./users/usersSlice";
import { tenantsSlice } from "./tenants/tenantsSlice";
import { rolesSlice } from "./roles/rolesSlice";
import { sitesSlice } from "./sites/sitesSlice";
import { visitorsSlice } from "./visitors/visitorsSlice";
import { invitationsSlice } from "./invitations/invitationsSlice";
import { appointmentsSlice } from "./appointments/appointmentsSlice";
import { assignedSitesSlice } from "./assigned-sites/assignedSitesSlice";
import { appointmentStatusesSlice } from "./appointment-statuses/appointmentStatusesSlice";
import probeApplication from "./probe-application/reducer";

export default combineReducers({
  auth,
  users: usersSlice.reducer,
  tenants: tenantsSlice.reducer,
  roles: rolesSlice.reducer,
  sites: sitesSlice.reducer,
  visitors: visitorsSlice.reducer,
  invitations: invitationsSlice.reducer,
  appointments: appointmentsSlice.reducer,
  assignedSites: assignedSitesSlice.reducer,
  appointmentStatuses: appointmentStatusesSlice.reducer,
  probeApplication,
});
