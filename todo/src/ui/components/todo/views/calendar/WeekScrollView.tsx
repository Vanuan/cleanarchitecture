import React, { useRef, useEffect } from "react";
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
  addHours,
  setHours,
  parse,
  parseISO,
} from "date-fns";
import { useCalendarNavigation, useTodosForDate } from "../calendar-hooks";
import { TodoViewModel } from "../../../../viewmodels/TodoViewModel";

interface ScrollableWeekViewProps {
  todos: TodoViewModel[];
  renderItem: (todo: TodoViewModel, viewType: string) => React.ReactNode;
  onAddItem?: (date: Date) => void;
}

// Constants for time display
const START_HOUR = 6; // 6 AM
const END_HOUR = 22; // 10 PM
const HOUR_HEIGHT = 60; // pixels per hour
const TIME_LABELS = Array.from(
  { length: END_HOUR - START_HOUR + 1 },
  (_, i) => START_HOUR + i,
);

const ScrollableWeekView: React.FC<ScrollableWeekViewProps> = ({
  todos,
  renderItem,
  onAddItem,
}) => {
  const { currentDate } = useCalendarNavigation();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Calculate the date range for the week
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start with Monday
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  // Position the scroll to current time on initial load
  useEffect(() => {
    if (scrollRef.current) {
      const now = new Date();
      const currentHour = now.getHours();

      if (currentHour >= START_HOUR && currentHour <= END_HOUR) {
        const scrollPosition =
          (currentHour - START_HOUR) * HOUR_HEIGHT +
          (now.getMinutes() / 60) * HOUR_HEIGHT;
        scrollRef.current.scrollTop = scrollPosition - 100; // Scroll to position minus some offset
      }
    }
  }, []);

  // Handle horizontal scrolling with buttons
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Extract time from ISO string and position it on the timeline
  const getTimeFromISO = (isoString: string | undefined): number | null => {
    if (!isoString) return null;

    try {
      const date = parseISO(isoString);
      return date.getHours() + date.getMinutes() / 60;
    } catch (error) {
      console.error("Error parsing date:", error);
      return null;
    }
  };

  // Position todo based on time (if available) or default position
  const positionTodo = (todo: TodoViewModel, day: Date) => {
    if (!todo.dueDate) return null;

    try {
      const todoDate = parseISO(todo.dueDate);

      if (!isSameDay(todoDate, day)) return null;

      // If we have a specific time in the dueDate, use it
      const startHour = getTimeFromISO(todo.dueDate) || 9; // Default to 9 AM if no time
      const endHour = startHour + 1; // Default 1 hour duration

      // Calculate position and height
      const top = Math.max(0, (startHour - START_HOUR) * HOUR_HEIGHT);
      const height = Math.min(
        (END_HOUR - startHour) * HOUR_HEIGHT,
        (endHour - startHour) * HOUR_HEIGHT,
      );

      return {
        top,
        height: Math.max(30, height), // Minimum height of 30px
        todo,
      };
    } catch (error) {
      console.error("Error positioning todo:", error);
      return null;
    }
  };

  // Handle click to add item at specific time
  const handleTimeSlotClick = (day: Date, hour: number) => {
    if (onAddItem) {
      // Create a new date at the specified hour
      const dateWithHour = setHours(day, hour);
      onAddItem(dateWithHour);
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Sticky header showing days */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex pl-16 pr-4">
          {days.map((day) => {
            const isToday = isSameDay(day, new Date());
            return (
              <div
                key={day.toISOString()}
                className="flex-1 min-w-[100px] p-2 text-center"
              >
                <div
                  className={`font-medium ${isToday ? "text-blue-600" : "text-gray-700"}`}
                >
                  {format(day, "EEE")}
                </div>
                <div
                  className={`text-lg ${isToday ? "bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto" : "text-gray-600"}`}
                >
                  {format(day, "d")}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll controls */}
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-1 bg-white rounded-full shadow-md border border-gray-200 text-gray-600 hover:bg-gray-50"
          aria-label="Scroll left"
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
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-1 bg-white rounded-full shadow-md border border-gray-200 text-gray-600 hover:bg-gray-50"
          aria-label="Scroll right"
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
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {/* Main scrollable area */}
        <div
          ref={scrollRef}
          className="overflow-y-auto max-h-[calc(100vh-200px)]"
          style={{
            height: `${(END_HOUR - START_HOUR + 1) * HOUR_HEIGHT + 20}px`,
          }}
        >
          <div className="relative flex">
            {/* Time labels */}
            <div className="sticky left-0 z-10 w-16 bg-white">
              {TIME_LABELS.map((hour) => (
                <div
                  key={hour}
                  className="border-t border-gray-200 text-right pr-2 text-xs text-gray-500"
                  style={{ height: `${HOUR_HEIGHT}px` }}
                >
                  {hour === 12
                    ? "12 PM"
                    : hour < 12
                      ? `${hour} AM`
                      : `${hour - 12} PM`}
                </div>
              ))}
            </div>

            {/* Scrollable days container */}
            <div ref={containerRef} className="flex-1 overflow-x-auto flex">
              {days.map((day) => {
                const dayTodos = useTodosForDate(day, todos);
                const isToday = isSameDay(day, new Date());

                // Get positioned todos
                const positionedTodos = dayTodos
                  .map((todo) => positionTodo(todo, day))
                  .filter(
                    (
                      item,
                    ): item is {
                      top: number;
                      height: number;
                      todo: TodoViewModel;
                    } => item !== null,
                  );

                return (
                  <div
                    key={day.toISOString()}
                    className={`flex-1 min-w-[100px] border-l border-gray-200 relative ${isToday ? "bg-blue-50/30" : ""}`}
                  >
                    {/* Hour rows */}
                    {TIME_LABELS.map((hour) => (
                      <div
                        key={hour}
                        onClick={() => handleTimeSlotClick(day, hour)}
                        className="border-t border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                        style={{ height: `${HOUR_HEIGHT}px` }}
                      />
                    ))}

                    {/* Current time indicator */}
                    {isToday && (
                      <div
                        className="absolute left-0 right-0 border-t-2 border-red-500 z-20"
                        style={{
                          top: `${
                            (new Date().getHours() - START_HOUR) * HOUR_HEIGHT +
                            (new Date().getMinutes() / 60) * HOUR_HEIGHT
                          }px`,
                        }}
                      >
                        <div className="w-2 h-2 rounded-full bg-red-500 -mt-1 -ml-1"></div>
                      </div>
                    )}

                    {/* Positioned todos */}
                    {positionedTodos.map(({ top, height, todo }) => (
                      <div
                        key={todo.id}
                        className="absolute left-1 right-1 rounded-md border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                        style={{
                          top: `${top}px`,
                          height: `${height}px`,
                          backgroundColor: todo.completed
                            ? "#f8fafc"
                            : "#ebf5ff",
                          borderColor: todo.completed ? "#cbd5e1" : "#93c5fd",
                        }}
                      >
                        {renderItem(todo, "week-scroll")}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollableWeekView;
