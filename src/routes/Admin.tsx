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
  NewShipArrival,
  ProductList,
  BillOfLandingList,
  NewBLForm,
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
          children: [
            {
              element: <Navigate to="/dashboard/ship-arrival/list" replace />,
              index: true,
            },
            { path: "list", element: <ShipArrival /> },
            {
              path: "new",
              element: <NewShipArrival />,
            },
            {
              path: "bill-of-landing-list",
              element: <BillOfLandingList />,
            },
            {
              path: "bill-of-landing-create",
              element: <NewBLForm />,
            },
          ],
        },
        {
          path: "port",
          element: <Port />,
        },
        {
          path: "unit",
          element: <Unit />,
        },
        {
          path: "product-list",
          children: [
            {
              element: <Navigate to="/dashboard/product-list/list" replace />,
              index: true,
            },
            { path: "list", element: <ProductList /> },
            {
              path: "new",
              element: <NewShipArrival />,
            },
          ],
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
