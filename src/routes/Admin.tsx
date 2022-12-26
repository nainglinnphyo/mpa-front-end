import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Layout from "../layout";
import Dashboard from "../pages/admin/Dashboard";
import Static from "../pages/admin/Static";
import Country from "../pages/admin/country/Country";
import ShipperPage from "../pages/admin/shipper/Shipper";
import ShipPage from "../pages/admin/ship/Ship";
import ShipArrivalPage from "../pages/admin/shiparrival/ShipArrival";
import Port from "../pages/admin/port/Port";

const Admin = () => {
  return useRoutes([
    { path: "/", element: <Navigate to="dashboard" replace /> },
    {
      path: "dashboard",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "static",
          element: <Static />,
        },
        {
          path: "country",
          element: <Country />,
        },
        {
          path: "shipper",
          element: <ShipperPage />,
        },
        {
          path: "ship",
          element: <ShipPage />,
        },
        {
          path: "ship-arrival",
          element: <ShipArrivalPage />,
        },
        {
          path: "port",
          element: <Port />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);
};

export default Admin;
