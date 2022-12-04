import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import React from "react";
import { Grid } from "@mui/material";

const Layout = () => {
	return (
		<Container maxWidth="xs">
			<Grid container>
				<Grid item xs={2}></Grid>
				<Grid item xs={10}>
					<Outlet />
				</Grid>
			</Grid>
		</Container>
	);
};

export default Layout;
