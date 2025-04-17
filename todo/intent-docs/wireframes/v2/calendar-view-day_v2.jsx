import React, { useState } from "react";
import {
  Circle,
  Clock,
  CircleCheck,
  SquarePen,
  Trash2,
  Info,
  Plus,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const ModernTodoCalendarDayView = () => {
  // Current day is April 1st (Tuesday)
  const [activeDay, setActiveDay] = useState(1);
  const [activeDayName, setActiveDayName] = useState("Tue");
  
  // Sample tasks
  const [tasks, setTasks] = useState([
    { id: 1, title: "Double selector", completed: false, date: "Apr 1, 2025" },
    { id: 2, title: "Next/Prev for current week in day view", completed: true, date: "Apr 1, 2025" }
  ]);
  
  // Toggle task completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="transition-all duration-300 ml-0">
      <div className="max-w-7xl mx-auto">
        <div className="w-full max-w-4xl mx-auto">
          {/* View Type Selector */}
          <div className="flex items-stretch bg-white border-gray-200">
            <div className="flex-1 flex">
              <button className="flex-1 flex flex-col items-stretch p-2 text-center transition-colors text-gray-600 hover:bg-gray-50 active:bg-gray-100">
                <span className="text-lg text-gray-600 font-medium">Month</span>
              </button>
              <button className="flex-1 flex flex-col items-stretch p-2 text-center transition-colors text-gray-600 hover:bg-gray-50 active:bg-gray-100">
                <span className="text-lg text-gray-600 font-medium">Week</span>
              </button>
              <button className="flex-1 flex flex-col items-stretch p-2 text-center transition-colors border-b-2 border-emerald-400 bg-gray-50">
                <span className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 font-medium">Day</span>
              </button>
            </div>
            <button className="px-4 py-3 border-l border-gray-200 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600">
              Today
            </button>
          </div>

          {/* Calendar Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col h-full bg-white">
              {/* Day Navigation */}
              <div className="relative">
                <div className="flex items-stretch bg-white shadow-sm">
                  <div className="flex items-center">
                    <button className="p-3 text-blue-500 hover:bg-gray-50">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="h-8 w-px mx-1 bg-gradient-to-r from-blue-200 to-emerald-200"></div>
                  </div>
                  
                  {/* Day selectors */}
                  {[
                    { day: 29, name: "Sat" },
                    { day: 30, name: "Sun" },
                    { day: 31, name: "Mon" },
                    { day: 1, name: "Tue" },
                    { day: 2, name: "Wed" },
                    { day: 3, name: "Thu" },
                    { day: 4, name: "Fri" }
                  ].map((dayInfo) => (
                    <button 
                      key={dayInfo.day}
                      onClick={() => {
                        setActiveDay(dayInfo.day);
                        setActiveDayName(dayInfo.name);
                      }}
                      className={`flex-1 flex flex-col items-stretch p-2 text-center transition-colors ${
                        activeDay === dayInfo.day 
                          ? "border-b-2 border-emerald-400 bg-gray-50" 
                          : "text-gray-600 hover:bg-gray-50 active:bg-gray-100"
                      }`}
                    >
                      <span className="text-xs font-medium text-gray-500">{dayInfo.name}</span>
                      <span 
                        className={`text-lg ${
                          activeDay === dayInfo.day
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600" 
                            : "text-gray-600"
                        } font-medium`}
                      >
                        {dayInfo.day}
                      </span>
                      <span className="text-xs mt-1 text-gray-400 invisible">
                        Yesterday
                      </span>
                    </button>
                  ))}

                  <div className="flex items-center">
                    <div className="h-8 w-px mx-1 bg-gradient-to-r from-blue-200 to-emerald-200"></div>
                    <button className="p-3 text-blue-500 hover:bg-gray-50 rounded-xl">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 overflow-y-auto p-3">
                {/* All Day Tasks */}
                <div className="mb-3 border border-gray-100 rounded-lg overflow-hidden">
                  <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-medium text-gray-700">All Day Tasks</h3>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Info className="h-4 w-4 mr-1 text-gray-400" />
                      Includes tasks outside business hours
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {/* Task list */}
                    {tasks.map(task => (
                      <div key={task.id} className="p-3">
                        <div className="w-full">
                          <div className="flex items-start gap-3">
                            <button 
                              className={`mt-1 transition-colors ${task.completed ? "text-emerald-500 hover:text-emerald-600" : "text-gray-400 hover:text-blue-500"}`} 
                              aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
                              onClick={() => toggleTaskCompletion(task.id)}
                            >
                              <span className="h-5 w-5">
                                {task.completed ? (
                                  <CircleCheck className="text-emerald-500 hover:text-emerald-600" />
                                ) : (
                                  <Circle className="text-gray-400 hover:text-blue-500" />
                                )}
                              </span>
                            </button>
                            <div className="flex-1 min-w-0">
                              <h3 className={`${task.completed ? "font-medium line-through text-gray-500" : "text-gray-900 font-medium"}`}>
                                {task.title}
                              </h3>
                              <div className="flex items-center gap-2 flex-wrap mt-2">
                                <span className="text-xs px-2 py-1 rounded-full flex items-center gap-1 border bg-gray-100 text-gray-600 border-gray-200">
                                  <Clock className="h-4 w-4 mr-0.5" />
                                  {task.date}
                                </span>
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              <button aria-label="Edit task" className="p-1.5 rounded-full transition-colors text-gray-400 hover:text-blue-500 hover:bg-blue-50">
                                <SquarePen className="h-4 w-4" />
                              </button>
                              <button aria-label="Delete task" className="p-1.5 rounded-full transition-colors text-gray-400 hover:text-red-500 hover:bg-red-50">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add Task Button */}
                    <div className="p-3">
                      <button className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-blue-500 flex items-center justify-center hover:bg-blue-50 active:bg-blue-100">
                        <Plus className="h-4 w-4 mr-1" />
                        Add all-day task
                      </button>
                    </div>
                  </div>
                </div>

                {/* Schedule Section */}
                <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
                  <div className="p-3 border-b border-gray-100">
                    <h3 className="font-medium text-gray-700">Schedule</h3>
                  </div>
                  <div className="relative">
                    {/* Hour rows */}
                    {[
                      "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", 
                      "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", 
                      "6 PM", "7 PM"
                    ].map((hour, index) => (
                      <div key={hour} className="flex border-b border-gray-100 last:border-b-0">
                        <div className="w-16 py-2 px-2 text-right text-xs text-gray-500 border-r border-gray-100">
                          {hour}
                        </div>
                        <div className="flex-1 min-h-[70px] relative hover:bg-blue-50 cursor-pointer transition-colors">
                          {/* Event example at 12 PM */}
                          {hour === "12 PM" && (
                            <div 
                              className="absolute inset-x-2 rounded-md p-2 overflow-hidden bg-blue-50 hover:bg-blue-100 transition-colors border-l-4 border-blue-400 cursor-default" 
                              style={{ top: "4.66667px", height: "70px" }}
                            >
                              <div className="font-medium text-sm text-blue-800">Current month/week</div>
                              <div className="flex items-center text-xs text-blue-700 mt-1">
                                <Clock className="h-3 w-3 mr-1" />
                                12:04 PM
                              </div>
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
      </div>
    </div>
  );
};

export default ModernTodoCalendarDayView;
