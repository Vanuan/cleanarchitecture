import { NavigationConfig, INavigationItem } from "./types";
import {
  getWeekStart,
  getWeekEnd,
  isToday,
  isYesterday,
  isTomorrow,
} from "../date-utils";

export const DayNavigationService: NavigationConfig = {
  generateItems(currentDate: Date): INavigationItem[] {
    // Generate a consistent window of days regardless of how many will be displayed
    // This ensures the same days are generated even if visibleCount changes
    const startDate = new Date(currentDate);
    // Position the current date in the middle of a 7-day window
    startDate.setDate(currentDate.getDate() - 3);

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      // Check if this date is the same as currentDate (year, month, day)
      const isSameDate =
        date.getDate() === currentDate.getDate() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear();

      return {
        key: date.toISOString(),
        upperLabel: date.toLocaleString("default", { weekday: "short" }),
        mainLabel: date.getDate().toString(),
        date,
        isSelected: isSameDate,
        lowerLabel: isToday(date)
          ? "Today"
          : isYesterday(date)
          ? "Yesterday"
          : isTomorrow(date)
          ? "Tomorrow"
          : undefined,
        isToday: isToday(date),
        isYesterday: isYesterday(date),
        isTomorrow: isTomorrow(date),
      };
    });
  },

  navigatePrevious(date: Date): Date {
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);
    return prevDate;
  },

  navigateNext(date: Date): Date {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    return nextDate;
  },
};

export const WeekNavigationService: NavigationConfig = {
  generateItems(currentDate: Date): INavigationItem[] {
    const currentWeekStart = getWeekStart(currentDate);
    const todayWeekStart = getWeekStart(new Date());
    const today = new Date();

    // Generate weeks centered around the current week (-1 to +1)
    return [-1, 0, 1].map((offset) => {
      const weekStart = new Date(currentWeekStart);
      weekStart.setDate(weekStart.getDate() + offset * 7);

      const weekEnd = getWeekEnd(weekStart);

      // Calculate week difference more accurately
      const weekDiff = Math.round(
        (weekStart.getTime() - todayWeekStart.getTime()) /
          (7 * 24 * 60 * 60 * 1000)
      );

      // Check if today falls within this week
      const isThisWeekToday = today >= weekStart && today <= weekEnd;

      // Format the month for display
      const startMonth = weekStart.toLocaleString("default", {
        month: "short",
      });
      const endMonth = weekEnd.toLocaleString("default", { month: "short" });

      // Format the days for display
      const startDay = weekStart.getDate();
      const endDay = weekEnd.getDate();

      // Create a more compact upper label for better display
      const upperLabel =
        startMonth === endMonth ? `${startMonth}` : `${startMonth}/${endMonth}`;

      // Create a more compact main label
      const mainLabel = `${startDay}-${endDay}`;

      return {
        key: weekStart.toISOString(),
        upperLabel: upperLabel,
        mainLabel: mainLabel,
        date: weekStart,
        isSelected: offset === 0,
        lowerLabel:
          weekDiff === 0
            ? "This Week"
            : weekDiff === -1
            ? "Last Week"
            : weekDiff === 1
            ? "Next Week"
            : undefined,
        isToday: isThisWeekToday,
      };
    });
  },

  navigatePrevious(date: Date): Date {
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 7);
    return prevDate;
  },

  navigateNext(date: Date): Date {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 7);
    return nextDate;
  },
};

export const MonthNavigationService: NavigationConfig = {
  generateItems(currentDate: Date): INavigationItem[] {
    const today = new Date();

    return [-2, -1, 0, 1, 2].map((offset) => {
      const monthDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + offset,
        1
      );

      // Check if this month contains today
      const isThisMonthToday =
        today.getFullYear() === monthDate.getFullYear() &&
        today.getMonth() === monthDate.getMonth();

      const monthDiff =
        (monthDate.getFullYear() - today.getFullYear()) * 12 +
        (monthDate.getMonth() - today.getMonth());

      return {
        key: monthDate.toISOString(),
        upperLabel: monthDate.getFullYear().toString(),
        mainLabel: monthDate.toLocaleString("default", { month: "short" }),
        date: monthDate,
        isSelected: offset === 0,
        lowerLabel:
          monthDiff === 0
            ? "This Month"
            : monthDiff === -1
            ? "Last Month"
            : monthDiff === 1
            ? "Next Month"
            : undefined,
        isToday: isThisMonthToday,
      };
    });
  },

  navigatePrevious(date: Date): Date {
    const prevDate = new Date(date);
    prevDate.setMonth(prevDate.getMonth() - 1);
    return prevDate;
  },

  navigateNext(date: Date): Date {
    const nextDate = new Date(date);
    nextDate.setMonth(nextDate.getMonth() + 1);
    return nextDate;
  },
};
