import React, { useState } from "react";
import * as DateFns from "date-fns"; // or your preferred date library
import tw from "tailwind-styled-components";
import { TodoViewModel } from "../../../viewmodels/TodoViewModel";

interface TodoCalendarViewProps {
  items: TodoViewModel[];
  config: any;
  getItemId: (item: TodoViewModel) => string;
}

const CalendarContainer = tw.div`
  w-full max-w-md mx-auto p-4
`;

const CalendarHeader = tw.div`
  flex items-center justify-between mb-2
`;

const CalendarButton = tw.button`
  px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100
`;

const CalendarTitle = tw.span`
  text-lg font-medium
`;

const CalendarGrid = tw.div`
  grid grid-cols-7 gap-1
`;

const WeekdayHeader = tw.div`
  text-center text-sm text-gray-500
`;

const DayButton = tw.button<{ $isToday?: boolean; $isSelected?: boolean }>`
  px-2 py-1 rounded-md text-center
  ${(props) =>
    props.$isToday
      ? "bg-blue-500 text-white"
      : "text-gray-700 hover:bg-gray-100"}
  ${(props) => (props.$isSelected ? "bg-green-500 text-white" : "")}
  focus:outline-none focus:ring-2 focus:ring-blue-500
`;

const SelectedDateDisplay = tw.div`
  mt-4
`;

const TodoCalendarView: React.FC<TodoCalendarViewProps> = ({
  items,
  config,
  getItemId,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(DateFns.subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(DateFns.addMonths(currentMonth, 1));
  };

  const getDaysInMonth = () => {
    const firstDayOfMonth = DateFns.startOfMonth(currentMonth);
    const lastDayOfMonth = DateFns.endOfMonth(currentMonth);
    const firstDayOfWeek = DateFns.startOfWeek(firstDayOfMonth, {
      weekStartsOn: 0,
    }); // Sunday
    const lastDayOfWeek = DateFns.endOfWeek(lastDayOfMonth, {
      weekStartsOn: 0,
    });
    const days: Date[] = [];

    let currentDay = firstDayOfWeek;
    while (currentDay <= lastDayOfWeek) {
      days.push(currentDay);
      currentDay = DateFns.addDays(currentDay, 1);
    }

    return days;
  };

  const daysInMonth = getDaysInMonth();

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarButton onClick={prevMonth}>Previous</CalendarButton>
        <CalendarTitle>
          {DateFns.format(currentMonth, "MMMM yyyy")}
        </CalendarTitle>
        <CalendarButton onClick={nextMonth}>Next</CalendarButton>
      </CalendarHeader>

      <CalendarGrid>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <WeekdayHeader key={day}>{day}</WeekdayHeader>
        ))}

        {daysInMonth.map((day, index) => {
          const isToday = DateFns.isToday(day);
          const isSelected =
            selectedDate && DateFns.isSameDay(selectedDate, day);
          const isInCurrentMonth = DateFns.isSameMonth(day, currentMonth);

          return (
            <DayButton
              key={index}
              $isToday={isToday}
              $isSelected={isSelected}
              disabled={!isInCurrentMonth}
              onClick={() => setSelectedDate(day)}
            >
              {DateFns.getDate(day)}
            </DayButton>
          );
        })}
      </CalendarGrid>

      {selectedDate && (
        <SelectedDateDisplay>
          Selected Date: {DateFns.format(selectedDate, "PPPP")}
        </SelectedDateDisplay>
      )}
    </CalendarContainer>
  );
};

export default TodoCalendarView;
