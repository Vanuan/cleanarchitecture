import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  format,
  addMonths,
  subMonths,
} from "date-fns";
import { TodoViewModel } from "../../../../viewmodels/TodoViewModel";
import { useContext } from "react";
import { CalendarContext } from "./calendar-context";

// Hook to get calendar navigation functions
export function useCalendarNavigation() {
  const { currentDate, setCurrentDate, view, setView } = useCalendarContext();

  const today = () => setCurrentDate(new Date());

  const next = () => {
    if (view === "month") {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (view === "week") {
      // Move forward a week
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 7);
      setCurrentDate(newDate);
    } else {
      // Move forward a day
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 1);
      setCurrentDate(newDate);
    }
  };

  const prev = () => {
    if (view === "month") {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (view === "week") {
      // Move back a week
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 7);
      setCurrentDate(newDate);
    } else {
      // Move back a day
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 1);
      setCurrentDate(newDate);
    }
  };

  return {
    today,
    next,
    prev,
    currentDate,
    view,
    setView,
    setCurrentDate,
  };
}

// Hook to get month data
export function useMonthData() {
  const { currentDate } = useCalendarContext();

  // Calculate the days to display
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  // Generate all days in interval
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  // Group days into weeks
  const weeks = [];
  let week = [];

  for (const day of days) {
    const formattedDay = {
      date: day,
      isCurrentMonth: isSameMonth(day, currentDate),
      isToday:
        isSameMonth(day, new Date()) && day.getDate() === new Date().getDate(),
      dayOfMonth: day.getDate(),
      dayName: format(day, "EEE"),
    };

    week.push(formattedDay);

    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  return {
    weeks,
    monthName: format(currentDate, "MMMM"),
    year: format(currentDate, "yyyy"),
  };
}

// Hook to get items for a specific date
export function useTodosForDate(date: Date, todos: TodoViewModel[]) {
  const { config } = useCalendarContext();
  const dateField = config.dateField;

  // Filter todos that match this date
  return todos.filter((todo) => {
    if (!todo[dateField]) return false;

    const todoDate = new Date(todo[dateField] as string | number | Date);
    return (
      todoDate.getDate() === date.getDate() &&
      todoDate.getMonth() === date.getMonth() &&
      todoDate.getFullYear() === date.getFullYear()
    );
  });
}

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      "useCalendarContext must be used within a CalendarProvider",
    );
  }
  return context;
};
