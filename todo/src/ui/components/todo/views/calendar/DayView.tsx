import React from "react";
import { format, isSameDay } from "date-fns";
import { useCalendarNavigation, useTodosForDate } from "../calendar-hooks";
import { TodoViewModel } from "../../../../viewmodels/TodoViewModel";

interface DayViewProps {
  todos: TodoViewModel[];
  renderItem: (todo: TodoViewModel, viewType: string) => React.ReactNode;
}

const DayView: React.FC<DayViewProps> = ({ todos, renderItem }) => {
  const { currentDate } = useCalendarNavigation();
  const dayTodos = useTodosForDate(currentDate, todos);
  const isToday = isSameDay(currentDate, new Date());

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        {format(currentDate, "EEEE, MMMM d, yyyy")}
      </h2>
      {isToday && (
        <div className="mb-4 bg-blue-100 border border-blue-500 text-blue-700 p-2 rounded-md">
          Today!
        </div>
      )}
      {dayTodos.length === 0 ? (
        <p>No items for this day.</p>
      ) : (
        <div className="space-y-2">
          {dayTodos.map((todo) => (
            <React.Fragment key={todo.id}>
              {renderItem(todo, "day")}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default DayView;
