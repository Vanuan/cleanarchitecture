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

const TaskPlaceholder = () => (
  <div className="animate-pulse">
    <div className="h-12 bg-gray-200 rounded mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);

// Empty column state
const EmptyColumn = () => (
  <div className="flex flex-col items-center justify-center h-40 text-gray-400">
    <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
    </svg>
    <p className="text-sm">Drag items here</p>
  </div>
);


const Column = tw.div<{ $isOver?: boolean; $isActive?: boolean }>`
  flex flex-col rounded-lg shadow-md border border-gray-200 bg-white
  hover:shadow-lg transition-all duration-300
  ${({ $isOver }) => ($isOver ? "ring-2 ring-blue-500 ring-opacity-70" : "")}
  ${({ $isActive }) => ($isActive ? "bg-blue-50 bg-opacity-30" : "")}
  overflow-hidden
`;


const ColumnTitle = tw.h2`
  p-4 border-b border-gray-200 font-bold text-lg 
  bg-gradient-to-r from-blue-50 to-emerald-50
  flex items-center justify-between text-gray-800
  rounded-t-lg sticky top-0 z-10
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
    className={`
      p-4 m-2 bg-white border-l-4 border-l-blue-500 shadow-sm rounded
      ${isDragging ? 'bg-gray-100' : 'bg-white'} 
      ${isDragging ? 'opacity-80' : 'opacity-100'} 
      cursor-grab transition-all duration-200 hover:shadow-md
      transform hover:-translate-y-1 hover:scale-[1.01]
    `}
  >
    <div className="flex justify-between items-center">
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
    <Column $isOver={isOver} $isActive={isActive} ref={dropRef}>
      <ColumnTitle>{additionalProps?.title || id}</ColumnTitle>
      <div className="flex-1 p-1 min-h-[200px]">
        <div className="space-y-3">{children}</div>
        {isOver &&
            isActive &&
             (
              <div className="h-16 mt-2 border-2 border-dashed border-blue-400 rounded-lg bg-blue-50 opacity-50 transition-all duration-300" />
            )}
      </div>
    </Column>
  );
};

const TaskDragPreview: React.FC<{ item: Task }> = ({ item }) => (
  <div className="p-4 bg-white rounded-md shadow-xl border-2 border-blue-300 rotate-1 scale-105 transition-transform">
    <div className="flex items-center justify-between">
      <h4 className="font-medium text-gray-800">{item.title}</h4>
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        Moving
      </span>
    </div>
    <div className="mt-2 w-full h-1 bg-gradient-to-r from-blue-300 to-indigo-500 rounded-full animate-pulse"></div>
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
