import { useCalendarNavigation, useMonthData } from "../calendar-hooks";
import { format } from "date-fns";

const CalendarHeader: React.FC = () => {
  const { today, next, prev, view, setView, currentDate } =
    useCalendarNavigation();
  const { monthName, year } = useMonthData();

  // Generate dynamic title based on view
  const getViewTitle = () => {
    switch (view) {
      case "day":
      case "month":
      case "week":
      default:
        return `${monthName} ${year}`;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-200 gap-3">
      <h2 className="text-lg font-semibold text-gray-800">{getViewTitle()}</h2>

      <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
        <div className="flex rounded-md shadow-sm">
              <button
                onClick={() => setView("month")}
                className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                  view === "month"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setView("week")}
                className={`px-4 py-2 text-sm font-medium ${
                  view === "week"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-t border-b border-gray-300"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setView("day")}
                className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                  view === "day"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                Day
              </button>
        </div>

        <div className="flex rounded-md shadow-sm">
          <button
            onClick={prev}
            className="p-2 bg-white border border-gray-300 rounded-l-md text-gray-700 hover:bg-gray-50"
            aria-label="Previous"
          >
            &lt;
          </button>
          <button
            onClick={today}
            className="px-4 py-2 bg-white border-t border-b border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Today
          </button>
          <button
            onClick={next}
            className="p-2 bg-white border border-gray-300 rounded-r-md text-gray-700 hover:bg-gray-50"
            aria-label="Next"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
