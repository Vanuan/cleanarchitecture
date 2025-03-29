import React from "react";
import { useCalendarNavigation, useMonthData } from "../calendar-hooks";
import { format, startOfWeek, endOfWeek, startOfDay } from "date-fns";

const CalendarHeader: React.FC = () => {
  const { today, next, prev, view, setView, currentDate, setCurrentDate } =
    useCalendarNavigation();
  const { monthName, year } = useMonthData();

  // Generate dynamic title based on view
  const getViewTitle = () => {
    switch (view) {
      case "day":
        return format(currentDate, "MMMM d, yyyy (EEEE)");
      case "week": {
        const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
        return `${format(weekStart, "MMM d")} - ${format(weekEnd, "MMM d, yyyy")}`;
      }
      case "month":
      default:
        return `${monthName} ${year}`;
    }
  };

  // Handle context-specific navigation
  const handlePrev = () => {
    prev();
  };

  const handleNext = () => {
    next();
  };

  const handleToday = () => {
    const todayDate = new Date();
    
    // For day view, we want to go to the exact day
    if (view === "day") {
      setCurrentDate(startOfDay(todayDate));
    } else {
      // For other views, use the default today handler
      today();
    }
  };

  // Check if current date is today for highlighting
  const isCurrentDay = () => {
    const todayDate = new Date();
    const today = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate()
    );
    const current = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    return today.getTime() === current.getTime();
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-200 gap-3">
      <h2 className="text-lg font-semibold text-gray-800">
        {getViewTitle()}
        {isCurrentDay() && view === "day" && (
          <span className="ml-2 text-sm font-medium text-blue-500 bg-blue-100 px-2 py-0.5 rounded">
            Today
          </span>
        )}
      </h2>

      <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
        <div className="flex rounded-md shadow-sm">
          <button
            onClick={() => setView("month")}
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${
              view === "month"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setView("week")}
            className={`px-4 py-2 text-sm font-medium ${
              view === "week"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border-t border-b border-gray-300"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setView("day")}
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              view === "day"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            }`}
          >
            Day
          </button>
        </div>

        <div className="flex rounded-md shadow-sm">
          <button
            onClick={handlePrev}
            className="p-2 bg-white border border-gray-300 rounded-l-md text-gray-700 hover:bg-gray-50"
            aria-label="Previous"
          >
            &lt;
          </button>
          <button
            onClick={handleToday}
            className={`px-4 py-2 border-t border-b border-gray-300 text-sm font-medium ${
              isCurrentDay() 
                ? "bg-blue-100 text-blue-600" 
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Today
          </button>
          <button
            onClick={handleNext}
            className="p-2 bg-white border border-gray-300 rounded-r-md text-gray-700 hover:bg-gray-50"
            aria-label="Next"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
