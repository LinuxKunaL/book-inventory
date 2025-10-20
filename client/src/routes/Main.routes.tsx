import { useMemo } from "react";
import { createBrowserRouter } from "react-router";

import AuthLayout from "@pages/auth/layout";

import AdminRootLayout from "@pages/admin/layout";
import DistributorRootLayout from "@pages/distributor/layout";
import VolunteerRootLayout from "@pages/volunteer-dashboard/layout";
import ProprietorRootLayout from "@pages/proprietor/layout";

import useAdminAuth from "@hooks/api/auth/useAdmin.auth";

import AdminRoutes from "./admin.routes";
import DistributorRoutes from "./distributor.routes";
import VolunteerRoutes from "./volunteer.routes";
import ProprietorRoutes from "./proprietor.routes";

const MainRoutes = () => {
  const { adminMe } = useAdminAuth();
  const adminRoutes = AdminRoutes();
  const distributorRoutes = DistributorRoutes();
  const volunteerRoutes = VolunteerRoutes();
  const proprietorRoutes = ProprietorRoutes();


  const routes = useMemo(
    () =>
      createBrowserRouter([
        {
          path: "/",
          element: <AuthLayout />,
        },
        {
          path: "/admin",
          element: <AdminRootLayout />,
          children: adminRoutes,
          loader: adminMe,
          // shouldRevalidate: () => false,
        },
        {
          path: "/proprietor",
          element: <ProprietorRootLayout />,
          children: proprietorRoutes,
          loader: adminMe,
          shouldRevalidate: () => false,
        },
        {
          path: "/volunteer",
          element: <VolunteerRootLayout />,
          children: volunteerRoutes,
          // loader: adminMe,
          shouldRevalidate: () => false,
        },
        {
          path: "/distributor",
          element: <DistributorRootLayout />,
          children: distributorRoutes,
          // loader: adminMe,
          shouldRevalidate: () => false,
        },
      ]),
    []
  );

  return routes;
};

export default MainRoutes;
