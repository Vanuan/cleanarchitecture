import { useCalendarNavigation } from "../calendar-hooks";
import { TodoViewModel } from "../../../../viewmodels/TodoViewModel";

import WeekView from "./WeekView";
import DayView from "./DayView";
import MonthView from "./MonthView";

interface CalendarContentProps {
  items: TodoViewModel[];
  renderItem: (item: TodoViewModel, viewType: string) => React.ReactNode;
}
const CalendarContent: React.FC<CalendarContentProps> = ({
  items,
  renderItem,
}) => {
  const { view } = useCalendarNavigation();

  return (
    <>
      {view === "month" && <MonthView todos={items} renderItem={renderItem} />}
      {view === "week" && <WeekView todos={items} renderItem={renderItem} />}
      {view === "day" && <DayView todos={items} renderItem={renderItem} />}
    </>
  );
};

export default CalendarContent;
