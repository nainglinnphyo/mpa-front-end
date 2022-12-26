import React from "react";
import { Card, Box, Grid, styled } from "@mui/material";
import COVER from "../../assets/ship-cover.jpg";
import LOGO from "../../assets/react.svg";

// section
import LoginForm from "../../sections/login/LoginForm";

function Login() {
  const LoginIllustration = styled("img")(({ theme }) => ({
    overflow: "hidden",
    objectFit: "cover",
    // width: "100%",
    height: "100%",
    backgroundColor: "#ff0000",
  }));

  const LoginIllustrationWrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(13),
    paddingRight: "0 !important",
    [theme.breakpoints.down("lg")]: {
      padding: theme.spacing(10),
    },
  }));

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid
          item
          xs={12}
          md={8}
          flex={2}
          sx={{
            backgroundImage: `url(${COVER})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <Box sx={{ position: "absolute", top: "6%", left: "3%" }}>
            <Card
              sx={{
                p: 1,
              }}
            >
              <img src={LOGO} alt="react Logo" width={50} />
            </Card>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <LoginIllustrationWrapper>
							<LoginIllustration alt="login-illustration" src={COVER} />
						</LoginIllustrationWrapper> */}
          </Box>
        </Grid>
        <Grid item xs={12} md={4} sx={{ minHeight: "100vh" }}>
          <Card sx={{ minHeight: "100vh", borderRadius: 0 }}>
            <LoginForm />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
