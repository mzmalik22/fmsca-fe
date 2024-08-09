import { GridColDef } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import update from "immutability-helper";

import { DataItem } from "../../services/db";
import DroppableColumn from "./DroppableColumn";
import DraggableColumn from "./DragableColumn";
import ColumnService, { initialColumns } from "../../services/db/Columns";

import _ from "lodash";

function useDraggableColumns() {
  const [columns, setColumns] =
    useState<GridColDef<DataItem>[]>(initialColumns);
  const [dragIndex, setDragIndex] = useState(-1);

  const fetcher = () => {
    ColumnService.getAll().then((data) => {
      if (data.length === 0) {
        ColumnService.bulkSave(initialColumns);
        setColumns(initialColumns);
      } else formatColumns(data);
    });
  };

  function formatColumns(
    rawCols: { field: string; width: number; order: number }[]
  ) {
    setColumns(
      rawCols
        .sort((a, b) => a.order - b.order)
        .map((rawCol) => {
          const col = initialColumns.find((c) => c.field === rawCol.field);
          if (col) return { ...col, ...rawCol };
          return { ...rawCol };
        })
    );
  }

  useEffect(() => fetcher(), []);

  const moveColumn = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const draggedColumn = columns[dragIndex];
      const updatedCols = update(columns, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedColumn],
        ],
      });
      setColumns(updatedCols);

      ColumnService.bulkSave(updatedCols);
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
    ColumnService.updateColWidth(colDef.field, width);

    setColumns((prev) =>
      prev.map((col) => (col.field === colDef.field ? { ...col, width } : col))
    );
  }

  function handleReset() {
    setColumns(initialColumns);
    ColumnService.bulkSave(initialColumns);
  }

  return {
    columns: columnsWithDraggableHeaders,
    reset: handleReset,
    handleResize,
  };
}

export default useDraggableColumns;
