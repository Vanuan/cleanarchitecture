import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TodoCalendarMonthView = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* App Header - Consistent across all views */}
      <h1 className="text-center text-2xl font-bold mb-6">Todo App</h1>

      {/* Calendar Container */}
      <div className="flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden">
        {/* Calendar Header - Consistent across all views */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-200 gap-3">
          {/* Current period title */}
          <h2 className="text-lg font-semibold text-gray-800">March 2025</h2>

          <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
            {/* View Type Selector - Standardized to 3 views */}
            <div className="flex rounded-md shadow-sm">
              <button className="px-4 py-2 text-sm font-medium rounded-l-md bg-blue-500 text-white">
                Month
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 border-t border-b border-gray-300">
                Week
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-r-md bg-white text-gray-700 hover:bg-gray-50 border border-gray-300">
                Day
              </button>
            </div>

            {/* Navigation Controls - Consistent across all views */}
            <div className="flex rounded-md shadow-sm">
              <button
                className="p-2 bg-white border border-gray-300 rounded-l-md text-gray-700 hover:bg-gray-50"
                aria-label="Previous"
                title="Previous Month (February 2025)"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="px-4 py-2 bg-white border-t border-b border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Today
              </button>
              <button
                className="p-2 bg-white border border-gray-300 rounded-r-md text-gray-700 hover:bg-gray-50"
                aria-label="Next"
                title="Next Month (April 2025)"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Month Navigation Header - Similar to Day Navigation Header */}
        <div className="grid grid-cols-7 w-full border-b border-gray-200 bg-white sticky top-0 z-10 divide-x divide-gray-100">
          {/* January */}
          <button className="flex flex-col items-center py-3 transition-colors w-full hover:bg-gray-50">
            <span className="text-xs font-medium text-gray-500">2025</span>
            <span className="text-lg font-medium text-gray-600">Jan</span>
          </button>

          {/* February */}
          <button className="flex flex-col items-center py-3 transition-colors w-full hover:bg-gray-50">
            <span className="text-xs font-medium text-gray-500">2025</span>
            <span className="text-lg font-medium text-gray-600">Feb</span>
            <span className="text-xs text-gray-500 mt-1">Previous</span>
          </button>

          {/* March - Current Month */}
          <button className="flex flex-col items-center py-3 transition-colors w-full bg-blue-100">
            <span className="text-xs font-medium text-blue-600">2025</span>
            <span className="text-lg font-bold text-blue-700">Mar</span>
            <span className="text-xs text-blue-600 font-medium mt-1">
              Current
            </span>
          </button>

          {/* April */}
          <button className="flex flex-col items-center py-3 transition-colors w-full hover:bg-gray-50">
            <span className="text-xs font-medium text-gray-500">2025</span>
            <span className="text-lg font-medium text-gray-600">Apr</span>
            <span className="text-xs text-gray-500 mt-1">Next</span>
          </button>

          {/* May */}
          <button className="flex flex-col items-center py-3 transition-colors w-full hover:bg-gray-50">
            <span className="text-xs font-medium text-gray-500">2025</span>
            <span className="text-lg font-medium text-gray-600">May</span>
          </button>

          {/* June */}
          <button className="flex flex-col items-center py-3 transition-colors w-full hover:bg-gray-50">
            <span className="text-xs font-medium text-gray-500">2025</span>
            <span className="text-lg font-medium text-gray-600">Jun</span>
          </button>

          {/* July */}
          <button className="flex flex-col items-center py-3 transition-colors w-full hover:bg-gray-50">
            <span className="text-xs font-medium text-gray-500">2025</span>
            <span className="text-lg font-medium text-gray-600">Jul</span>
          </button>
        </div>

        {/* Calendar Body - Month View Specific */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {/* Legend */}
            <div className="flex justify-end mb-2 text-xs">
              <div className="flex items-center mr-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                <span>Tasks</span>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 text-center bg-gray-50">
                <div className="py-2 border-b border-gray-200 font-medium text-gray-600">
                  Mon
                </div>
                <div className="py-2 border-b border-gray-200 font-medium text-gray-600">
                  Tue
                </div>
                <div className="py-2 border-b border-gray-200 font-medium text-gray-600">
                  Wed
                </div>
                <div className="py-2 border-b border-gray-200 font-medium text-gray-600">
                  Thu
                </div>
                <div className="py-2 border-b border-gray-200 font-medium text-gray-600">
                  Fri
                </div>
                <div className="py-2 border-b border-gray-200 font-medium text-gray-600">
                  Sat
                </div>
                <div className="py-2 border-b border-gray-200 font-medium text-gray-600">
                  Sun
                </div>
              </div>

              {/* Calendar Weeks */}
              <div className="bg-white">
                {/* Week 1 */}
                <div className="grid grid-cols-7">
                  {[24, 25, 26, 27, 28, 1, 2].map((date) => (
                    <div
                      key={`week1-${date}`}
                      className={`min-h-24 p-2 border border-gray-200 ${
                        date < 10 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span
                          className={`text-sm font-medium ${
                            date < 10 ? "text-gray-900" : "text-gray-400"
                          }`}
                        >
                          {date}
                        </span>
                        {date === 1 && (
                          <span className="text-xs text-gray-500">Mar</span>
                        )}
                        {date === 28 && (
                          <span className="text-xs text-gray-500">Feb</span>
                        )}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1"></div>
                    </div>
                  ))}
                </div>

                {/* Week with tasks */}
                <div className="grid grid-cols-7">
                  {[24, 25, 26, 27, 28, 29, 30].map((date) => (
                    <div
                      key={`week5-${date}`}
                      className={`min-h-24 p-2 border border-gray-200 ${date === 29 ? "bg-blue-50" : ""}`}
                    >
                      <div className="flex justify-between items-start">
                        <span
                          className={`text-sm ${date === 29 ? "font-bold text-blue-600" : "font-medium"}`}
                        >
                          {date}
                        </span>
                        {date === 26 && (
                          <div className="text-xs flex items-center">
                            <span className="text-gray-500 mr-1">0/1</span>
                          </div>
                        )}
                        {date === 28 && (
                          <div className="text-xs flex items-center">
                            <span className="text-gray-500 mr-1">1/3</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {date === 26 && (
                          <div className="flex items-center bg-blue-100 px-2 py-1 rounded-md">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                            <span className="text-xs text-blue-800">1</span>
                          </div>
                        )}
                        {date === 28 && (
                          <div className="flex items-center bg-blue-100 px-2 py-1 rounded-md">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                            <span className="text-xs text-blue-800">3</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Todo Button - Consistent floating button across all views */}
      <button className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>
  );
};

export default TodoCalendarMonthView;
