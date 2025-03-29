import React from "react";
import {
  Check,
  Circle,
  ChevronLeft,
  ChevronRight,
  Tag,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

const TodoCalendarWeekView = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* App Header - Consistent across all views */}
      <h1 className="text-center text-2xl font-bold mb-6">Todo App</h1>

      {/* Calendar Container */}
      <div className="flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden bg-white">
        {/* Calendar Header - Consistent across all views */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-200 gap-3">
          {/* Current period title */}
          <h2 className="text-lg font-semibold text-gray-800">
            <span className="text-blue-600">Week 13</span> • Mar 24-30, 2025
            <span className="ml-2 text-sm font-medium text-blue-500 bg-blue-100 px-2 py-0.5 rounded">
              This week
            </span>
          </h2>

          <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
            {/* View Type Selector - Standardized to 3 views */}
            <div className="flex rounded-md shadow-sm">
              <button className="px-4 py-2 text-sm font-medium rounded-l-md bg-white text-gray-700 hover:bg-gray-50 border border-gray-300">
                Month
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-blue-500 text-white">
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

        {/* Week Navigation - Specific to Week View */}
        <div className="grid grid-cols-3 bg-white border-b border-gray-200">
          <button className="flex flex-col items-center py-4 hover:bg-gray-50 border-r border-gray-200">
            <span className="text-sm text-gray-500">Previous</span>
            <span className="text-base font-medium">Week 12</span>
            <span className="text-sm text-gray-500">Mar 17-23</span>
          </button>
          <div className="flex flex-col items-center justify-center py-4 bg-blue-50">
            <span className="text-sm text-blue-600">Current</span>
            <span className="text-base font-semibold text-blue-700">
              Week 13
            </span>
            <span className="text-sm text-blue-600">Mar 24-30</span>
          </div>
          <button className="flex flex-col items-center py-4 hover:bg-gray-50 border-l border-gray-200">
            <span className="text-sm text-gray-500">Next</span>
            <span className="text-base font-medium">Week 14</span>
            <span className="text-sm text-gray-500">Mar 31-Apr 6</span>
          </button>
        </div>

        {/* Scrollable Week Agenda - Week View Specific */}
        <div className="flex-1 overflow-y-auto">
          <div className="divide-y divide-gray-200">
            {/* Monday */}
            <div className="bg-gray-50">
              <div className="p-3 font-medium flex items-center">
                <span className="text-lg">Monday</span>
                <span className="text-sm text-gray-500 ml-2">
                  March 24, 2025
                </span>
              </div>
              <div className="p-6 text-center text-gray-500">
                <p>No tasks scheduled</p>
                <button className="mt-2 text-blue-500 flex items-center justify-center mx-auto hover:text-blue-700">
                  <Plus className="h-4 w-4 mr-1" /> Add task
                </button>
              </div>
            </div>

            {/* Wednesday */}
            <div>
              <div className="p-3 font-medium flex items-center">
                <span className="text-lg">Wednesday</span>
                <span className="text-sm text-gray-500 ml-2">
                  March 26, 2025
                </span>
              </div>
              <div className="p-4">
                <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3">
                  <div className="flex items-start">
                    <button className="mt-1 mr-3 text-gray-300 hover:text-blue-500">
                      <Circle className="h-5 w-5" />
                    </button>
                    <div className="flex-1">
                      <h4 className="text-gray-900">Something</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          <Tag className="h-3 w-3 mr-1" /> Todo
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                          Due: Mar 26, 2025
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <button className="text-gray-400 hover:text-blue-500">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-1 py-2 border border-dashed border-gray-300 rounded-lg text-blue-500 flex items-center justify-center hover:bg-blue-50">
                  <Plus className="h-4 w-4 mr-1" />
                  Add task
                </button>
              </div>
            </div>

            {/* Friday - Today */}
            <div className="bg-blue-50">
              <div className="p-3 font-medium flex items-center">
                <span className="text-lg text-blue-700">Friday</span>
                <span className="text-sm text-blue-600 ml-2">
                  March 28, 2025
                </span>
                <span className="ml-2 text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded">
                  Today
                </span>
              </div>
              <div className="p-4">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 mb-3">
                  <div className="flex items-start">
                    <button className="mt-1 mr-3 text-green-500">
                      <Check className="h-5 w-5" />
                    </button>
                    <div className="flex-1">
                      <h4 className="text-gray-500 line-through">
                        Apartment Shopping
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          <Tag className="h-3 w-3 mr-1" /> Done
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                          errands
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <button className="text-gray-400 hover:text-blue-500">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3">
                  <div className="flex items-start">
                    <button className="mt-1 mr-3 text-gray-300 hover:text-blue-500">
                      <Circle className="h-5 w-5" />
                    </button>
                    <div className="flex-1">
                      <h4 className="text-gray-900">Jobs</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          <Tag className="h-3 w-3 mr-1" /> Todo
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                          Due: Mar 28, 2025
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <button className="text-gray-400 hover:text-blue-500">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-1 py-2 border border-dashed border-gray-300 rounded-lg text-blue-500 flex items-center justify-center hover:bg-blue-50">
                  <Plus className="h-4 w-4 mr-1" />
                  Add task
                </button>
              </div>
            </div>

            {/* Saturday */}
            <div>
              <div className="p-3 font-medium flex items-center">
                <span className="text-lg">Saturday</span>
                <span className="text-sm text-gray-500 ml-2">
                  March 29, 2025
                </span>
                <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  Tomorrow
                </span>
              </div>
              <div className="p-6 text-center text-gray-500">
                <p>No tasks scheduled</p>
                <button className="mt-2 text-blue-500 flex items-center justify-center mx-auto hover:text-blue-700">
                  <Plus className="h-4 w-4 mr-1" /> Add task
                </button>
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

export default TodoCalendarWeekView;
