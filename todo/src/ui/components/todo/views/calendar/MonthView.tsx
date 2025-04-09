import React from "react";
import { TodoViewModel } from "../../../../viewmodels/TodoViewModel";
import { useMonthData, useCalendarNavigation } from "../calendar-hooks";
import { format, isSameDay } from "date-fns";
import { cloneDate, now, serializeDate } from "../../../../../lib/utils/date";
import { MonthNavigation } from "./organisms/AdaptiveNavigation";
import {
  MonthViewStyleVariant,
  getMonthViewStyleProps,
  getDayCellClasses,
  getDayNumberClasses,
  MonthViewStyleProps,
} from "./atoms/monthViewStyles";

interface MonthViewProps {
  todos: TodoViewModel[];
  renderItem: (todo: TodoViewModel) => React.ReactNode;
  onAddItem?: ({
    dueDate,
    isAllDay,
  }: {
    dueDate?: string;
    isAllDay?: boolean;
  }) => void;
  styleVariant?: MonthViewStyleVariant;
}

const MonthView: React.FC<MonthViewProps> = ({
  todos,
  renderItem,
  onAddItem,
  styleVariant = "default",
}) => {
  const { weeks } = useMonthData();
  const { currentDate, goToMonth } = useCalendarNavigation();
  const today = now();
  const styles = getMonthViewStyleProps(styleVariant);

  const CalendarDay: React.FC<{
    day: {
      date: Date;
      dayOfMonth: number;
      isCurrentMonth: boolean;
    };
    todos: TodoViewModel[];
    styles: MonthViewStyleProps;
    renderItem: (todo: TodoViewModel) => React.ReactNode;
    onAddItem?: ({
      dueDate,
      isAllDay,
    }: {
      dueDate: string;
      isAllDay?: boolean;
    }) => void;
  }> = ({ day, todos: dayTodos, styles: dayStyles, onAddItem }) => {
    const getTaskStats = (todosToStat: TodoViewModel[]) => {
      return todosToStat.reduce(
        (acc, todo) => {
          if (todo.completed) {
            acc.completed += 1;
          }
          acc.total += 1;
          acc.tasks += 1;
          return acc;
        },
        { tasks: 0, completed: 0, total: 0 }
      );
    };

    const stats = getTaskStats(dayTodos);
    const isToday = isSameDay(day.date, today);

    const handleAddTask = () => {
      if (onAddItem) {
        const taskDate = cloneDate(day.date);
        taskDate.setHours(0, 0, 0, 0);
        onAddItem({ dueDate: serializeDate(taskDate), isAllDay: true });
      }
    };

    const cellClasses = getDayCellClasses(dayStyles, day.isCurrentMonth, isToday);
    const dayNumberClasses = getDayNumberClasses(dayStyles, day.isCurrentMonth, isToday);

    return (
      <div
        className={cellClasses}
        onClick={onAddItem ? handleAddTask : undefined}
        style={{ cursor: onAddItem ? "pointer" : "default" }}
      >
        <div className="flex justify-between items-start">
          <span className={dayNumberClasses}>
            {day.dayOfMonth}
          </span>

          {day.dayOfMonth === 1 && !dayStyles.dayNumberBaseClassName.includes('text-right') && (
            <span className="text-xs text-gray-500 ml-auto">
              {format(day.date, "MMM")}
            </span>
          )}

          {stats.total > 0 && dayStyles.dayCellBaseClassName.includes('p-2') && (
            <div className="text-xs flex items-center">
              <span className="text-gray-500 mr-1">
                {stats.completed}/{stats.total}
              </span>
            </div>
          )}
        </div>

        <div className={dayStyles.taskInfoContainerClassName}>
          {stats.tasks > 0 && (
            <div className={dayStyles.taskInfoBadgeClassName}>
              {dayStyles.taskInfoBadgeDotClassName && (
                <div className={dayStyles.taskInfoBadgeDotClassName}></div>
              )}
              <span className={dayStyles.taskInfoBadgeTextClassName}>{stats.tasks} tasks</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const MemoizedCalendarDay = React.memo(CalendarDay);

  const handleDateChange = (date: Date) => {
    goToMonth(date.getMonth(), date.getFullYear());
  };

  return (
    <div className="flex flex-col h-full">
      <MonthNavigation
        currentDate={currentDate}
        onDateChange={handleDateChange}
        styleVariant={styleVariant === "inverted" ? "inverted" : "default"}
      />
      <div className="flex-1 overflow-y-auto">
        <div className={styles.hintContainerClassName}>
          <div className={styles.hintLegendContainerClassName}>
            <div className={styles.hintIndicatorClassName}></div>
            <span className={styles.hintLegendTextClassName}>Tasks</span>
          </div>
          {onAddItem && (
            <div className={styles.hintHelperTextClassName}>
              Click on any day to add a task
            </div>
          )}
        </div>
        <div className="p-4">
          <div className={styles.gridContainerClassName}>
            <div className={styles.headerContainerClassName}>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (dayName, index) => (
                  <div
                    key={index}
                    className={styles.headerCellClassName}
                  >
                    {dayName}
                  </div>
                )
              )}
            </div>
            <div className={styles.gridContainerClassName.includes('bg-white') ? '' : 'bg-white'}>
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
                        console.error("Error parsing date:", error);
                        return false;
                      }
                    });
                    return (
                      <MemoizedCalendarDay
                        key={day.date.toString()}
                        day={day}
                        todos={dayTodos}
                        styles={styles}
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
