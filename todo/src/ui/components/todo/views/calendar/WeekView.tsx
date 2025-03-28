import React from "react";
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
} from "date-fns";
import { useCalendarNavigation, useTodosForDate } from "../calendar-hooks";
import { TodoViewModel } from "../../../../viewmodels/TodoViewModel";

interface WeekViewProps {
  todos: TodoViewModel[];
  renderItem: (todo: TodoViewModel, viewType: string) => React.ReactNode;
}

const WeekView: React.FC<WeekViewProps> = ({ todos, renderItem }) => {
  const { currentDate } = useCalendarNavigation();

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return (
    <div className="grid grid-cols-7">
      {days.map((day) => {
        const isToday = isSameDay(day, new Date());

        return (
          <WeekViewDay
            key={day.toISOString()}
            day={day}
            todos={todos}
            renderItem={renderItem}
            isToday={isToday}
          />
        );
      })}
    </div>
  );
};

interface WeekViewDayProps {
  day: Date;
  todos: TodoViewModel[];
  renderItem: (todo: TodoViewModel, viewType: string) => React.ReactNode;
  isToday: boolean;
  onAddItem?: (date: Date) => void;
}

const WeekViewDay: React.FC<WeekViewDayProps> = ({
  day,
  todos,
  renderItem,
  isToday,
  onAddItem,
}) => {
  const dayTodos = useTodosForDate(day, todos);
  const dayHasTodos = dayTodos.length > 0;

  return (
    <div
      className={`
        border border-gray-200 p-2 min-h-[150px] relative
        ${isToday ? "ring-2 ring-blue-500 ring-inset" : ""}
        ${dayHasTodos ? "" : "hover:bg-gray-50"}
        group transition-colors duration-150
      `}
      tabIndex={0}
      role="gridcell"
      aria-selected={isToday}
    >
      <div className="flex justify-between items-center mb-2">
        <div
          className={`text-sm font-medium ${isToday ? "text-blue-600" : "text-gray-700"}`}
        >
          {format(day, "EEE, MMM d")}
        </div>

        {onAddItem && (
          <button
            onClick={() => onAddItem(day)}
            className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50"
            aria-label={`Add task for ${format(day, "MMMM d")}`}
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
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        )}
      </div>

      {dayTodos.length > 0 ? (
        <div className="mt-2 space-y-1 max-h-[110px] overflow-y-auto scrollbar-thin">
          {dayTodos.map((todo) => (
            <React.Fragment key={todo.id}>
              {renderItem(todo, "week")}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-xs text-gray-400 py-8">
          <p>No tasks</p>
        </div>
      )}
    </div>
  );
};

export default WeekView;
