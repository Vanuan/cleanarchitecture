import React, { useEffect } from "react";
import { CalendarProvider } from "./calendar-hooks";
import { TodoViewModel } from "../../../viewmodels/TodoViewModel";
import CalendarHeader from "./calendar/CalendarHeader";
import CalendarContent from "./calendar/CalendarContent";
import { EntityViewType } from "../../organisms/EntityView";
import useUiStore from "../store/uiStore";
import { CalendarViewType } from "./calendar-hooks/types";

interface ViewProps<T> {
  items: T[];
  config?: Partial<CalendarConfig>;
  renderItem: (item: T) => React.ReactNode;
  isLoading?: boolean;
  error?: Error | null;
  onAddItem?: (item: Partial<T>) => void;
  currentView: EntityViewType;
  setCurrentView: (view: EntityViewType) => void;
}

interface CalendarConfig {
  firstDayOfWeek: 0 | 1;
  timeFormat: "12h" | "24h";
  dateField: keyof TodoViewModel;
  defaultView?: "month" | "day" | "week" | "week-scroll" | "agenda";
}

// Main Calendar Component
const TodoCalendarView: React.FC<ViewProps<TodoViewModel>> = ({
  items,
  renderItem,
  config = {},
  isLoading,
  error,
  onAddItem,
  currentView,
}) => {
  const calendarViewType = useUiStore(
    (state) => state.calendarViewType || "month",
  );
  const setCalendarViewType = useUiStore((state) => state.setCalendarViewType);
  // Initialize calendar view when component mounts or currentView changes
  useEffect(() => {
    // When first loading calendar view, ensure a calendar view type is set
    if (currentView === "calendar" && !calendarViewType) {
      setCalendarViewType("month");
    }
  }, [currentView, calendarViewType, setCalendarViewType]);

  const defaultConfig: Partial<CalendarConfig> = {
    dateField: "dueDate",
  };

  const handleSetCalendarView = (view: CalendarViewType) => {
    setCalendarViewType(view);
  };

  const styleVariant = useUiStore(
    (state) => state.styleVariant,
  );

  return (
    <CalendarProvider
      initialConfig={{ ...defaultConfig, ...config }}
      currentView={calendarViewType}
      setCurrentView={handleSetCalendarView}
    >
      <>
        <CalendarHeader />
        <div className="flex-1 overflow-y-auto">
          <CalendarContent
            items={items}
            renderItem={renderItem}
            isLoading={isLoading}
            error={error}
            onAddItem={onAddItem}
            styleVariant={styleVariant}
          />
        </div>
      </>
    </CalendarProvider>
  );
};

export default TodoCalendarView;
