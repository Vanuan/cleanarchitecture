import React, { useState, useEffect, useMemo } from "react";
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
} from "date-fns";
import { useCalendarNavigation, useTodosForDate } from "../calendar-hooks";
import { TodoViewModel } from "../../../../viewmodels/TodoViewModel";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";

interface WeekViewProps {
  todos: TodoViewModel[];
  renderItem: (todo: TodoViewModel, viewType: string) => React.ReactNode;
  onAddItem?: (date: Date) => void;
}

const WeekView: React.FC<WeekViewProps> = ({
  todos,
  renderItem,
  onAddItem,
}) => {
  const { currentDate } = useCalendarNavigation();
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detect mobile screens
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  // Calculate the date range for the week
  const weekStart = useMemo(() => {
    return startOfWeek(currentDate, { weekStartsOn: 1 });
  }, [currentDate]);
  const weekEnd = useMemo(() => {
    return endOfWeek(currentDate, { weekStartsOn: 1 });
  }, [currentDate]);

  //  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const weekDays = useMemo(() => {
    return eachDayOfInterval({ start: weekStart, end: weekEnd });
  }, [weekStart, weekEnd]);

  // Set today as the selected day if no day is selected
  useEffect(() => {
    if (!selectedDay) {
      const today = new Date();
      const dayInCurrentWeek = weekDays.find((day) => isSameDay(day, today));
      setSelectedDay(dayInCurrentWeek || weekDays[0]);
    }
  }, [selectedDay, weekDays]);

  // Reset selected day when the week changes
  useEffect(() => {
    const today = new Date();
    const dayInCurrentWeek = weekDays.find((day) => isSameDay(day, today));
    setSelectedDay(dayInCurrentWeek || weekDays[0]);
  }, [currentDate, weekDays]);

  // Handle day selection
  const handleDaySelect = (day: Date) => {
    setSelectedDay(day);
  };

  if (isMobile) {
    // Mobile view: horizontal day selector with a single day's tasks below
    return (
      <div className="flex flex-col h-full">
        {/* Day selector */}
        <div className="flex overflow-x-auto py-2 border-b border-gray-200 bg-white sticky top-0 z-10">
          {weekDays.map((day) => {
            const isToday = isSameDay(day, new Date());
            const isSelected = selectedDay
              ? isSameDay(day, selectedDay)
              : false;

            return (
              <button
                key={day.toISOString()}
                className={`
                  flex flex-col items-center min-w-[60px] py-2 px-1 mx-1 rounded-lg transition-colors
                  ${isToday ? "bg-blue-100" : isSelected ? "bg-gray-100" : "hover:bg-gray-50"}
                `}
                onClick={() => handleDaySelect(day)}
              >
                <span className="text-xs font-medium">
                  {format(day, "EEE")}
                </span>
                <span
                  className={`text-lg ${isToday ? "font-bold text-blue-600" : ""}`}
                >
                  {format(day, "d")}
                </span>
                {isToday && (
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected day's tasks */}
        {selectedDay && (
          <div className="flex-1 overflow-y-auto p-3">
            <div className="flex justify-between items-center mb-4">
              <h3
                className={`text-lg font-medium ${isSameDay(selectedDay, new Date()) ? "text-blue-600" : "text-gray-800"}`}
              >
                {format(selectedDay, "EEEE, MMMM d")}
              </h3>

              {onAddItem && (
                <button
                  onClick={() => onAddItem(selectedDay)}
                  className="p-1.5 rounded-full text-blue-500 hover:bg-blue-50"
                  aria-label={`Add task for ${format(selectedDay, "MMMM d")}`}
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

            <MobileDayContent
              day={selectedDay}
              todos={todos}
              renderItem={renderItem}
              onAddItem={onAddItem}
            />
          </div>
        )}
      </div>
    );
  }

  // Desktop view: traditional grid layout
  return (
    <div className="grid grid-cols-7">
      {weekDays.map((day) => {
        const isToday = isSameDay(day, new Date());

        return (
          <WeekViewDay
            key={day.toISOString()}
            day={day}
            todos={todos}
            renderItem={renderItem}
            isToday={isToday}
            onAddItem={onAddItem}
          />
        );
      })}
    </div>
  );
};

// Mobile day content component
interface MobileDayContentProps {
  day: Date;
  todos: TodoViewModel[];
  renderItem: (todo: TodoViewModel, viewType: string) => React.ReactNode;
  onAddItem?: (date: Date) => void;
}

const MobileDayContent: React.FC<MobileDayContentProps> = ({
  day,
  todos,
  renderItem,
  onAddItem,
}) => {
  const dayTodos = useTodosForDate(day, todos);

  if (dayTodos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10">
        <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <p className="text-gray-500 mb-4">No tasks scheduled for this day</p>
        {onAddItem && (
          <button
            onClick={() => onAddItem(day)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md text-sm"
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
              className="mr-2"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add new task
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {dayTodos.map((todo) => (
        <div
          key={todo.id}
          className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow"
        >
          {renderItem(todo, "week")}
        </div>
      ))}
    </div>
  );
};

// Desktop day component (existing code with minor improvements)
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

  const handleAddItem = () => {
    if (onAddItem) {
      onAddItem(day);
    }
  };

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
            onClick={handleAddItem}
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
