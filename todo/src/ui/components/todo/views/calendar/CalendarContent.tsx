import { useCalendarNavigation } from "../calendar-hooks";
import { TodoViewModel } from "../../../../viewmodels/TodoViewModel";

import MonthView from "./MonthView";
import WeekView from "./WeekView";
import DayView from "./DayView";

interface CalendarContentProps {
  items: TodoViewModel[];
  renderItem: (item: TodoViewModel) => React.ReactNode;
  isLoading?: boolean;
  error?: Error | null;
  onAddItem?: ({
    dueDate,
    isAllDay,
  }: {
    dueDate?: string;
    isAllDay?: boolean;
  }) => void;
  styleVariant?: "inverted" | "default";
}

const CalendarContent: React.FC<CalendarContentProps> = ({
  items,
  renderItem,
  isLoading = false,
  error = null,
  onAddItem,
  styleVariant = "default",
}) => {
  const { view } = useCalendarNavigation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 bg-blue-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <p className="font-medium">Error loading calendar data</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {view === "month" && (
        <MonthView
          todos={items}
          renderItem={renderItem}
          onAddItem={onAddItem}
          styleVariant={styleVariant}
        />
      )}
      {view === "week" && (
        <WeekView
          todos={items}
          renderItem={renderItem}
          onAddItem={onAddItem}
          styleVariant={styleVariant}
        />
      )}
      {view === "day" && (
        <DayView
          todos={items}
          renderItem={renderItem}
          onAddItem={onAddItem}
          styleVariant={styleVariant}
        />
      )}
    </>
  );
};

export default CalendarContent;
