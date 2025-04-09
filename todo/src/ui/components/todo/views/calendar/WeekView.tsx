import React from "react";
import {
  format,
  isToday,
  isTomorrow,
  isYesterday,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";
import { useCalendarNavigation, useTodosForDate } from "../calendar-hooks";
import { TodoViewModel } from "../../../../viewmodels/TodoViewModel";
import { serializeDate } from "../../../../../lib/utils/date";
import { WeekNavigation } from "./organisms/AdaptiveNavigation";
import {
  WeekViewStyleVariant,
  getWeekViewStyleProps,
  getDaySectionClasses,
  getDayNameClasses,
  getDayDateClasses,
  getBadgeClasses,
} from "./atoms/weekViewStyles";

interface WeekViewProps {
  todos: TodoViewModel[];
  renderItem: (todo: TodoViewModel) => React.ReactNode;
  onAddItem?: ({
    dueDate,
    isAllDay,
  }: {
    dueDate?: string;
    isAllDay?: boolean;
  }) => void;
  styleVariant?: WeekViewStyleVariant;
}

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const WeekView: React.FC<WeekViewProps> = ({
  todos,
  renderItem,
  onAddItem,
  styleVariant = "default",
}) => {
  const { currentDate, setCurrentDate } = useCalendarNavigation();
  const styles = getWeekViewStyleProps(styleVariant);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return (
    <div className={styles.viewContainerClassName}>
      <WeekNavigation
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        styleVariant={styleVariant}
      />

      <div className="flex-1 overflow-y-auto">
        <div>
          {days.map((day) => (
            <DaySection
              key={day.toISOString()}
              day={day}
              todos={todos}
              renderItem={renderItem}
              onAddItem={onAddItem}
              styles={styles}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface DaySectionProps {
  day: Date;
  todos: TodoViewModel[];
  renderItem: (todo: TodoViewModel) => React.ReactNode;
  onAddItem?: ({
    dueDate,
    isAllDay,
  }: {
    dueDate: string;
    isAllDay?: boolean;
  }) => void;
  styles: WeekViewStyleProps;
}

const DaySection: React.FC<DaySectionProps> = ({
  day,
  todos,
  renderItem,
  onAddItem,
  styles,
}) => {
  const dayTodos = useTodosForDate(day, todos);
  const isDayToday = isToday(day);
  const isDayTomorrow = isTomorrow(day);
  const isDayYesterday = isYesterday(day);

  const sectionClasses = getDaySectionClasses(styles, isDayToday, dayTodos.length === 0);

  const handleAddItem = () => {
    if (onAddItem) {
      onAddItem({ dueDate: serializeDate(day), isAllDay: true });
    }
  };

  return (
    <div className={sectionClasses}>
      <div className={styles.dayHeaderContainerClassName}>
        <span className={getDayNameClasses(styles, isDayToday)}>
          {format(day, "EEEE")}
        </span>
        <span className={getDayDateClasses(styles, isDayToday)}>
          {format(day, "MMMM d, yyyy")}
        </span>

        {isDayToday && (
          <span className={getBadgeClasses(styles, true)}>
            Today
          </span>
        )}
        {isDayTomorrow && (
          <span className={getBadgeClasses(styles, false)}>
            Tomorrow
          </span>
        )}
        {isDayYesterday && (
          <span className={getBadgeClasses(styles, false)}>
            Yesterday
          </span>
        )}
      </div>

      {dayTodos.length > 0 ? (
        <div className={styles.taskContainerClassName}>
          {dayTodos.map((todo) => (
            <div
              key={todo.id}
              className={`${styles.taskItemWrapperClassName} ${todo.completed ? styles.taskItemCompletedClassName : ''}`}
            >
              {renderItem(todo)}
            </div>
          ))}

          {onAddItem && (
            <button
              onClick={handleAddItem}
              className={styles.addButtonClassName}
            >
              <PlusIcon className={styles.addIconClassName} />
              Add task
            </button>
          )}
        </div>
      ) : (
        <div className={styles.emptyStateContainerClassName}>
          <p className={styles.emptyStateTextClassName}>No tasks scheduled</p>
          {onAddItem && (
            <button
              onClick={handleAddItem}
              className={styles.emptyStateButtonClassName}
            >
              <PlusIcon className={styles.addIconClassName} />
              Add task
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default WeekView;
