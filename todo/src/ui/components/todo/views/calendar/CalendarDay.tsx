import { TodoViewModel } from "../../../../viewmodels/TodoViewModel";
import { format } from "date-fns";
import React from "react";
import { PlusIcon } from "lucide-react"; // Assumes using lucide-react for icons

interface CalendarDayProps {
  day: {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    dayOfMonth: number;
  };
  todos: TodoViewModel[];
  renderItem: (todo: TodoViewModel, viewType: string) => React.ReactNode;
  onAddItem?: (date: Date) => void; // New prop for adding items
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  todos,
  renderItem,
  onAddItem
}) => {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return format(date, "MMM dd, yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return null;
    }
  };

  const handleAddItem = () => {
    if (onAddItem) {
      onAddItem(day.date);
    }
  };

  return (
    <div
      className={`
        border border-gray-200 min-h-[120px] p-2 relative
        ${!day.isCurrentMonth ? "bg-gray-50" : "bg-white"}
        ${day.isToday ? "ring-2 ring-blue-500 ring-inset" : ""}
        transition-colors duration-150 hover:bg-gray-50
      `}
    >
      <div className="flex justify-between items-center">
        <span
          className={`
            text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center
            ${day.isToday ? "bg-blue-500 text-white" : "text-gray-700"}
            ${!day.isCurrentMonth ? "text-gray-400" : ""}
          `}
        >
          {day.dayOfMonth}
        </span>

        {/* Quick add button */}
        <button
          onClick={handleAddItem}
          className="opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100 p-1 text-gray-400 hover:text-blue-500 rounded-full hover:bg-blue-50 transition-all"
          aria-label="Add item"
        >
          <PlusIcon size={14} />
        </button>
      </div>

      <div className="mt-1 space-y-1 max-h-32 overflow-y-auto">
        {todos.length > 0 ? (
          todos.map((todo) => {
            return (
              <React.Fragment key={todo.id}>
                {todo.dueDate && (
                  <div className="text-xs text-gray-500">
                    Due: {formatDate(todo.dueDate)}
                  </div>
                )}
                {renderItem(todo, "calendar")}
              </React.Fragment>
            );
          })
        ) : (
          <div className="h-full w-full flex items-center justify-center text-xs text-gray-400 pt-4">
            {day.isCurrentMonth && <p>No tasks</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarDay;
