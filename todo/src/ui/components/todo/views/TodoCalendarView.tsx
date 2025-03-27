import React from "react";
import { CalendarProvider } from "./calendar-hooks";
import { TodoViewModel } from "../../../viewmodels/TodoViewModel";
import CalendarHeader from "./calendar/CalendarHeader";
import CalendarContent from "./calendar/CalendarContent";

interface ViewProps<T> {
  items: T[];
  config?: Partial<CalendarConfig>;
  renderItem: (item: T, viewType: string) => React.ReactNode;
}

interface CalendarConfig {
  firstDayOfWeek: 0 | 1;
  timeFormat: "12h" | "24h";
  dateField: keyof TodoViewModel;
}

// Main Calendar Component
const TodoCalendarView: React.FC<ViewProps<TodoViewModel>> = ({
  items,
  renderItem,
  config = {},
}) => {
  return (
    <CalendarProvider initialConfig={{ dateField: "dueDate", ...config }}>
      <div className="flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden">
        <CalendarHeader />
        <div className="flex-1 overflow-y-auto">
          <CalendarContent items={items} renderItem={renderItem} />
        </div>
      </div>
    </CalendarProvider>
  );
};

export default TodoCalendarView;
