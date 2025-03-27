import { TodoViewModel } from "../../../../viewmodels/TodoViewModel";

export interface CalendarConfig {
  firstDayOfWeek: 0 | 1;
  timeFormat: "12h" | "24h";
  dateField: keyof TodoViewModel;
}

export interface CalendarContextValue {
  currentDate: Date;
  view: "month" | "week" | "day";
  config: CalendarConfig;
  setCurrentDate: (date: Date) => void;
  setView: (view: "month" | "week" | "day") => void;
  updateConfig: (config: Partial<CalendarConfig>) => void;
}
