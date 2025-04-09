import { format, parseISO, startOfDay, differenceInDays } from "date-fns";

export const now = () => {
  return new Date();
};

export const cloneDate = (oldDate: Date) => {
  return new Date(oldDate);
};

export const serializeDate = (date: Date): string => {
  return date.toISOString();
};

export const parseDateString = (
  dateString: string | undefined,
): Date | undefined => {
  if (!dateString) {
    return undefined;
  }
  try {
    return parseISO(dateString);
  } catch (error) {
    console.error("Error parsing date string:", dateString, error);
    return undefined;
  }
};

export const formatDate = (
  date: Date | undefined,
  formatString: string,
): string | undefined => {
  if (!date) {
    return undefined;
  }
  try {
    return format(date, formatString);
  } catch (error) {
    console.error("Error formatting date:", date, error);
    return undefined; // Or throw an error
  }
};

export const formatDateAsFormValue = (
  date: Date | undefined,
): string | undefined => {
  return formatDate(date, "yyyy-MM-dd");
};

export const formatTimeAsFormValue = (
  date: Date | undefined,
): string | undefined => {
  return formatDate(date, "HH:mm");
};

export const formatDateAsFullDayDisplay = (date: Date | undefined) => {
  return formatDate(date, "MMM dd, yyyy");
};

const SHORT_DATE_FORMAT = 'MMM d, yyyy';

export const formatDateAsShortDate = (date?: Date): string => {
  if (!date) return "";
  try {
    return format(date, SHORT_DATE_FORMAT);
  } catch (e) {
    console.error("Error formatting date:", e);
    return "Invalid Date";
  }
};

export const isDateWithinDays = (date: Date, days: number): boolean => {
  if (!date) return false;
  try {
    const today = startOfDay(now());
    const targetDate = startOfDay(date);
    const diff = differenceInDays(targetDate, today);
    return diff >= 0 && diff <= days;
  } catch (e) {
    console.error("Error comparing dates:", e);
    return false;
  }
};
