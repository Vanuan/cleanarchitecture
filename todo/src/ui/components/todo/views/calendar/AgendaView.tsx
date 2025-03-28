import React from "react";
import {
  format,
  isSameDay,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";
import { useCalendarNavigation, useTodosForDate } from "../calendar-hooks";
import { TodoViewModel } from "../../../../viewmodels/TodoViewModel";

interface AgendaViewProps {
  todos: TodoViewModel[];
  renderItem: (todo: TodoViewModel, viewType: string) => React.ReactNode;
  onAddItem?: (date: Date) => void;
}

const AgendaView: React.FC<AgendaViewProps> = ({
  todos,
  renderItem,
  onAddItem,
}) => {
  const { currentDate } = useCalendarNavigation();

  // Calculate the week range
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return (
    <div className="divide-y divide-gray-200">
      {days.map((day) => (
        <DaySection
          key={day.toISOString()}
          day={day}
          todos={todos}
          renderItem={renderItem}
          onAddItem={onAddItem}
        />
      ))}
    </div>
  );
};

interface DaySectionProps {
  day: Date;
  todos: TodoViewModel[];
  renderItem: (todo: TodoViewModel, viewType: string) => React.ReactNode;
  onAddItem?: (date: Date) => void;
}

const DaySection: React.FC<DaySectionProps> = ({
  day,
  todos,
  renderItem,
  onAddItem,
}) => {
  const dayTodos = useTodosForDate(day, todos);
  const isToday = isSameDay(day, new Date());

  const handleAddItem = () => {
    if (onAddItem) {
      onAddItem(day);
    }
  };

  return (
    <div className="py-4">
      {/* Day header */}
      <div
        className={`flex items-center justify-between py-2 px-4 mb-2 rounded-lg ${
          isToday ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        <div className="flex items-center">
          <h2 className="font-medium text-lg">
            {format(day, "EEEE")}
            <span className="ml-2 text-sm opacity-90">
              {format(day, "MMMM d, yyyy")}
            </span>
          </h2>
          {isToday && (
            <span className="ml-2 text-xs bg-white text-blue-600 px-2 py-0.5 rounded-full">
              Today
            </span>
          )}
        </div>

        {onAddItem && (
          <button
            onClick={handleAddItem}
            className="p-1 rounded-full hover:bg-blue-400 text-white"
            aria-label={`Add item for ${format(day, "EEEE")}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        )}
      </div>

      {/* Day content */}
      {dayTodos.length > 0 ? (
        <div className="space-y-2 px-4">
          {dayTodos.map((todo) => (
            <div
              key={todo.id}
              className="transition-colors duration-150 hover:bg-gray-50 rounded-lg"
            >
              {renderItem(todo, "agenda")}
            </div>
          ))}
        </div>
      ) : (
        <div className="py-6 flex flex-col items-center justify-center text-center">
          <p className="text-gray-500">No tasks scheduled</p>
          {onAddItem && (
            <button
              onClick={handleAddItem}
              className="mt-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add task
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AgendaView;
