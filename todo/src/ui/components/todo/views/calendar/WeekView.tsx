import React from "react";
import {
  format,
  isToday,
  isTomorrow,
  isYesterday,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addWeeks,
  subWeeks,
  getWeek,
} from "date-fns";
import { useCalendarNavigation, useTodosForDate } from "../calendar-hooks";
import { TodoViewModel } from "../../../../viewmodels/TodoViewModel";
import { EntityViewType } from "../../../organisms/EntityView";
import { serializeDate } from "../../../../../lib/utils/date";

interface WeekViewProps {
  todos: TodoViewModel[];
  renderItem: (todo: TodoViewModel) => React.ReactNode;
  onAddItem?: ({
    dueDate,
    isAllDay,
  }: {
    dueDate?: string;
    isAllDay?: boolean;
  }) => void;
}

const WeekView: React.FC<WeekViewProps> = ({
  todos,
  renderItem,
  onAddItem,
}) => {
  const { currentDate, setCurrentDate } = useCalendarNavigation();

  // Calculate the week range
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  // Get week number and date range for display
  const weekNumber = getWeek(currentDate);
  const weekRangeText = `${format(weekStart, "MMM d")}-${format(weekEnd, "d, yyyy")}`;

  // Previous and next week navigation
  const prevWeekStart = subWeeks(weekStart, 1);
  const nextWeekStart = addWeeks(weekStart, 1);
  const prevWeekNumber = getWeek(prevWeekStart);
  const nextWeekNumber = getWeek(nextWeekStart);

  const handlePrevWeek = () => {
    setCurrentDate(prevWeekStart);
  };

  const handleNextWeek = () => {
    setCurrentDate(nextWeekStart);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Week Navigation - Specific to Week View */}
      <div className="grid grid-cols-3 bg-white border-b border-gray-200">
        <button
          onClick={handlePrevWeek}
          className="flex flex-col items-center py-4 hover:bg-gray-50 border-r border-gray-200"
        >
          <span className="text-sm text-gray-500">Previous</span>
          <span className="text-base font-medium">Week {prevWeekNumber}</span>
          <span className="text-sm text-gray-500">
            {format(prevWeekStart, "MMM d")}-
            {format(endOfWeek(prevWeekStart, { weekStartsOn: 1 }), "d")}
          </span>
        </button>
        <div className="flex flex-col items-center justify-center py-4 bg-blue-50">
          <span className="text-sm text-blue-600">Current</span>
          <span className="text-base font-semibold text-blue-700">
            Week {weekNumber}
          </span>
          <span className="text-sm text-blue-600">{weekRangeText}</span>
        </div>
        <button
          onClick={handleNextWeek}
          className="flex flex-col items-center py-4 hover:bg-gray-50 border-l border-gray-200"
        >
          <span className="text-sm text-gray-500">Next</span>
          <span className="text-base font-medium">Week {nextWeekNumber}</span>
          <span className="text-sm text-gray-500">
            {format(nextWeekStart, "MMM d")}-
            {format(endOfWeek(nextWeekStart, { weekStartsOn: 1 }), "d")}
          </span>
        </button>
      </div>

      {/* Scrollable Week Agenda */}
      <div className="flex-1 overflow-y-auto">
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
      </div>
    </div>
  );
};

interface DaySectionProps {
  day: Date;
  todos: TodoViewModel[];
  renderItem: (
    todo: TodoViewModel,
    viewType: EntityViewType,
  ) => React.ReactNode;
  onAddItem?: ({
    dueDate,
    isAllDay,
  }: {
    dueDate: string;
    isAllDay?: boolean;
  }) => void;
}

const DaySection: React.FC<DaySectionProps> = ({
  day,
  todos,
  renderItem,
  onAddItem,
}) => {
  const dayTodos = useTodosForDate(day, todos);
  const isDayToday = isToday(day);
  const isDayTomorrow = isTomorrow(day);
  const isDayYesterday = isYesterday(day);

  // Determine background color based on day status
  const bgColor = isDayToday
    ? "bg-blue-50"
    : dayTodos.length === 0
      ? "bg-gray-50"
      : "";

  const handleAddItem = () => {
    if (onAddItem) {
      // In week view, default to all-day tasks
      onAddItem({ dueDate: serializeDate(day), isAllDay: true });
    }
  };

  return (
    <div className={bgColor}>
      {/* Day header */}
      <div className="p-3 font-medium flex items-center">
        <span className={`text-lg ${isDayToday ? "text-blue-700" : ""}`}>
          {format(day, "EEEE")}
        </span>
        <span
          className={`text-sm ${isDayToday ? "text-blue-600" : "text-gray-500"} ml-2`}
        >
          {format(day, "MMMM d, yyyy")}
        </span>

        {isDayToday && (
          <span className="ml-2 text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded">
            Today
          </span>
        )}
        {isDayTomorrow && (
          <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
            Tomorrow
          </span>
        )}
        {isDayYesterday && (
          <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
            Yesterday
          </span>
        )}
      </div>

      {/* Day content */}
      {dayTodos.length > 0 ? (
        <div className="p-4">
          {dayTodos.map((todo) => (
            <div
              key={todo.id}
              className={`bg-white rounded-lg p-3 border border-gray-200 mb-3 ${
                todo.completed ? "bg-gray-50" : ""
              }`}
            >
              {renderItem(todo, "week")}
            </div>
          ))}

          {onAddItem && (
            <button
              onClick={handleAddItem}
              className="w-full mt-1 py-2 border border-dashed border-gray-300 rounded-lg text-blue-500 flex items-center justify-center hover:bg-blue-50"
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
      ) : (
        <div className="p-6 text-center text-gray-500">
          <p>No tasks scheduled</p>
          {onAddItem && (
            <button
              onClick={handleAddItem}
              className="mt-2 text-blue-500 flex items-center justify-center mx-auto hover:text-blue-700"
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

export default WeekView;
