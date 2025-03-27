import { TodoViewModel } from "../../../../viewmodels/TodoViewModel";
import { format } from "date-fns";
import React from "react";

const CalendarDay: React.FC<{
  day: {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    dayOfMonth: number;
  };
  todos: TodoViewModel[];
  renderItem: (todo: TodoViewModel, viewType: string) => React.ReactNode;
}> = ({ day, todos, renderItem }) => {
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
  return (
    <div
      className={`
      border border-gray-200 min-h-[100px] p-1 relative
      ${!day.isCurrentMonth ? "bg-gray-50" : "bg-white"}
      ${day.isToday ? "ring-2 ring-blue-500 ring-inset" : ""}
    `}
    >
      <div className="text-right">
        <span
          className={`
          text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center
          ${day.isToday ? "bg-blue-500 text-white" : "text-gray-700"}
          ${!day.isCurrentMonth ? "text-gray-400" : ""}
        `}
        >
          {day.dayOfMonth}
        </span>
      </div>

      <div className="mt-1 space-y-1 max-h-24 overflow-y-auto">
        {todos.map((todo) => {
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
        })}
      </div>
    </div>
  );
};

export default CalendarDay;
