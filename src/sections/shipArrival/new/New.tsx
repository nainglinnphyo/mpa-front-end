import { Button } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import Iconify from "../../../components/iconify";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const New = () => {
  return (
    <Container>
      <CustomBreadcrumbs
        heading="Create New Ship Arrival"
        links={[
          { name: "Dashboard", href: "./dashboard" },
          { name: "Ship Arrival", href: "/dashboard/ship-arrival" },
          { name: "List" },
        ]}
      />
    </Container>
  );
};

export default New;
