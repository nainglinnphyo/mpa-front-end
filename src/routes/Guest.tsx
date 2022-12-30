import React from "react";
import { useRoutes, Navigate } from "react-router-dom";

import { Login } from "./elements";
const Guest = () => {
  return useRoutes([
    { path: "/", element: <Navigate to="/login" replace /> },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);
};

export default Guest;
