import { Box } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { ExtendedCol } from "../../services/db/Columns";
import ResetAction from "./ResetAction";

type ToolbarProps = {
  columns: ExtendedCol[];
};

function Toolbar(_: ToolbarProps) {
  return (
    <GridToolbarContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
          padding: "10px 0",
        }}
      >
        <Box
          sx={{
            color: (theme) => theme.palette.primary.main,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "0 10px",
          }}
        >
          <h2>FMCSA Records</h2>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 2.5,
            padding: "0 10px",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarExport />
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            {/* <ShareMenu /> */}
            <ResetAction />
          </Box>
        </Box>
      </Box>
    </GridToolbarContainer>
  );
}

export default Toolbar;
