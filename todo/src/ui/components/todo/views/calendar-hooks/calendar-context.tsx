import { createContext } from "react";
import { CalendarContextValue } from "./types";

export const CalendarContext = createContext<CalendarContextValue | undefined>(
  undefined,
);
