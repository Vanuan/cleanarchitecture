import { useState, useMemo } from "react";
import {
  CalendarConfig,
  CalendarViewType,
  CalendarContextValue,
} from "./types";
import { CalendarContext } from "./calendar-context";

export const CalendarProvider: React.FC<{
  children: React.ReactNode;
  initialConfig?: Partial<CalendarConfig>;
  currentView: CalendarViewType;
  setCurrentView: (view: CalendarViewType) => void;
}> = ({ children, initialConfig, currentView, setCurrentView }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [config, setConfig] = useState<CalendarConfig>({
    firstDayOfWeek: 1,
    timeFormat: "12h",
    dateField: "dueDate",
    ...initialConfig,
  });

  const updateConfig = (newConfig: Partial<CalendarConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };
  const contextValue = useMemo<CalendarContextValue>(
    () => ({
      currentDate,
      view: currentView,
      config,
      setCurrentDate,
      setView: setCurrentView,
      updateConfig,
    }),
    [currentDate, currentView, config, setCurrentView],
  );

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};
