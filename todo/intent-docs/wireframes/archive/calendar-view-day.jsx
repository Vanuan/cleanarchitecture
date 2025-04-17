import React from "react";
import { Info, Plus, ChevronLeft, ChevronRight } from "lucide-react";

const TodoCalendarDayView = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* App Header - Consistent across all views */}
      <h1 className="text-center text-2xl font-bold mb-6">Todo App</h1>

      {/* Calendar Container */}
      <div className="flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden">
        {/* Calendar Header - Consistent across all views */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-200 gap-3">
          {/* Current period title */}
          <h2 className="text-lg font-semibold text-gray-800">
            March 29, 2025 (Saturday)
            <span className="ml-2 text-sm font-medium text-blue-500 bg-blue-100 px-2 py-0.5 rounded">
              Today
            </span>
          </h2>

          <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
            {/* View Type Selector - Standardized to 3 views */}
            <div className="flex rounded-md shadow-sm">
              <button className="px-4 py-2 text-sm font-medium rounded-l-md bg-white text-gray-700 hover:bg-gray-50 border border-gray-300">
                Month
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 border-t border-b border-gray-300">
                Week
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-r-md bg-blue-500 text-white">
                Day
              </button>
            </div>

            {/* Navigation Controls - Consistent across all views */}
            <div className="flex rounded-md shadow-sm">
              <button
                className="p-2 bg-white border border-gray-300 rounded-l-md text-gray-700 hover:bg-gray-50"
                aria-label="Previous"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="px-4 py-2 bg-white border-t border-b border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Today
              </button>
              <button
                className="p-2 bg-white border border-gray-300 rounded-r-md text-gray-700 hover:bg-gray-50"
                aria-label="Next"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Day Navigation Header - Specific to Day View */}
        <div className="grid grid-cols-7 w-full border-b border-gray-200 bg-white sticky top-0 z-10 divide-x divide-gray-100">
          {/* Monday */}
          <button className="flex flex-col items-center py-3 transition-colors w-full hover:bg-gray-50">
            <span className="text-xs font-medium text-gray-500">Mon</span>
            <span className="text-lg">24</span>
          </button>

          {/* Tuesday */}
          <button className="flex flex-col items-center py-3 transition-colors w-full hover:bg-gray-50">
            <span className="text-xs font-medium text-gray-500">Tue</span>
            <span className="text-lg">25</span>
          </button>

          {/* Wednesday */}
          <button className="flex flex-col items-center py-3 transition-colors w-full hover:bg-gray-50">
            <span className="text-xs font-medium text-gray-500">Wed</span>
            <span className="text-lg">26</span>
          </button>

          {/* Thursday */}
          <button className="flex flex-col items-center py-3 transition-colors w-full hover:bg-gray-50">
            <span className="text-xs font-medium text-gray-500">Thu</span>
            <span className="text-lg">27</span>
          </button>

          {/* Friday */}
          <button className="flex flex-col items-center py-3 transition-colors w-full hover:bg-gray-50">
            <span className="text-xs font-medium text-gray-500">Fri</span>
            <span className="text-lg">28</span>
            <span className="text-xs text-gray-500 mt-1">Yesterday</span>
          </button>

          {/* Saturday - Today */}
          <button className="flex flex-col items-center py-3 transition-colors w-full bg-blue-100">
            <span className="text-xs font-medium text-blue-600">Sat</span>
            <span className="text-lg font-bold text-blue-600">29</span>
            <span className="text-xs text-blue-600 font-medium mt-1">
              Today
            </span>
          </button>

          {/* Sunday */}
          <button className="flex flex-col items-center py-3 transition-colors w-full hover:bg-gray-50">
            <span className="text-xs font-medium text-gray-500">Sun</span>
            <span className="text-lg">30</span>
            <span className="text-xs text-gray-500 mt-1">Tomorrow</span>
          </button>
        </div>

        {/* Day View Content - Specific to Day View */}
        <div className="flex-1 overflow-y-auto">
          {/* All Day Tasks Section */}
          <div className="bg-white mb-3 shadow-sm">
            <div className="p-3 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium text-gray-900">All Day Tasks</h3>
              <div className="text-xs text-gray-500 flex items-center">
                <Info className="w-4 h-4 mr-1" />
                Includes tasks outside business hours
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {/* All-day Task 1 */}
              <div className="p-3">
                <div className="py-2 px-3 bg-blue-50 border-l-4 border-blue-500 rounded mb-2 flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-blue-700">
                      [Project] Team Meeting Prep
                    </h4>
                    <div className="flex items-center mt-1 gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                        Todo
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                        work
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1 text-gray-400 hover:text-blue-500">
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
                      >
                        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* All-day Task 2 */}
                <div className="py-2 px-3 bg-green-50 border-l-4 border-green-500 rounded flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-green-700 line-through">
                      Review sprint backlog
                    </h4>
                    <div className="flex items-center mt-1 gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                        Done
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                        planning
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1 text-gray-400 hover:text-blue-500">
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
                      >
                        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <button className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-blue-500 flex items-center justify-center">
                  <Plus className="h-4 w-4 mr-1" />
                  Add all-day task
                </button>
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <div className="bg-white shadow-sm">
            <div className="p-3 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">Schedule</h3>
            </div>
            <div className="relative">
              {/* Hours with tasks */}
              {[
                "6 AM",
                "7 AM",
                "8 AM",
                "9 AM",
                "10 AM",
                "11 AM",
                "12 PM",
                "1 PM",
                "2 PM",
                "3 PM",
                "4 PM",
                "5 PM",
                "6 PM",
                "7 PM",
              ].map((hour, index) => (
                <div
                  key={hour}
                  className="flex border-b border-gray-100 last:border-b-0"
                >
                  <div className="w-16 py-2 px-2 text-right text-xs text-gray-500 border-r border-gray-100">
                    {hour}
                  </div>
                  <div className="flex-1 min-h-[70px] relative">
                    {/* Morning meeting - 9 AM */}
                    {hour === "9 AM" && (
                      <div className="absolute inset-x-0 top-0 mx-2 p-2 bg-blue-100 border-l-4 border-blue-500 rounded shadow-sm z-10">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-medium text-blue-800">
                              Morning standup
                            </h4>
                            <p className="text-xs text-blue-600">
                              9:00 AM - 9:30 AM
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <button className="p-0.5 text-gray-400 hover:text-blue-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Lunch break - 12 PM */}
                    {hour === "12 PM" && (
                      <div className="absolute inset-x-0 top-0 mx-2 p-2 bg-amber-100 border-l-4 border-amber-500 rounded shadow-sm z-10">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-medium text-amber-800">
                              Lunch break
                            </h4>
                            <p className="text-xs text-amber-600">
                              12:00 PM - 1:00 PM
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <button className="p-0.5 text-gray-400 hover:text-blue-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Project review - 3 PM to 4 PM */}
                    {hour === "3 PM" && (
                      <div className="absolute inset-x-0 top-0 mx-2 p-2 bg-purple-100 border-l-4 border-purple-500 rounded shadow-sm z-10 h-[140px]">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-medium text-purple-800">
                              Project review meeting
                            </h4>
                            <p className="text-xs text-purple-600">
                              3:00 PM - 4:30 PM
                            </p>
                            <div className="mt-1 flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                              <span className="text-xs text-purple-700">
                                Team calendar
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button className="p-0.5 text-gray-400 hover:text-blue-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Current Time Indicator (positioned based on time of day) */}
              <div
                className="absolute left-16 right-0 border-t-2 border-red-500 z-20"
                style={{ top: "32.6667px" }}
              >
                <div className="w-2 h-2 rounded-full bg-red-500 -mt-1 -ml-1"></div>
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

export default TodoCalendarDayView;
