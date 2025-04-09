import React, { useState, useEffect } from "react";
import {
  format,
  isToday,
  parseISO,
  setHours,
} from "date-fns";
import { useCalendarNavigation, useTodosForDate } from "../calendar-hooks";
import { TodoViewModel } from "../../../../viewmodels/TodoViewModel";
import {
  cloneDate,
  parseDateString,
  serializeDate,
} from "../../../../../lib/utils/date";
import { DayNavigation } from './organisms/AdaptiveNavigation';

// Import style definitions
import {
    DayViewStyleVariant,
    getDayViewStyleProps,
} from "./atoms/dayViewStyles";

interface DayViewProps {
  todos: TodoViewModel[];
  renderItem: (todo: TodoViewModel) => React.ReactNode;
  onAddItem?: ({
    dueDate,
    isAllDay,
  }: {
    dueDate?: string;
    isAllDay?: boolean;
  }) => void;
  styleVariant?: DayViewStyleVariant; // Add styleVariant prop
}

// Add generic icon components (or import if available globally)
const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);
const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
   <svg
    xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14"></path><path d="M12 5v14"></path>
  </svg>
);
const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
   <svg
    xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

// Constants for time display
const START_HOUR = 6;
const END_HOUR = 19;

const DayView: React.FC<DayViewProps> = ({
    todos,
    renderItem,
    onAddItem,
    styleVariant = "default", // Default to "default"
 }) => {
  const { currentDate, setCurrentDate } = useCalendarNavigation();
  const styles = getDayViewStyleProps(styleVariant); // Get styles

  // State for selected day
  const [selectedDay, setSelectedDay] = useState<Date>(currentDate);
  useEffect(() => {
    setSelectedDay(currentDate);
  }, [currentDate]);

  // Get todos for the selected day
  const todosForSelectedDay = useTodosForDate(selectedDay, todos);

  // Separate all-day tasks
  const allDayTodos = todosForSelectedDay.filter((todo) => {
    if (todo.isAllDay !== undefined) return todo.isAllDay;
    if (!todo.dueDate) return true;
    try {
      const date = parseISO(todo.dueDate);
      const hour = date.getHours();
      return (hour === 0 && date.getMinutes() === 0) || hour < START_HOUR || hour > END_HOUR;
    } catch (error) {
      console.error("Error parsing date for all-day check:", error, todo.dueDate);
      return true;
    }
  });

  // Separate scheduled tasks
  const scheduledTodos = todosForSelectedDay.filter((todo) => {
    if (todo.isAllDay !== undefined) return !todo.isAllDay;
    if (!todo.dueDate) return false;
    try {
      const date = parseISO(todo.dueDate);
      const hour = date.getHours();
      return hour >= START_HOUR && hour <= END_HOUR;
    } catch (error) {
      console.error("Error parsing date for scheduled check:", error, todo.dueDate);
      return false;
    }
  });

  // Position todo based on time
  const getTimePosition = (todo: TodoViewModel) => {
    if (!todo.dueDate) return null;
    try {
      const startDate = parseDateString(todo.dueDate);
      if (!startDate) return null;
      const startHour = startDate.getHours();
      const startMinutes = startDate.getMinutes();
      if (startHour < START_HOUR || startHour > END_HOUR) return null;
      let durationMinutes = 60;
      if (todo.endDate) {
        const endDate = parseDateString(todo.endDate);
        if (endDate) durationMinutes = (endDate.getTime() - startDate.getTime()) / (1000 * 60);
      }
      return { hour: startHour, minutes: startMinutes, durationMinutes, todo };
    } catch (e) {
      console.error("Error parsing date for time position:", e);
      return null;
    }
  };


  // Handle adding tasks
  const handleAddAllDayTask = () => {
    if (onAddItem) {
      const allDayDate = cloneDate(selectedDay);
      allDayDate.setHours(0, 0, 0, 0);
      onAddItem({ dueDate: serializeDate(allDayDate), isAllDay: true });
    }
  };
  const handleAddTimeTask = (hour: number) => {
    if (onAddItem) {
      const dateWithTime = serializeDate(setHours(selectedDay, hour));
      onAddItem({ dueDate: dateWithTime, isAllDay: false });
    }
  };

  // Current time indicator state
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.viewContainerClassName}> {/* Apply view container style */}
      <DayNavigation
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        styleVariant={styleVariant} // Pass variant to navigation
      />

      <div className="flex-1 overflow-y-auto p-3"> {/* Added padding to scroll container */}
        {/* All-day tasks section */}
        <div className={styles.allDaySectionContainerClassName}> {/* Apply style */}
          <div className={styles.allDayHeaderContainerClassName}> {/* Apply style */}
            <h3 className={styles.allDayHeaderTitleClassName}>All Day Tasks</h3> {/* Apply style */}
            <div className={styles.allDayHeaderHintClassName}> {/* Apply style */}
              <InfoIcon className={styles.allDayHintIconClassName} /> {/* Apply style */}
              Includes tasks outside business hours
            </div>
          </div>

          <div className={styles.allDayItemsContainerClassName}> {/* Apply style */}
            {allDayTodos.length > 0 ? (
              allDayTodos.map((todo) => (
                <div key={todo.id} className={styles.allDayItemWrapperClassName}> {/* Apply style */}
                  {todo.dueDate && new Date(todo.dueDate).getHours() !== 0 && (
                    <div className={styles.allDayItemTimeClassName}> {/* Apply style */}
                      {format(new Date(todo.dueDate), "h:mm a")}
                    </div>
                  )}
                  {renderItem(todo)}
                </div>
              ))
            ) : (
              <div className={styles.allDayEmptyStateClassName}> {/* Apply style */}
                No all-day tasks
              </div>
            )}

            {onAddItem && (
              <div className={styles.allDayAddButtonContainerClassName}> {/* Apply style */}
                <button
                  onClick={handleAddAllDayTask}
                  className={styles.allDayAddButtonClassName} // Apply style
                >
                  <PlusIcon className={styles.allDayAddButtonIconClassName} /> {/* Apply style */}
                  Add all-day task
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Schedule section */}
        <div className={styles.scheduleSectionContainerClassName}> {/* Apply style */}
          <div className={styles.scheduleHeaderContainerClassName}> {/* Apply style */}
            <h3 className={styles.scheduleHeaderTitleClassName}>Schedule</h3> {/* Apply style */}
          </div>

          <div className={styles.scheduleGridClassName}> {/* Apply style */}
            {Array.from(
              { length: END_HOUR - START_HOUR + 1 },
              (_, i) => START_HOUR + i,
            ).map((hour) => {
              const hourTodos = scheduledTodos.filter((todo) => {
                const position = getTimePosition(todo);
                return position && position.hour === hour;
              });

              return (
                <div key={hour} className={styles.timeSlotWrapperClassName}> {/* Apply style */}
                  <div className={styles.timeLabelClassName}> {/* Apply style */}
                    {hour === 12 ? "12 PM" : hour < 12 ? `${hour} AM` : `${hour - 12} PM`}
                  </div>

                  <div
                    className={styles.timeSlotClassName} // Apply style
                    onClick={() => handleAddTimeTask(hour)} // Keep click handler
                  >
                    {hourTodos.map((todo) => {
                      const position = getTimePosition(todo);
                      if (!position) return null; // Should not happen based on filter, but safe check

                      return (
                        <div
                          key={todo.id}
                          className={styles.taskItemClassName} // Apply style
                          style={{
                            top: `${(position.minutes / 60) * 70}px`, // Keep dynamic positioning
                            height: `${Math.max(30, (position.durationMinutes / 60) * 70)}px`, // Keep dynamic positioning
                          }}
                          onClick={(e) => { e.stopPropagation(); }} // Allow clicking task to edit, stop propagation
                        >
                          <div className={styles.taskItemTitleClassName}> {/* Apply style */}
                            {todo.title}
                          </div>
                          {todo.dueDate && (
                            <div className={styles.taskItemTimeClassName}> {/* Apply style */}
                              <ClockIcon className={styles.taskItemTimeIconClassName} /> {/* Apply style */}
                              {format(new Date(todo.dueDate), "h:mm a")}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            {/* Current time indicator */}
            {isToday(selectedDay) && (
              <div
                className={styles.currentTimeIndicatorClassName} // Apply style
                style={{
                  top: `${Math.max(0, (currentTime.getHours() - START_HOUR) * 70) + (currentTime.getMinutes() / 60) * 70}px`, // Keep dynamic positioning
                }}
              >
                <div className={styles.currentTimeDotClassName}></div> {/* Apply style */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayView;
