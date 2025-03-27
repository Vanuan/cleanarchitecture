import { useState } from "react";
import { CalendarConfig } from "./types";
import { CalendarContext } from "./calendar-context";

export const CalendarProvider: React.FC<{
  children: React.ReactNode;
  initialConfig?: Partial<CalendarConfig>;
}> = ({ children, initialConfig = {} }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [config, setConfig] = useState<CalendarConfig>({
    firstDayOfWeek: 1,
    timeFormat: "12h",
    dateField: "dueDate",
    ...initialConfig,
  });

  const updateConfig = (newConfig: Partial<CalendarConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        view,
        config,
        setCurrentDate,
        setView,
        updateConfig,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
