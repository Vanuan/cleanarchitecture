import React from "react";
import { CalendarProvider } from "./calendar-hooks";
import { TodoViewModel } from "../../../viewmodels/TodoViewModel";
import CalendarHeader from "./calendar/CalendarHeader";
import CalendarContent from "./calendar/CalendarContent";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

interface ViewProps<T> {
  items: T[];
  config?: Partial<CalendarConfig>;
  renderItem: (item: T, viewType: string) => React.ReactNode;
  isLoading?: boolean;
  error?: Error | null;
  onAddItem?: (date: Date) => void;
}

interface CalendarConfig {
  firstDayOfWeek: 0 | 1;
  timeFormat: "12h" | "24h";
  dateField: keyof TodoViewModel;
  defaultView?: "day" | "week" | "month" | "agenda";
}

// Main Calendar Component
const TodoCalendarView: React.FC<ViewProps<TodoViewModel>> = ({
  items,
  renderItem,
  config = {},
  isLoading,
  error,
  onAddItem,
}) => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Set default view based on screen size
  const defaultConfig: Partial<CalendarConfig> = {
    dateField: "dueDate",
    defaultView: isMobile ? "day" : "week",
  };

  return (
    <CalendarProvider initialConfig={{ ...defaultConfig, ...config }}>
      <div className="flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden">
        <CalendarHeader />
        <div className="flex-1 overflow-y-auto">
          <CalendarContent
            items={items}
            renderItem={renderItem}
            isLoading={isLoading}
            error={error}
            onAddItem={onAddItem}
          />
        </div>

        {/* Mobile floating action button for adding tasks */}
        {isMobile && onAddItem && (
          <button
            onClick={() => onAddItem(new Date())}
            className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center"
            aria-label="Add new task"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        )}
      </div>
    </CalendarProvider>
  );
};

export default TodoCalendarView;
