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

// Enhanced TaskCard with better drag animation handling
const TaskCard: React.FC<DraggableComponentProps<Task, TaskCardProps>> = ({
  item,
  isDragging,
  dragHandleProps,
  additionalProps,
}) => {
  // Get a color based on the task id to make them more visually distinct
  const getRandomColor = (id: string) => {
    const colors = [
      'border-l-blue-500',
      'border-l-green-500',
      'border-l-yellow-500',
      'border-l-red-500',
      'border-l-purple-500',
      'border-l-pink-500',
      'border-l-indigo-500',
    ];
    
    // Simple hash function to get consistent color for the same ID
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div
      {...dragHandleProps}
      className={`
        p-4 m-2 bg-white ${getRandomColor(item.id)} border-l-4 shadow-sm rounded
        ${isDragging ? 'bg-blue-50 scale-105' : 'bg-white hover:-translate-y-1 hover:scale-[1.01]'} 
        ${isDragging ? 'opacity-50' : 'opacity-100'} 
        cursor-grab transition-all duration-300 ease-in-out hover:shadow-md
        transform will-change-transform
      `}
      style={{
        // Apply some subtle spring-like animation
        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      <div className="flex justify-between items-center">
        {additionalProps?.renderItem(item)}
      </div>
      
      {/* Add a subtle indicator to show the item is draggable */}
      <div className="flex justify-end mt-2 text-gray-300">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
        </svg>
      </div>
    </div>
  );
};

// Enhanced TaskColumn with column-specific styling and improved drop indicators
const TaskColumn: React.FC<DroppableComponentProps<ColumnProps>> = ({
  id,
  isActive,
  isOver,
  children,
  additionalProps,
  dropRef,
}) => {
  // Get column color theme based on ID
  const getColumnTheme = (columnId: string) => {
    const themes = {
      'todo': { border: 'border-l-blue-500', bg: 'from-blue-100 to-indigo-50', count: 'bg-blue-500' },
      'in-progress': { border: 'border-l-amber-500', bg: 'from-amber-100 to-yellow-50', count: 'bg-amber-500' },
      'review': { border: 'border-l-purple-500', bg: 'from-purple-100 to-pink-50', count: 'bg-purple-500' },
      'done': { border: 'border-l-emerald-500', bg: 'from-emerald-100 to-green-50', count: 'bg-emerald-500' },
    };
    
    // Default theme if column ID doesn't match
    const defaultTheme = { border: 'border-l-gray-500', bg: 'from-gray-100 to-gray-50', count: 'bg-gray-500' };
    return themes[columnId as keyof typeof themes] || defaultTheme;
  };

  const theme = getColumnTheme(id.toString());
  const childrenCount = React.Children.count(children);
  
  return (
    <Column 
      $isOver={isOver} 
      $isActive={isActive} 
      ref={dropRef}
      className={isOver ? 'scale-[1.02] shadow-lg' : ''}
    >
      <ColumnTitle className={`bg-gradient-to-r ${theme.bg}`}>
        <span>{additionalProps?.title || id}</span>
        <span className={`${theme.count} text-white text-xs font-medium px-2.5 py-1 rounded-full transition-all`}>
          {childrenCount}
        </span>
      </ColumnTitle>
      <div className={`flex-1 p-2 min-h-[200px] transition-all duration-300 ${isOver ? 'bg-blue-50 bg-opacity-30' : ''}`}>
        <div className="space-y-3 transition-transform duration-300">
          {children}
        </div>
        
        {/* Enhanced drop indicator that transitions smoothly */}
        {isOver && isActive && (
          <div className="mt-2 rounded-lg transition-all duration-300 animate-pulse">
            <div className="h-16 border-2 border-dashed border-blue-400 rounded-lg bg-blue-50 bg-opacity-70 flex items-center justify-center">
              <div className="text-sm text-blue-500 font-medium flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
                Drop here
              </div>
            </div>
          </div>
        )}
        
        {/* Show empty state when no tasks */}
        {!isOver && childrenCount === 0 && (
          <EmptyColumn />
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
  onItemUpdate?: (id: string, columnId: string) => Promise<T>;
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

  const handleSetColumnId = async (item: Task, columnId: string) => {
    const updatedItem = { ...item };
    if (onItemUpdate) {
      await onItemUpdate(item.id, columnId);
    }
    return updatedItem;
  };

  return (
      <DndContainer<Task, TaskCardProps, ColumnProps>
        items={items}
        columns={boardColumns}
        getColumnId={getColumnId}
        setColumnId={handleSetColumnId as (item: Task, columnId: string) => Promise<Task>}
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
