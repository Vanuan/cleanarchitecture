import React from "react";
import { TodoViewModel } from "../../../../viewmodels/TodoViewModel";
import { useMonthData } from "../calendar-hooks";

const MonthView: React.FC<{
  todos: TodoViewModel[];
  renderItem: (todo: TodoViewModel, viewType: string) => React.ReactNode;
}> = ({ todos, renderItem }) => {
  const { weeks } = useMonthData();

  const CalendarDay: React.FC<{
    day: {
      date: Date;
      dayOfMonth: number;
      isCurrentMonth: boolean;
    };
    todos: TodoViewModel[];
    renderItem: (todo: TodoViewModel, viewType: string) => React.ReactNode;
  }> = ({ day, todos, renderItem }) => {
    return (
      <div className="border border-gray-200 min-h-[100px] p-1 relative">
        <div className="text-right">
          <span className="text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center text-gray-700">
            {day.dayOfMonth}
          </span>
        </div>
        <div className="mt-1 space-y-1 max-h-24 overflow-y-auto">
          {todos.map((todo, index) => (
            <React.Fragment key={index}>
              {renderItem(todo, "calendar")}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const MemoizedCalendarDay = React.memo(CalendarDay);

  return (
    <div>
      {/* Day names header */}
      <div className="grid grid-cols-7 text-center py-2 border-b border-gray-200 bg-gray-50">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
          <div key={index} className="text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="bg-white">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7">
            {week.map((day) => {
              const dayTodos = todos.filter((todo) => {
                const todoDate = new Date(todo.dueDate as string);
                return (
                  todoDate.getDate() === day.date.getDate() &&
                  todoDate.getMonth() === day.date.getMonth() &&
                  todoDate.getFullYear() === day.date.getFullYear()
                );
              });
              return (
                <MemoizedCalendarDay
                  key={day.date.toString()}
                  day={day}
                  todos={dayTodos}
                  renderItem={renderItem}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthView;
