import { Box, Button } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import Iconify from "../../../components/iconify";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import NewShipArrivalForm from "./NewShipArrivalForm";

const New = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ width: "100%", display: "flex", justifyContent: "end"}}>
        {/* <CustomBreadcrumbs
        heading="Create New Ship Arrival"
        links={[
          { name: "Dashboard", href: "./dashboard" },
          { name: "Ship Arrival", href: "/dashboard/ship-arrival" },
          { name: "List" },
        ]}
      /> */}
        <NewShipArrivalForm />
      </Box>
    </Container>
  );
};

export default New;
