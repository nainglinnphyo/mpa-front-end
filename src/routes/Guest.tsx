import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Login from "../pages/guest/Login";

const Guest = () => {
	return useRoutes([
		{ path: "/", element: <Navigate to="/login" replace /> },
		{
			path: "login",
			element: <Login />,
		},
	]);
};

export default Guest;
