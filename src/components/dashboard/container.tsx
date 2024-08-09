import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useDraggableColumns from "./useDraggableColumns";
import RecordService, { initialRows } from "../../services/db/Records";
import { DataItem } from "../../services/db";

export default function DashboardContainer() {
  const [rows, setRows] = useState<DataItem[]>(initialRows);
  const [isLoading, setLoading] = useState(false);

  const {
    columns,
    columnVisibilityModel,
    handleResize,
    handleColumnVisibilityModelChange,
  } = useDraggableColumns();

  const fetcher = () => {
    setLoading(true);
    RecordService.getAll()
      .then((data) => {
        if (data.length) setRows(data);
        else {
          RecordService.bulkSave(initialRows);
          setRows(initialRows);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => fetcher(), []);

  const processRowUpdate = (newRow: DataItem, oldRow: DataItem) => {
    const updatedRow = { ...oldRow, ...newRow };

    RecordService.saveOne(updatedRow);

    return updatedRow;
  };

  const handleProcessRowUpdateError = (error: any) => {
    console.error(error);
  };

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DndProvider backend={HTML5Backend}>
        {isLoading ? (
          <>Loading...</>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            pagination
            slots={{ toolbar: GridToolbar }}
            columnVisibilityModel={columnVisibilityModel}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
            onColumnResize={handleResize}
            onColumnVisibilityModelChange={handleColumnVisibilityModelChange}
          />
        )}
      </DndProvider>
    </Box>
  );
}
