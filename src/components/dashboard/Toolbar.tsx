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

type ToolbarProps = {
  columns: ExtendedCol[];
};

function Toolbar(_: ToolbarProps) {
  return (
    <GridToolbarContainer>
      <Box sx={{ color: (theme) => theme.palette.primary.main }}>
        <h2 style={{ paddingInlineStart: 10 }}>FMCSA Records</h2>
      </Box>
      <Box sx={{ flex: 1 }}></Box>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
      <ShareMenu />
      <GridToolbarQuickFilter variant="outlined" size="small" />
    </GridToolbarContainer>
  );
}

export default Toolbar;
