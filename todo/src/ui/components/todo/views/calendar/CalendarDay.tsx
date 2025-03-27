import { TodoViewModel } from "../../../../viewmodels/TodoViewModel";

const CalendarDay: React.FC<{
  day: {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    dayOfMonth: number;
  };
  todos: TodoViewModel[];
  renderItem: (todo: TodoViewModel, viewType: string) => React.ReactNode;
}> = ({ day, todos, renderItem }) => {
  return (
    <div
      className={`
      border border-gray-200 min-h-[100px] p-1 relative
      ${!day.isCurrentMonth ? "bg-gray-50" : "bg-white"}
      ${day.isToday ? "ring-2 ring-blue-500 ring-inset" : ""}
    `}
    >
      <div className="text-right">
        <span
          className={`
          text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center
          ${day.isToday ? "bg-blue-500 text-white" : "text-gray-700"}
          ${!day.isCurrentMonth ? "text-gray-400" : ""}
        `}
        >
          {day.dayOfMonth}
        </span>
      </div>

      <div className="mt-1 space-y-1 max-h-24 overflow-y-auto">
        {todos.map((todo) => renderItem(todo, "calendar"))}
      </div>
    </div>
  );
};

export default CalendarDay;
