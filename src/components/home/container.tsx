import { Box } from "@mui/material";
import TableWrapper from "./tableWrapper";

function HomeContainer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: "20px",
      }}
    >
      <TableWrapper />
    </Box>
  );
}

export default HomeContainer;
