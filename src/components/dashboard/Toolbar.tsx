import { Box } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import ShareMenu from "./ShareMenu";
import { ExtendedCol } from "../../services/db/Columns";
import ImportAction from "./ImportAction";

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
          <GridToolbarQuickFilter variant="outlined" size="small" />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 2.5,
            padding: "0 10px",
          }}
        >
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <ImportAction />
          <GridToolbarExport />
          <ShareMenu />
        </Box>
      </Box>
    </GridToolbarContainer>
  );
}

export default Toolbar;
