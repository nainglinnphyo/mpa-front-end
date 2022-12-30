import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Layout from "../layout";
import Static from "../pages/admin/Static";

import {
  DashBoard,
  Country,
  Port,
  Ship,
  ShipArrival,
  Shipper,
  Unit,
} from "./elements";

const Admin = () => {
  return useRoutes([
    { path: "/", element: <Navigate to="dashboard" replace /> },
    {
      path: "dashboard",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <DashBoard />,
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
          element: <Shipper />,
        },
        {
          path: "ship",
          element: <Ship />,
        },
        {
          path: "ship-arrival",
          element: <ShipArrival />,
        },
        {
          path: "port",
          element: <Port />,
        },
        {
          path: "unit",
          element: <Unit />,
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
