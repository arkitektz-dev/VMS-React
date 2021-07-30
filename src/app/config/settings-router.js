import SitesPage from "../pages/sites/SitesPage";

export const settingsRouters = [
  {
    name: "sites",
    title: "Sites",
    path: "/sites",
    exact: true,
    permission: "Pages.Sites",
    component: SitesPage,
  },
];

export const routers = settingsRouters;
