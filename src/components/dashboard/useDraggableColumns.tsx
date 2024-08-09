import { GridColDef } from "@mui/x-data-grid";
import { useCallback, useState } from "react";
import update from "immutability-helper";

import { DataItem } from "../../services/db";
import DroppableColumn from "./DroppableColumn";
import DraggableColumn from "./DragableColumn";

const baseColumns = [
  {
    field: "id",
    headerName: "ID",
    editable: false,
    width: 200,
  },
  {
    field: "created_dt",
    headerName: "Creation Date",
    type: "dateTime",
    editable: true,
    width: 200,
    valueGetter: (value) => new Date(value),
  },
  {
    field: "legal_name",
    headerName: "Legal Name",
    editable: true,
    width: 200,
  },
  {
    field: "entity_type",
    headerName: "Entity Type",
    editable: true,
    width: 150,
  },
] satisfies GridColDef<DataItem>[];

function useDraggableColumns() {
  const [columns, setColumns] = useState(baseColumns);
  const [dragIndex, setDragIndex] = useState(-1);

  const moveColumn = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const draggedColumn = columns[dragIndex];
      setColumns(
        update(columns, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, draggedColumn],
          ],
        })
      );
    },
    [columns]
  );

  const columnsWithDraggableHeaders = columns.map(
    (column, index) =>
      ({
        ...column,
        renderHeader: (params) => (
          <DroppableColumn
            dragIndex={dragIndex}
            onDrop={() => moveColumn(dragIndex, index)}
          >
            <DraggableColumn
              column={params.colDef}
              index={index}
              moveColumn={moveColumn}
              onDragStart={() => setDragIndex(index)}
            />
          </DroppableColumn>
        ),
      } satisfies GridColDef<DataItem>)
  );

  function handleResize({
    colDef,
    width,
  }: {
    colDef: GridColDef<DataItem>;
    width: number;
  }) {
    setColumns((prev) =>
      prev.map((col) => (col.field === colDef.field ? { ...col, width } : col))
    );
  }

  return {
    columns: columnsWithDraggableHeaders,
    reset: () => setColumns(baseColumns),
    handleResize,
  };
}

export default useDraggableColumns;
