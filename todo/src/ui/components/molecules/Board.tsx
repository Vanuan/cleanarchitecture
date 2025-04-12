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


// Main component
function TaskBoard<T extends Task>({ renderItem, items, columns, onItemUpdate, onItemEdit }) {
  const boardColumns = columns.map(c => c.id);
  
  // Function to find the column for an item
  const getColumnId = (item) => {
    const column = columns.find(c => c.filter(item));
    return column?.id || columns[0]?.id || '';
  };

  // Additional props for components
  const getTaskCardProps = () => ({ 
    renderItem,
    // Make sure we provide any needed props for task rendering
    itemProps: { 
      className: "w-full" 
    },
    onEdit: onItemEdit,
  });

  const getColumnProps = (columnId) => ({
    title: columnId
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" "),
    // Add extra props for column setup
    columnClassName: "h-full"
  });

  const handleSetColumnId = async (item, columnId) => {
    // Mark item as pending during update
    const pendingItem = { ...item, status: 'pending' };
    
    try {
      let updatedItem = { ...item };
      if (onItemUpdate) {
        updatedItem = await onItemUpdate(item.id, columnId);
      }
      return { ...updatedItem, status: undefined }; // Clear status after successful update
    } catch (err) {
      console.error("Error updating item:", err);
      return { ...item, status: 'error' }; // Mark as error if update fails
    }
  };

  return (
    <DndContainer
      items={items}
      columns={boardColumns}
      getColumnId={getColumnId}
      setColumnId={handleSetColumnId}
      draggableComponent={TaskCard}
      droppableComponent={TaskColumn}
      dragOverlayComponent={TaskDragPreview}
      containerComponent={GridView}
      getDraggableProps={getTaskCardProps}
      getDroppableProps={getColumnProps}
    />
  );
}

export function Board<T extends Task>({
  items,
  columns,
  onItemUpdate,
  renderItem,
  onItemEdit,
}: BoardProps<T>) {
  return (
    <TaskBoard
      columns={columns}
      renderItem={(item) => renderItem(item)}
      items={items}
      onItemUpdate={onItemUpdate}
      onItemEdit={onItemEdit}
    />
  );
}