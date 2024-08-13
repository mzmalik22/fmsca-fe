import { useState, useEffect, useCallback } from "react";
import {
  DataGrid,
  GridFilterState,
  GridState,
  useGridApiRef,
} from "@mui/x-data-grid";
import { Box, Card, CircularProgress } from "@mui/material";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useDraggableColumns from "./useDraggableColumns";
import RecordService from "../../services/db/Records";
import { DataItem } from "../../services/db";
import Toolbar from "./Toolbar";
import ColumnService, { RawCol } from "../../services/db/Columns";
import TokenService from "../../services/token";
import UpdateColumnsDialog from "./UpdateColumnsDialog";
import BarChart from "./BarChart";
import { useRecords } from "../../context/Record.context";
import { debounce } from "../../utils";
import ImportAction from "./ImportAction";
import ShareMenu from "./ShareMenu";

function getKeysFromLookup(obj: GridFilterState["filteredRowsLookup"]) {
  const keys = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key]) {
      keys.push(key);
    }
  }
  return keys;
}

function DashboardContainer() {
  const [updateData, setUpdateData] = useState<RawCol[]>([]);
  const [isOpenUpdateDialog, setOpenUpdateDialog] = useState(false);

  const { isLoading, records } = useRecords();
  const [filteredRecords, setFilteredRecords] = useState<DataItem[]>([]);

  useEffect(() => setFilteredRecords(records), [records]);

  const apiRef = useGridApiRef();

  const {
    columns,
    columnVisibilityModel,
    refresh,
    handleResize,
    handleColumnVisibilityModelChange,
  } = useDraggableColumns();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("layout");

    if (token) {
      const data = TokenService.decode(token);
      if (data) {
        setUpdateData(data);
        setOpenUpdateDialog(true);
      }
    } else refresh();
  }, []);

  function ignoreUpdate() {
    window.location.replace(window.location.pathname);
  }
  const updateColumns = () => ColumnService.removeAllAndSave(updateData);

  const processRowUpdate = (newRow: DataItem, oldRow: DataItem) => {
    const updatedRow = { ...oldRow, ...newRow };

    RecordService.saveOne(updatedRow);

    return updatedRow;
  };

  const handleProcessRowUpdateError = (error: any) => {
    console.error(error);
  };

  const refreshChartData = debounce(
    (records: DataItem[]) => setFilteredRecords(records),
    2000
  );

  const handleStateChange = useCallback(
    (state: GridState) => {
      const filteredKeys = getKeysFromLookup(state.filter.filteredRowsLookup);
      const rows = filteredKeys.map((key) => apiRef.current.getRow(key));
      refreshChartData(rows);
    },
    [apiRef]
  );

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
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          mb: 1,
          gap: 1,
        }}
      >
        <ImportAction variant="contained" />
        <ShareMenu />
      </Box>

      <Box sx={{ width: "100%" }}>
        <Card sx={{ height: 600, width: "100%", marginBottom: 5 }}>
          <DndProvider backend={HTML5Backend}>
            {isLoading ? (
              <Box
                sx={{
                  minHeight: 300,
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <CircularProgress />
                <h3>Fetching Records</h3>
              </Box>
            ) : (
              <DataGrid
                apiRef={apiRef}
                rows={records}
                columns={columns}
                pagination
                columnVisibilityModel={columnVisibilityModel}
                density="compact"
                slots={{
                  toolbar: (...props) => (
                    <Toolbar columns={columns} {...props} />
                  ),
                }}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                onColumnResize={handleResize}
                onColumnVisibilityModelChange={
                  handleColumnVisibilityModelChange
                }
                onStateChange={handleStateChange}
              />
            )}
          </DndProvider>

          <UpdateColumnsDialog
            isOpen={isOpenUpdateDialog}
            handleClose={() => setOpenUpdateDialog(false)}
            ignoreUpdate={ignoreUpdate}
            updateColumns={updateColumns}
          />
        </Card>

        <Card>
          <BarChart data={filteredRecords} />
        </Card>
      </Box>
    </Box>
  );
}

export default DashboardContainer;
