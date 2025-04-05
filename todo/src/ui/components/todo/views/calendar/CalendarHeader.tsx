import React from "react";
import { useCalendarNavigation } from "../calendar-hooks";
import { startOfDay } from "date-fns";
import { CalendarViewType } from "../calendar-hooks/types";
import { CalendarViewSelector } from "./organisms/CalendarViewSelector";

const CalendarHeader: React.FC = () => {
  const { today, view, setView, currentDate, setCurrentDate } =
    useCalendarNavigation();

  const handleToday = () => {
    const todayDate = new Date();

    if (view === "day") {
      setCurrentDate(startOfDay(todayDate));
    } else {
      today();
    }
  };

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

  const handleSetView = (calendarView: CalendarViewType) => {
    setView(calendarView);
  };

  return (
    <div className="flex items-stretch bg-white  border-gray-200">
      <CalendarViewSelector
        view={view}
        onViewChange={handleSetView}
        styleVariant="inverted"
      />
      <button
        onClick={handleToday}
        className={`px-4 py-3 border-l border-gray-200 text-sm font-medium ${
          isCurrentDay()
            ? "text-gray-200 cursor-default"
            : "text-white bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600"
        }`}
        disabled={isCurrentDay()}
      >
        Today
      </button>
    </div>
  );
};

export default CalendarHeader;
