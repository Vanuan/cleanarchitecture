import { TodoViewModel } from "../../../../viewmodels/TodoViewModel";

export type ViewType = "month" | "week" | "day" | "agenda";

export interface CalendarConfig {
  firstDayOfWeek: 0 | 1;
  timeFormat: "12h" | "24h";
  dateField: keyof TodoViewModel;
}

export interface CalendarContextValue {
  currentDate: Date;
  view: ViewType;
  config: CalendarConfig;
  setCurrentDate: (date: Date) => void;
  setView: (view: ViewType) => void;
  updateConfig: (config: Partial<CalendarConfig>) => void;
}

export interface CalendarContextType {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  view: ViewType;
  setView: (view: ViewType) => void;
  config: CalendarConfig;
  today: () => void;
  next: () => void;
  prev: () => void;
}
