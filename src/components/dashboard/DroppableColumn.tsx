import { PropsWithChildren } from "react";
import { useDrop } from "react-dnd";

const ItemType = "COLUMN";

type DroppableColumnProps = {
  dragIndex: number;
  onDrop: (dragIndex: number) => void;
};

function DroppableColumn(props: PropsWithChildren<DroppableColumnProps>) {
  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: ItemType,
      drop: () => props.onDrop(props.dragIndex),
      collect: (monitor) => ({ isOver: !!monitor.isOver() }),
    }),
    [props.dragIndex]
  );

  return (
    // <div
    //   style={{
    //     position: "absolute",
    //     width: "100%",
    //     height: "100%",
    //   }}
    // >
    <div
      ref={dropRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {props.children}
      {isOver && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: 1,
            opacity: 0.5,
          }}
        />
      )}
    </div>
    // </div>
  );
}

export default DroppableColumn;
