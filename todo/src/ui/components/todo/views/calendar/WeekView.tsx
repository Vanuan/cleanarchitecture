import React from "react";
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
} from "date-fns";
import { useCalendarNavigation, useTodosForDate } from "../calendar-hooks";
import { TodoViewModel } from "../../../../viewmodels/TodoViewModel";

interface WeekViewProps {
  todos: TodoViewModel[];
  renderItem: (todo: TodoViewModel, viewType: string) => React.ReactNode;
}

const WeekView: React.FC<WeekViewProps> = ({ todos, renderItem }) => {
  const { currentDate } = useCalendarNavigation();

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return (
    <div className="grid grid-cols-7">
      {days.map((day) => {
        const isToday = isSameDay(day, new Date());

        return (
          <WeekViewDay
            key={day.toISOString()}
            day={day}
            todos={todos}
            renderItem={renderItem}
            isToday={isToday}
          />
        );
      })}
    </div>
  );
};

interface WeekViewDayProps {
  day: Date;
  todos: TodoViewModel[];
  renderItem: (todo: TodoViewModel, viewType: string) => React.ReactNode;
  isToday: boolean;
}

const WeekViewDay: React.FC<WeekViewDayProps> = ({
  day,
  todos,
  renderItem,
  isToday,
}) => {
  const dayTodos = useTodosForDate(day, todos);

  return (
    <div
      className={`border border-gray-200 p-2 min-h-[150px] relative ${
        isToday ? "ring-2 ring-blue-500 ring-inset" : ""
      }`}
    >
      <div className="text-sm font-medium text-gray-700">
        {format(day, "EEE, MMM d")}
      </div>
      <div className="mt-2 space-y-1">
        {dayTodos.map((todo) => (
          <React.Fragment key={todo.id}>
            {renderItem(todo, "week")}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
