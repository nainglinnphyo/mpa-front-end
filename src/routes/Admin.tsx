import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Layout from "../layout";
import Dashboard from "../pages/admin/Dashboard";
import Static from "../pages/admin/Static";

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
      ],
    },
    { path: "*", element: <Navigate to="/dashboard" replace /> },
  ]);
};

export default Admin;
