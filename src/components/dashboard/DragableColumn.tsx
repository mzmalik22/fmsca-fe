import { GridStateColDef } from "@mui/x-data-grid/internals";
import { useDrag, useDrop } from "react-dnd";
import { DataItem } from "../../services/db";

const ItemType = "COLUMN";

type DraggableColumnProps = {
  column: GridStateColDef<DataItem, any, any>;
  index: number;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
  onDragStart: () => void;
};

function DraggableColumn(props: DraggableColumnProps) {
  const { column, index, moveColumn, onDragStart } = props;

  useDrop<{ index: number }>({
    accept: ItemType,
    hover(item) {
      if (item.index !== index) {
        moveColumn(item.index, index);
        item.index = index;
      }
    },
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      onDragStart={onDragStart}
      style={{
        minWidth: column.minWidth,
        width: column.width,
        height: 100,
        cursor: "move",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        opacity: isDragging ? 0.5 : 1,
        paddingInlineStart: 5,
      }}
    >
      {column.headerName}
    </div>
  );
}

export default DraggableColumn;
