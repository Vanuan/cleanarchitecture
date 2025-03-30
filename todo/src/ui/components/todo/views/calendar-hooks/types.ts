import { TodoViewModel } from "../../../../viewmodels/TodoViewModel";

export type CalendarViewType = "month" | "week" | "day";

export interface CalendarConfig {
  firstDayOfWeek: 0 | 1;
  timeFormat: "12h" | "24h";
  dateField: keyof TodoViewModel;
}

export interface CalendarContextValue {
  currentDate: Date;
  view: CalendarViewType;
  config: CalendarConfig;
  setCurrentDate: (date: Date) => void;
  setView: (view: CalendarViewType) => void;
  updateConfig: (config: Partial<CalendarConfig>) => void;
}

export interface CalendarContextType {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  view: CalendarViewType;
  setView: (view: CalendarViewType) => void;
  config: CalendarConfig;
  today: () => void;
  next: () => void;
  prev: () => void;
}
