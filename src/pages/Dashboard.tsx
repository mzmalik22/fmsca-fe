import { Box } from "@mui/material";
import DashboardContainer from "../components/dashboard/container";

function Dashboard() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: "20px",
        color: "black",
      }}
    >
      <DashboardContainer />
    </Box>
  );
}

export default Dashboard;
