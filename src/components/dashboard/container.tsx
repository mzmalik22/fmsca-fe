import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { DataItem, getData, initialRows, saveData } from "../../services/db";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useDraggableColumns from "./useDraggableColumns";

export default function DashboardContainer() {
  const [rows, setRows] = useState<DataItem[]>([]);

  const { columns, handleResize } = useDraggableColumns();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setRows(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (rows.length > 0) saveData(rows);
  }, [rows]);

  const processRowUpdate = (newRow: DataItem, oldRow: DataItem) => {
    const updatedRow = { ...oldRow, ...newRow };

    setRows((prev) =>
      prev.map((row) => (row.id === oldRow.id ? updatedRow : row))
    );

    return updatedRow;
  };

  const handleProcessRowUpdateError = (error: any) => {
    console.error(error);
  };

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DndProvider backend={HTML5Backend}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          onColumnResize={handleResize}
        />
      </DndProvider>
    </Box>
  );
}
