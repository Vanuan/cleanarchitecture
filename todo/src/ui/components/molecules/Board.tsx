import React from "react";
import {
  DndContainer,
  DroppableComponentProps,
  DraggableComponentProps,
  BaseItem,
} from "./DndContainer";
import tw from "tailwind-styled-components";

const GridView = tw.div`
  grid grid-cols-1 md:grid-cols-2 gap-4 relative
`;

const Column = tw.div<{ $isOver?: boolean; $isActive?: boolean }>`
  flex flex-col rounded-lg shadow-sm border border-gray-200 bg-white
  ${({ $isOver }) => ($isOver ? "ring-2 ring-blue-500" : "")}
`;

const ColumnTitle = tw.h2`
  p-4 border-b border-gray-200 font-bold text-lg bg-gradient-to-r from-blue-50 to-emerald-50 flex items-center text-gray-800
`;

interface BoardProps<T extends Task> {
  items: T[];
  columns: {
    id: string;
    title: string;
    filter: (item: T) => boolean;
  }[];
  onItemUpdate?: (id: string, columnId: string) => void;
  renderItem: (item: T) => React.ReactNode;
}
// Define your data types
interface Task extends BaseItem {
  title: string;
}

// Define custom props for your components
interface TaskCardProps {
  renderItem: (item: Task) => React.ReactNode;
}

interface ColumnProps {
  title: string;
}

// Define your custom components (outside your main component)
const TaskCard: React.FC<DraggableComponentProps<Task, TaskCardProps>> = ({
  item,
  isDragging,
  dragHandleProps,
  additionalProps,
}) => (
  <div
    {...dragHandleProps}
    style={{
      padding: "16px",
      margin: "8px",
      backgroundColor: isDragging ? "#f5f5f5" : "#fff",
      borderLeft: `4px solid "#ccc"`,
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      cursor: "grab",
      opacity: isDragging ? 0.8 : 1,
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {additionalProps?.renderItem(item)}
    </div>
  </div>
);

const TaskColumn: React.FC<DroppableComponentProps<ColumnProps>> = ({
  id,
  isActive,
  isOver,
  children,
  additionalProps,
  dropRef,
}) => {
  return (
    <Column $isOver={isOver} $isActive={isActive} ref={dropRef} style={{}}>
      <ColumnTitle>{additionalProps?.title || id}</ColumnTitle>
      <div className="flex-1 p-1 min-h-[200px]">
        <div className="space-y-2">{children}</div>
        {isOver &&
            isActive &&
             (
              <div className="h-16 border-2 border-dashed border-blue-400 rounded-lg bg-blue-50 opacity-50" />
            )}
      </div>
    </Column>
  );
};

const TaskDragPreview: React.FC<{ item: Task }> = ({ item }) => (
  <div className="shadow-lg bg-white rounded border border-gray-200 transform scale-105"
    style={{
      padding: "16px",
      backgroundColor: "#fff",
      borderRadius: "4px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      transform: "rotate(3deg) scale(1.02)",
    }}
  >
    <h4 style={{ margin: 0 }}>{item.title}</h4>
    <span style={{ fontSize: "0.8em", color: "#666" }}>Moving...</span>
  </div>
);

// Main component using the DnD container
function TaskBoard<T>({ renderItem, items, columns, onItemUpdate } : {
  items: Task[];
  renderItem: <T extends Task>(item: T) => React.ReactNode;
  columns: {
    id: string;
    title: string;
    filter: (item: T) => boolean;
  }[];
  onItemUpdate?: (id: string, columnId: string) => void;
})  {

  const boardColumns = columns.map(c => c.id);
  // Function to filter items for each column
  const getColumnId = (item: Task): string => {
    const column = columns.find(c => c.filter(item as T));
    return column?.id || columns[0]?.id || '';
  };

  // Functions to provide additional props
  const getTaskCardProps = (): TaskCardProps => ({
    renderItem,
  });

  const getColumnProps = (columnId: string): ColumnProps => ({
    title: columnId
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" "),
  });

  const handleSetColumnId = (item: Task, columnId: string) => {
    const updatedItem = { ...item };
    if (onItemUpdate) {
      onItemUpdate(item.id, columnId);
    }
    return updatedItem;
  };

  return (
      <DndContainer<Task, TaskCardProps, ColumnProps>
        items={items}
        columns={boardColumns}
        onItemsChange={() => {}}
        getColumnId={getColumnId}
        setColumnId={handleSetColumnId as (item: Task, columnId: string) => Task}
        draggableComponent={TaskCard}
        droppableComponent={TaskColumn}
        dragOverlayComponent={TaskDragPreview}
        containerComponent={GridView}
        getDraggableProps={getTaskCardProps}
        getDroppableProps={getColumnProps}
      />
  );
};

export function Board<T extends Task>({
  items,
  columns,
  onItemUpdate,
  renderItem,
}: BoardProps<T>) {
  return (
    <TaskBoard
      columns={columns}
      renderItem={(item: Task) => renderItem(item as T)}
      items={items}
      onItemUpdate={onItemUpdate}
    />
  );
}
