import React from "react";
import { DndContainer, BaseItem } from "./DndContainer";
import tw from "tailwind-styled-components";
import { TaskCard } from "./TaskCard";
import { TaskDragPreview } from "./TaskDragPreview";
import { TaskColumn } from "./TaskColumn";

// Main styled components
const GridView = tw.div`
  grid grid-cols-1 md:grid-cols-2 gap-4 relative
`;


// Define your data types
interface Task extends BaseItem {
  title: string;
}

// Define component props
interface BoardProps<T extends Task> {
  items: T[];
  columns: {
    id: string;
    title: string;
    filter: (item: T) => boolean;
  }[];
  onItemUpdate?: (id: string, columnId: string) => Promise<T>;
  onItemEdit?: (item: T) => void;
  renderItem: (item: T) => React.ReactNode;
}


function TaskBoard<T extends Task>({
  renderItem,
  items,
  columns,
  onItemUpdate,
  onItemEdit,
}: BoardProps<T>) {
  const boardColumns = columns.map((c) => c.id);


  // Function to find the column for an item
  const getColumnId = (item: T) => {
    const column = columns.find((c) => c.filter(item));
    return column?.id || columns[0]?.id || "";
  };

  // Additional props for components
  const getTaskCardProps = () => ({
    renderItem,
    itemProps: {
      className: "w-full",
    },
    onEdit: onItemEdit,
  });

  const getColumnProps = (columnId: string) => ({
    title: columnId
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" "),
    columnClassName: "h-full",
  });

  const handleSetColumnId = async (item: T, columnId: string): Promise<T> => {
    try {
      let updatedItem = { ...item };
      if (onItemUpdate) {
        updatedItem = await onItemUpdate(item.id, columnId);
      }
      return { ...updatedItem, status: undefined };
    } catch (err) {
      console.error("Error updating item:", err);
      return { ...item, status: "error" as const };
    }
  };

  return (
    <DndContainer<T, any, any>
      items={items}
      columns={boardColumns}
      getColumnId={getColumnId}
      setColumnId={handleSetColumnId}
      draggableComponent={TaskCard as React.ComponentType<any>}
      droppableComponent={TaskColumn as React.ComponentType<any>}
      dragOverlayComponent={TaskDragPreview as React.ComponentType<any>}
      containerComponent={GridView as React.ComponentType<any>}
      getDraggableProps={getTaskCardProps}
      getDroppableProps={getColumnProps}
    />
  );
}

export function Board<T extends Task>(props: BoardProps<T>) {
  return <TaskBoard {...props} />;
}
