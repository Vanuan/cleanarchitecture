import React from "react";

import tw from "tailwind-styled-components";
import { TodoViewModel } from "../../../viewmodels/TodoViewModel";

interface TodoCalendarViewProps<T> {
  items: T[];
  config: any;
  getItemId: (item: T) => string;
}

const CalendarComponent = tw.div`
   text-center
`;

const TodoCalendarView: React.FC<TodoCalendarViewProps<TodoViewModel>> = ({
  items,
  config,
  getItemId,
}) => {
  return (
    <CalendarComponent>
      You can place your Calendar with {items.length} events
    </CalendarComponent>
  );
};
export default TodoCalendarView;
