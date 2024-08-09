import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import update from "immutability-helper";

import { DataItem } from "../../services/db";
import DroppableColumn from "./DroppableColumn";
import DraggableColumn from "./DragableColumn";
import ColumnService, {
  ExtendedCol,
  initialColumns,
  RawCol,
} from "../../services/db/Columns";

function useDraggableColumns() {
  const [columns, setColumns] = useState<ExtendedCol[]>(initialColumns);
  const [dragIndex, setDragIndex] = useState(-1);

  const refresh = () => {
    ColumnService.getAll().then((data) => {
      if (data.length === 0) {
        ColumnService.bulkSave(initialColumns);
        setColumns(initialColumns);
      } else formatColumns(data);
    });
  };

  function formatColumns(rawCols: RawCol[]) {
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
    ColumnService.updateCol(colDef.field, { width });

    setColumns((prev) =>
      prev.map((col) => (col.field === colDef.field ? { ...col, width } : col))
    );
  }

  function handleColumnVisibilityModelChange(model: GridColumnVisibilityModel) {
    setColumns((prev) => {
      const updated = prev.map((item) => ({
        ...item,
        visible: model[item.field] ?? true,
      }));

      ColumnService.bulkSave(updated);

      return updated;
    });
  }

  function reset() {
    setColumns(initialColumns);
    ColumnService.bulkSave(initialColumns);
  }

  const columnVisibilityModel = useMemo(
    () =>
      columns
        .filter((col) => !col.visible)
        .reduce((prev, col) => {
          const x = prev;
          x[col.field] = col.visible;
          return x;
        }, {} as GridColumnVisibilityModel),
    [columns]
  );

  return {
    columns: columnsWithDraggableHeaders,
    columnVisibilityModel,
    refresh,
    reset,
    handleResize,
    handleColumnVisibilityModelChange,
  };
}

export default useDraggableColumns;
