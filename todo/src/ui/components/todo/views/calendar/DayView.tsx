import React, { useState, useEffect, useMemo } from "react";
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
  isToday,
  isTomorrow,
  isYesterday,
  parseISO,
  setHours,
} from "date-fns";
import { useCalendarNavigation, useTodosForDate } from "../calendar-hooks";
import { TodoViewModel } from "../../../../viewmodels/TodoViewModel";
import {
  cloneDate,
  parseDateString,
  serializeDate,
} from "../../../../../lib/utils/date";
import { EntityViewType } from "../../../organisms/EntityView";

interface DayViewProps {
  todos: TodoViewModel[];
  renderItem: (
    todo: TodoViewModel,
    viewType: EntityViewType,
  ) => React.ReactNode;
  onAddItem?: ({
    dueDate,
    isAllDay,
  }: {
    dueDate?: string;
    isAllDay?: boolean;
  }) => void;
}

// Constants for time display
const START_HOUR = 6; // 6 AM
const END_HOUR = 19; // 7 PM

const DayView: React.FC<DayViewProps> = ({ todos, renderItem, onAddItem }) => {
  const { currentDate } = useCalendarNavigation();

  // Calculate the date range for the week
  const weekStart = useMemo(() => {
    return startOfWeek(currentDate, { weekStartsOn: 1 });
  }, [currentDate]);

  const weekEnd = useMemo(() => {
    return endOfWeek(currentDate, { weekStartsOn: 1 });
  }, [currentDate]);

  const weekDays = useMemo(() => {
    return eachDayOfInterval({ start: weekStart, end: weekEnd });
  }, [weekStart, weekEnd]);

  // State for selected day
  const [selectedDay, setSelectedDay] = useState<Date>(currentDate);

  // Reset selected day when the week changes
  useEffect(() => {
    const today = new Date();
    const dayInCurrentWeek = weekDays.find((day) => isSameDay(day, today));
    if (dayInCurrentWeek) {
      setSelectedDay(dayInCurrentWeek);
    } else {
      setSelectedDay(currentDate);
    }
  }, [currentDate, weekDays]);

  // Get todos for the selected day
  const todosForSelectedDay = useTodosForDate(selectedDay, todos);

  // Separate all-day tasks from time-specific tasks
  const allDayTodos = todosForSelectedDay.filter((todo) => {
    // If isAllDay flag is explicitly set, use it
    if (todo.isAllDay !== undefined) return todo.isAllDay;

    // Otherwise, use the existing logic for backward compatibility
    if (!todo.dueDate) return true;

    try {
      const date = parseISO(todo.dueDate);
      const hour = date.getHours();

      // Consider tasks as all-day if:
      // 1. They're at midnight (00:00)
      // 2. They're outside business hours
      return (
        (hour === 0 && date.getMinutes() === 0) ||
        hour < START_HOUR ||
        hour > END_HOUR
      );
    } catch (error) {
      console.error(
        "Error parsing date for all-day check:",
        error,
        todo.dueDate,
      );
      return true;
    }
  });

  const scheduledTodos = todosForSelectedDay.filter((todo) => {
    // If isAllDay flag is explicitly set, use it
    if (todo.isAllDay !== undefined) return !todo.isAllDay;

    // Otherwise, use the existing logic for backward compatibility
    if (!todo.dueDate) return false;

    try {
      const date = parseISO(todo.dueDate);
      const hour = date.getHours();

      // Only show tasks within business hours in the schedule
      return hour >= START_HOUR && hour <= END_HOUR;
    } catch (error) {
      console.error(
        "Error parsing date for scheduled check:",
        error,
        todo.dueDate,
      );
      return false;
    }
  });

  // Position todo based on time
  const getTimePosition = (todo: TodoViewModel) => {
    if (!todo.dueDate) return null;

    try {
      const startDate = parseDateString(todo.dueDate);
      if (!startDate) return null;
      const startHour = startDate.getHours();
      const startMinutes = startDate.getMinutes();

      // Only show tasks within our time range
      if (startHour < START_HOUR || startHour > END_HOUR) return null;

      // Calculate duration (default to 1 hour if endDate not provided)
      let durationMinutes = 60;
      if (todo.endDate) {
        const endDate = parseDateString(todo.endDate);
        if (!endDate) return null;
        durationMinutes =
          (endDate.getTime() - startDate.getTime()) / (1000 * 60);
      }

      return {
        hour: startHour,
        minutes: startMinutes,
        durationMinutes,
        todo,
      };
    } catch (e) {
      return null;
    }
  };

  // Handle day selection
  const handleDaySelect = (day: Date) => {
    setSelectedDay(day);
  };

  // Handle adding an all-day task
  const handleAddAllDayTask = () => {
    if (onAddItem) {
      // Create a date at midnight for all-day tasks
      const allDayDate = cloneDate(selectedDay);
      allDayDate.setHours(0, 0, 0, 0);
      onAddItem({ dueDate: serializeDate(allDayDate), isAllDay: true });
    }
  };

  // Handle adding a task at a specific time
  const handleAddTimeTask = (hour: number) => {
    if (onAddItem) {
      const dateWithTime = serializeDate(setHours(selectedDay, hour));
      onAddItem({ dueDate: dateWithTime, isAllDay: false });
    }
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Day selector */}
      <div className="grid grid-cols-7 w-full border-b border-gray-200 bg-white sticky top-0 z-10 divide-x divide-gray-100">
        {weekDays.map((day) => {
          const isDayYesterday = isYesterday(day);
          const isDayTomorrow = isTomorrow(day);
          const isDaySelected = isSameDay(day, selectedDay);
          const isDayToday = isToday(day);

          return (
            <button
              key={day.toISOString()}
              className={`flex flex-col items-center py-3 transition-colors w-full
                ${isDaySelected ? "bg-blue-100" : "hover:bg-gray-50"}`}
              onClick={() => handleDaySelect(day)}
            >
              <span
                className={`text-xs font-medium ${isDaySelected ? "text-blue-600" : "text-gray-500"}`}
              >
                {format(day, "EEE")}
              </span>
              <span
                className={`text-lg ${isDaySelected ? "font-bold text-blue-600" : ""}`}
              >
                {format(day, "d")}
              </span>
              {isDayToday && (
                <span
                  className={`text-xs ${isDaySelected ? "text-blue-600" : "text-gray-500"} font-medium mt-1`}
                >
                  Today
                </span>
              )}
              {isDayYesterday && (
                <span className="text-xs text-gray-500 mt-1">Yesterday</span>
              )}
              {isDayTomorrow && (
                <span className="text-xs text-gray-500 mt-1">Tomorrow</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* All-day tasks section */}
        <div className="bg-white mb-3 shadow-sm">
          <div className="p-3 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-medium text-gray-900">All Day Tasks</h3>
            <div className="text-xs text-gray-500 flex items-center">
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
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              Includes tasks outside business hours
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {allDayTodos.length > 0 ? (
              allDayTodos.map((todo) => (
                <div key={todo.id} className="p-3">
                  {todo.dueDate && new Date(todo.dueDate).getHours() !== 0 && (
                    <div className="text-xs text-gray-500 mb-1">
                      {format(new Date(todo.dueDate), "h:mm a")}
                    </div>
                  )}
                  {renderItem(todo, "day")}
                </div>
              ))
            ) : (
              <div className="p-3 text-gray-500 text-center">
                No all-day tasks
              </div>
            )}

            {onAddItem && (
              <div className="p-3">
                <button
                  onClick={handleAddAllDayTask}
                  className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-blue-500 flex items-center justify-center"
                >
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
                    className="h-4 w-4 mr-1"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                  Add all-day task
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Schedule section */}
        <div className="bg-white shadow-sm">
          <div className="p-3 border-b border-gray-200">
            <h3 className="font-medium text-gray-900">Schedule</h3>
          </div>

          <div className="relative">
            {Array.from(
              { length: END_HOUR - START_HOUR + 1 },
              (_, i) => START_HOUR + i,
            ).map((hour) => {
              const hourTodos = scheduledTodos.filter((todo) => {
                const position = getTimePosition(todo);
                return position && position.hour === hour;
              });

              return (
                <div
                  key={hour}
                  className="flex border-b border-gray-100 last:border-b-0"
                >
                  <div className="w-16 py-2 px-2 text-right text-xs text-gray-500 border-r border-gray-100">
                    {hour === 12
                      ? "12 PM"
                      : hour < 12
                        ? `${hour} AM`
                        : `${hour - 12} PM`}
                  </div>

                  <div
                    className="flex-1 min-h-[70px] relative"
                    onClick={() => handleAddTimeTask(hour)}
                  >
                    {hourTodos.map((todo) => {
                      const position = getTimePosition(todo);
                      if (!position) {
                        // all day event?
                        return <></>;
                      }
                      return (
                        <div
                          key={todo.id}
                          className="absolute inset-x-2 rounded-md p-2 overflow-hidden hover:bg-blue-200 transition-colors border-l-4 border-blue-500"
                          style={{
                            top: `${(position.minutes / 60) * 70}px`,
                            height: `${Math.max(30, (position.durationMinutes / 60) * 70)}px`,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <div className="font-medium text-sm">
                            {todo.title}
                          </div>
                          {todo.dueDate && (
                            <div className="flex items-center text-xs text-gray-600 mt-1">
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
                                className="h-3 w-3 mr-1"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                              </svg>
                              {format(new Date(todo.dueDate), "h:mm a")}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            {isToday(selectedDay) && (
              <div
                className="absolute left-16 right-0 border-t-2 border-red-500 z-20"
                style={{
                  top: `${
                    Math.max(0, (currentTime.getHours() - START_HOUR) * 70) +
                    (currentTime.getMinutes() / 60) * 70
                  }px`,
                }}
              >
                <div className="w-2 h-2 rounded-full bg-red-500 -mt-1 -ml-1"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayView;
