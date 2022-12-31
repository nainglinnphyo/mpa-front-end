import React from "react";
import ReactLoading from "react-loading";

//components
import { Box } from "@mui/system";
const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <ReactLoading type={"spokes"} color={"#00AB55"} height={80} width={80} />
    </Box>
  );
};

export default Loading;
