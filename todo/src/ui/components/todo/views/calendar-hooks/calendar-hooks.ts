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
  addWeeks,
  subWeeks,
  addDays,
  subDays,
} from "date-fns";
import { TodoViewModel } from "../../../../viewmodels/TodoViewModel";
import { useContext } from "react";
import { CalendarContext } from "./calendar-context";

// Hook to get calendar navigation functions
export const useCalendarNavigation = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      "useCalendarContext must be used within a CalendarProvider",
    );
  }

  // Navigate to today
  const today = () => {
    context.setCurrentDate(new Date());
  };

  // Navigate to next period based on current view
  const next = () => {
    const { currentDate, view } = context;
    
    switch (view) {
      case "month":
        context.setCurrentDate(addMonths(currentDate, 1));
        break;
      case "week":
        context.setCurrentDate(addWeeks(currentDate, 1));
        break;
      case "day":
        context.setCurrentDate(addDays(currentDate, 1));
        break;
      default:
        context.setCurrentDate(addDays(currentDate, 1));
    }
  };

  // Navigate to previous period based on current view
  const prev = () => {
    const { currentDate, view } = context;
    
    switch (view) {
      case "month":
        context.setCurrentDate(subMonths(currentDate, 1));
        break;
      case "week":
        context.setCurrentDate(subWeeks(currentDate, 1));
        break;
      case "day":
        context.setCurrentDate(subDays(currentDate, 1));
        break;
      default:
        context.setCurrentDate(subDays(currentDate, 1));
    }
  };

  return {
    ...context,
    today,
    next,
    prev,
    goToDate: (date: Date) => {
      context.setCurrentDate(date);
    },
    goToMonth: (month: number, year: number) => {
      const newDate = new Date(year, month, 1);
      context.setCurrentDate(newDate);
    },
  };
};

// Hook to get month data
export function useMonthData() {
  const { currentDate } = useCalendarContext();

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
