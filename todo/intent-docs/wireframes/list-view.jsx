import React from "react";
import { Circle, CircleCheck, Tag, Trash2, SquarePen } from "lucide-react";

const TodoListView = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Todo App</h1>

      <div className="flex justify-end mb-4 gap-2">
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors">
          Add Todo
        </button>
        <button
          aria-pressed="true"
          className="px-4 py-2 rounded-md transition-colors duration-200 bg-blue-100 text-blue-600"
        >
          List
        </button>
        <button
          aria-pressed="false"
          className="px-4 py-2 rounded-md transition-colors duration-200 text-gray-600 hover:bg-gray-100"
        >
          Table
        </button>
        <button
          aria-pressed="false"
          className="px-4 py-2 rounded-md transition-colors duration-200 text-gray-600 hover:bg-gray-100"
        >
          Board
        </button>
        <button
          aria-pressed="false"
          className="px-4 py-2 rounded-md transition-colors duration-200 text-gray-600 hover:bg-gray-100"
        >
          Calendar
        </button>
      </div>

      <ul className="flex flex-col gap-4">
        {/* Task Item - Incomplete */}
        <li>
          <div className="bg-white rounded-lg shadow-sm p-4 transition-all duration-200 hover:shadow-md border border-gray-100">
            <div className="flex items-start gap-3">
              <button className="mt-1 text-gray-400 hover:text-blue-500 transition-colors">
                <Circle className="h-5 w-5" />
              </button>
              <div className="flex-1 min-w-0">
                <h3 className="text-gray-900 font-medium">
                  [Project] Meeting with team
                </h3>
                <div className="flex items-center gap-2 flex-wrap mt-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                    Todo
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                    work
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                    meeting
                  </span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 className="h-5 w-5" />
              </button>
              <button className="text-gray-400 hover:text-blue-500 transition-colors">
                <SquarePen className="h-5 w-5" />
              </button>
            </div>
          </div>
        </li>

        {/* Task Item - Incomplete */}
        <li>
          <div className="bg-white rounded-lg shadow-sm p-4 transition-all duration-200 hover:shadow-md border border-gray-100">
            <div className="flex items-start gap-3">
              <button className="mt-1 text-gray-400 hover:text-blue-500 transition-colors">
                <Circle className="h-5 w-5" />
              </button>
              <div className="flex-1 min-w-0">
                <h3 className="text-gray-900 font-medium">Jobs</h3>
                <div className="flex items-center gap-2 flex-wrap mt-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                    Todo
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                    Due: Mar 28, 2025
                  </span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 className="h-5 w-5" />
              </button>
              <button className="text-gray-400 hover:text-blue-500 transition-colors">
                <SquarePen className="h-5 w-5" />
              </button>
            </div>
          </div>
        </li>

        {/* Task Item - Incomplete */}
        <li>
          <div className="bg-white rounded-lg shadow-sm p-4 transition-all duration-200 hover:shadow-md border border-gray-100">
            <div className="flex items-start gap-3">
              <button className="mt-1 text-gray-400 hover:text-blue-500 transition-colors">
                <Circle className="h-5 w-5" />
              </button>
              <div className="flex-1 min-w-0">
                <h3 className="text-gray-900 font-medium">Something</h3>
                <div className="flex items-center gap-2 flex-wrap mt-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                    Todo
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                    Due: Mar 26, 2025
                  </span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 className="h-5 w-5" />
              </button>
              <button className="text-gray-400 hover:text-blue-500 transition-colors">
                <SquarePen className="h-5 w-5" />
              </button>
            </div>
          </div>
        </li>

        {/* Task Item - Completed */}
        <li>
          <div className="rounded-lg shadow-sm p-4 transition-all duration-200 hover:shadow-md border border-gray-100 bg-gray-50">
            <div className="flex items-start gap-3">
              <button className="mt-1 transition-colors text-green-500 hover:text-green-600">
                <CircleCheck className="h-5 w-5" />
              </button>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium line-through text-gray-500">
                  Apartment shopping
                </h3>
                <div className="flex items-center gap-2 flex-wrap mt-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                    Done
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                    Due: Mar 28, 2025
                  </span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 className="h-5 w-5" />
              </button>
              <button className="text-gray-400 hover:text-blue-500 transition-colors">
                <SquarePen className="h-5 w-5" />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default TodoListView;
