import { useSpring, animated } from '@react-spring/web';
import { useEffect } from 'react';
import { GripVertical, Circle, Clock } from 'lucide-react';
import React from 'react';
import { DraggableComponentProps, BaseItem } from "./DndContainer";

interface TaskItem extends BaseItem {
  completed: boolean;
  content?: string;
  status?: "idle" | "pending" | "error" | undefined;
  [key: string]: any;
}

type TaskCardProps = DraggableComponentProps<TaskItem, {
  onEdit?: (item: TaskItem) => void;
  renderItem?: (item: TaskItem) => React.ReactNode;
}>;

const getColumnId = (item: TaskItem): string => {
  return item.completed ? 'completed' : 'todo';
}

export const TaskCard: React.FC<TaskCardProps> = ({
  item,
  isDragging = false,
  dragHandleProps,
  additionalProps,
}) => {
  // Get a color based on the task id
  const getTheme = (item: TaskItem) => {
    const themes: Record<string, { border: string }> = {
      'todo': { border: 'border-l-blue-500' },
      'completed': { border: 'border-l-emerald-100' },
      'default': { border: 'border-l-gray-100' }
    };
    const columnId = getColumnId(item);
    return themes[columnId] || themes['default'];
  };

  const isPendingPhase = item.status === 'pending';
  const isErrorPhase = item.status === 'error';

  // Animation for drag state
  const [spring, api] = useSpring(() => ({
    opacity: 1,
    scale: 1,
    config: { tension: 280, friction: 24 }
  }));
  
  useEffect(() => {
    api.start({
      opacity: isDragging ? 0.2 : 1,
      scale: isDragging ? 0.98 : 1,
    });
  }, [isDragging, api]);

  // Progress indicator animation
  const [progressProps, progressApi] = useSpring(() => ({
    width: '0%',
    config: { duration: 800 }
  }));

  useEffect(() => {
    progressApi.start({
      width: isPendingPhase ? '100%' : '0%',
    });
  }, [isPendingPhase, progressApi]);

  // Create animated div component
  const AnimatedDiv = animated('div');
  
  return (
      <AnimatedDiv 
        className="mb-3"
        style={{
          opacity: spring.opacity,
          transform: spring.scale.to(s => `scale(${s})`)
        }}
      >
      <div 
        className={`
          rounded-lg
          bg-white
          ${getTheme(item).border} border-l-4
          transition-all duration-200 hover:shadow-md
          relative
          flex items-stretch
          cursor-pointer
        `} 
        style={{
          boxShadow: `0 2px 4px rgba(0, 0, 0, 0.05)`,
          touchAction: 'none'
        }}
        onClick={() => additionalProps?.onEdit?.(item)}
      >
        {/* Grip Handle - Full height and visually separated */}
        <div 
          {...dragHandleProps}
          className="
            cursor-grab 
            transition-colors 
            duration-200 
            text-gray-400 
            hover:text-gray-600 
            touch-manipulation 
            flex-shrink-0
            flex 
            items-center 
            justify-center
            px-2
            border-r 
            border-gray-100
            hover:bg-gray-100
          "
          role="button"
          tabIndex={0}
          aria-roledescription="draggable"
          aria-label="Drag to another column"
          style={{ zIndex: 10, touchAction: 'none' }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <GripVertical className="w-5 h-5" />
        </div>
        
        <div className="flex-1 flex items-start p-4">
          {additionalProps?.renderItem ? (
            additionalProps.renderItem(item)
          ) : (
            <div className="w-full">
              <div className="flex items-start gap-3">
                <button 
                  className="mt-1 transition-colors text-gray-400 hover:text-blue-500" 
                  aria-label="Mark as complete"
                >
                  <span className="h-5 w-5">
                    <Circle className="text-gray-400 hover:text-blue-500" />
                  </span>
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 font-medium">{item.content}</h3>
                  {item.dueDate && (
                    <div className="flex items-center gap-2 flex-wrap mt-2">
                      <span className="text-xs px-2 py-1 rounded-full flex items-center gap-1 border bg-gray-100 text-gray-600 border-gray-200">
                        <span className="h-4 w-4 mr-0.5">
                          <Clock className="h-full w-full" />
                        </span>
                        {item.dueDate}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {isPendingPhase && (
          <span className="absolute top-2 right-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Moving...
          </span>
        )}
        {isErrorPhase && (
          <span className="absolute top-2 right-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Error
          </span>
        )}
      </div>
      
      {isPendingPhase && (
        <div className="mt-1 h-1 bg-blue-400 rounded-full" style={{ 
          width: progressProps.width.get() 
        }} />
      )}
      </AnimatedDiv>
  );
};
