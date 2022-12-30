// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import { Box } from "@mui/material/";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import { Outlet } from "react-router-dom";
// import { Container } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const navItems = [
//   { name: "Dashboard", path: "dashboard" },
//   { name: "Country", path: "country" },
//   { name: "Shipper", path: "shipper" },
//   { name: "Ship", path: "ship" },
//   { name: "Ship Arrival", path: "ship-arrival" },
//   { name: "Port", path: "port" },
// ];

// export default function DrawerAppBar() {
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const navigate = useNavigate();

//   return (
//     <Container>
//       <AppBar component="nav">
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: "none" } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{
//               flexGrow: 1,
//               display: { xs: "none", sm: "block" },
//               textTransform: "uppercase",
//             }}
//           >
//             Vam Ship
//           </Typography>
//           <Box sx={{ display: { xs: "none", sm: "block" } }}>
//             {navItems.map((item) => (
//               <Button
//                 key={item.path}
//                 sx={{ color: "#fff" }}
//                 onClick={() =>
//                   navigate(`/dashboard/${item.path.toLowerCase()}`)
//                 }
//               >
//                 {item.name}
//               </Button>
//             ))}
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Container maxWidth="xl">
//         <Toolbar />
//       </Container>
//       <Outlet />
//     </Container>
//   );
// }

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import kyaw from "../assets/kyaw.jpg";

interface INavItems {
  name: string;
  path: string;
}

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const navItems: INavItems[] = [
  { name: "Dashboard", path: "dashboard" },
  { name: "Country", path: "country" },
  { name: "Shipper", path: "shipper" },
  { name: "Ship", path: "ship" },
  { name: "Ship Arrival", path: "ship-arrival" },
  { name: "Port", path: "port" },
];

const Layout = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              VamShip
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {navItems.map((item, key: React.Key) => (
                  <MenuItem key={key} onClick={handleCloseNavMenu}>
                    <Typography
                      onClick={() =>
                        navigate(`/dashboard/${item.path.toLowerCase()}`)
                      }
                      textAlign="center"
                    >
                      {item.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  sx={{ color: "#fff" }}
                  onClick={() =>
                    navigate(`/dashboard/${item.path.toLowerCase()}`)
                  }
                >
                  {item.name}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Kyaw Zin Thant"
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};
export default Layout;
