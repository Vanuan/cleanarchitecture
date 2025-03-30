import React from "react";
import { TodoViewModel } from "../../../../viewmodels/TodoViewModel";
import { useMonthData, useCalendarNavigation } from "../calendar-hooks";
import { format, isSameDay } from "date-fns";
import { serializeDate } from "../../../../../lib/utils/date";

const MonthView: React.FC<{
  todos: TodoViewModel[];
  renderItem: (todo: TodoViewModel) => React.ReactNode;
  onAddItem?: ({
    dueDate,
    isAllDay,
  }: {
    dueDate?: string;
    isAllDay?: boolean;
  }) => void;
}> = ({ todos, renderItem, onAddItem }) => {
  const { weeks } = useMonthData();
  const { currentDate, goToMonth } = useCalendarNavigation();

  const CalendarDay: React.FC<{
    day: {
      date: Date;
      dayOfMonth: number;
      isCurrentMonth: boolean;
    };
    todos: TodoViewModel[];
    renderItem: (todo: TodoViewModel) => React.ReactNode;
    onAddItem?: ({
      dueDate,
      isAllDay,
    }: {
      dueDate: string;
      isAllDay?: boolean;
    }) => void;
  }> = ({ day, todos, onAddItem }) => {
    const getTaskStats = (todos: TodoViewModel[]) => {
      return todos.reduce(
        (acc, todo) => {
          if (todo.completed) {
            acc.completed += 1;
          }
          acc.total += 1;
          acc.tasks += 1;
          return acc;
        },
        { tasks: 0, completed: 0, total: 0 },
      );
    };

    const stats = getTaskStats(todos);
    const isToday = isSameDay(day.date, new Date());

    const handleAddTask = () => {
      if (onAddItem) {
        const taskDate = new Date(day.date);
        taskDate.setHours(0, 0, 0, 0);
        onAddItem({ dueDate: serializeDate(taskDate), isAllDay: true });
      }
    };

    return (
      <div
        className={`min-h-24 p-2 border border-gray-200 ${
          isToday ? "bg-blue-50" : ""
        } ${!day.isCurrentMonth ? "bg-gray-50" : ""}`}
        onClick={onAddItem ? handleAddTask : undefined}
        style={{ cursor: onAddItem ? "pointer" : "default" }}
      >
        <div className="flex justify-between items-start">
          <span
            className={`text-sm ${
              isToday ? "font-bold text-blue-600" : "font-medium"
            } ${!day.isCurrentMonth ? "text-gray-400" : ""}`}
          >
            {day.dayOfMonth}
          </span>

          {day.dayOfMonth === 1 && (
            <span className="text-xs text-gray-500">
              {format(day.date, "MMM")}
            </span>
          )}

          {stats.total > 0 && (
            <div className="text-xs flex items-center">
              <span className="text-gray-500 mr-1">
                {stats.completed}/{stats.total}
              </span>
            </div>
          )}
        </div>

        <div className="mt-2 flex flex-wrap gap-1">
          {stats.tasks > 0 && (
            <div className="flex items-center bg-blue-100 px-2 py-1 rounded-md">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
              <span className="text-xs text-blue-800">{stats.tasks}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const MemoizedCalendarDay = React.memo(CalendarDay);

  const MonthNavigationHeader = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Generate 7 months centered around current month
    const months = [];
    for (let i = -3; i <= 3; i++) {
      const monthDate = new Date(currentYear, currentMonth + i, 1);
      const isPrevious = i === -1;
      const isNext = i === 1;
      const isCurrent = i === 0;

      months.push({
        date: monthDate,
        month: format(monthDate, "MMM"),
        year: format(monthDate, "yyyy"),
        isPrevious,
        isNext,
        isCurrent,
      });
    }

    const handleGoToMonth = (date: Date) => {
      // Create a new date set to the 1st day of the target month
      const newDate = new Date(date.getFullYear(), date.getMonth(), 1);
      goToMonth(newDate.getMonth(), newDate.getFullYear());
    };

    return (
      <div className="grid grid-cols-7 w-full border-b border-gray-200 bg-white sticky top-0 z-10 divide-x divide-gray-100">
        {months.map((month, index) => (
          <button
            key={index}
            className={`flex flex-col items-center py-3 transition-colors w-full ${
              month.isCurrent ? "bg-blue-100" : "hover:bg-gray-50"
            }`}
            onClick={() => handleGoToMonth(month.date)}
          >
            <span
              className={`text-xs font-medium ${month.isCurrent ? "text-blue-600" : "text-gray-500"}`}
            >
              {month.year}
            </span>
            <span
              className={`text-lg ${month.isCurrent ? "font-bold text-blue-700" : "font-medium text-gray-600"}`}
            >
              {month.month}
            </span>
            {month.isPrevious && (
              <span className="text-xs text-gray-500 mt-1">Previous</span>
            )}
            {month.isCurrent && (
              <span className="text-xs text-blue-600 font-medium mt-1">
                Current
              </span>
            )}
            {month.isNext && (
              <span className="text-xs text-gray-500 mt-1">Next</span>
            )}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <MonthNavigationHeader />
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex justify-end mb-2 text-xs">
            <div className="flex items-center mr-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
              <span>Tasks</span>
            </div>
            {onAddItem && (
              <div className="text-xs text-gray-500">
                Click on any day to add a task
              </div>
            )}
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="grid grid-cols-7 text-center bg-gray-50">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day, index) => (
                  <div
                    key={index}
                    className="py-2 border-b border-gray-200 font-medium text-gray-600"
                  >
                    {day}
                  </div>
                ),
              )}
            </div>
            <div className="bg-white">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7">
                  {week.map((day) => {
                    const dayTodos = todos.filter((todo) => {
                      if (!todo.dueDate) return false;
                      try {
                        const todoDate = new Date(todo.dueDate);
                        return (
                          todoDate.getDate() === day.date.getDate() &&
                          todoDate.getMonth() === day.date.getMonth() &&
                          todoDate.getFullYear() === day.date.getFullYear()
                        );
                      } catch (error) {
                        return false;
                      }
                    });
                    return (
                      <MemoizedCalendarDay
                        key={day.date.toString()}
                        day={day}
                        todos={dayTodos}
                        renderItem={renderItem}
                        onAddItem={onAddItem}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthView;
