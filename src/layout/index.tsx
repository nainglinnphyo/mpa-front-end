import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const navItems = ["Dashboard", "Country", "Shipper"];

export default function DrawerAppBar() {
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const navigate = useNavigate();

	return (
		<Container>
			<AppBar component="nav">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
					>
						MUI
					</Typography>
					<Box sx={{ display: { xs: "none", sm: "block" } }}>
						{navItems.map((item) => (
							<Button
								key={item}
								sx={{ color: "#fff" }}
								onClick={() => navigate(`/dashboard/${item.toLowerCase()}`)}
							>
								{item}
							</Button>
						))}
					</Box>
				</Toolbar>
			</AppBar>
			<Container maxWidth="xl">
				<Toolbar />
			</Container>
			<Outlet />
		</Container>
	);
}
