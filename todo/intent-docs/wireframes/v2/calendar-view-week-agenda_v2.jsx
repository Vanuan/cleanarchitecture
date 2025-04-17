import React, { useState } from "react";
import {
  Circle,
  Clock,
  CircleCheck,
  SquarePen,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const ModernCalendarWeekView = () => {
  // State for active week
  const [activeWeek, setActiveWeek] = useState("31-6");
  const [activeWeekMonth, setActiveWeekMonth] = useState("Mar/Apr");
  
  // Sample tasks
  const [tasks, setTasks] = useState([
    { id: 1, title: "Double selector", completed: false, date: "Apr 1, 2025" },
    { id: 2, title: "Current month/week", completed: false, date: "Apr 1, 2025" },
    { id: 3, title: "Next/Prev for current week in day view", completed: true, date: "Apr 1, 2025" },
    { id: 4, title: "Make the app suitable for more entity types", completed: false, date: "Apr 2, 2025" },
    { id: 5, title: "Green today on day view", completed: true, date: "Apr 2, 2025" },
    { id: 6, title: "Consistent plus button for mobile screens", completed: false, date: "Apr 2, 2025" },
    { id: 7, title: "Integrate into CRM", completed: true, date: "Apr 2, 2025" }
  ]);
  
  // Toggle task completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };
  
  // Week options for selector
  const weekOptions = [
    { week: "24-30", month: "Mar", label: "" },
    { week: "31-6", month: "Mar/Apr", label: "" },
    { week: "7-13", month: "Apr", label: "Last Week" }
  ];
  
  // Days of the week
  const daysOfWeek = [
    { name: "Monday", date: "March 31, 2025" },
    { name: "Tuesday", date: "April 1, 2025" },
    { name: "Wednesday", date: "April 2, 2025" },
    { name: "Thursday", date: "April 3, 2025" },
    { name: "Friday", date: "April 4, 2025" },
    { name: "Saturday", date: "April 5, 2025" },
    { name: "Sunday", date: "April 6, 2025" }
  ];
  
  // Get tasks for a specific date
  const getTasksForDate = (dateString) => {
    return tasks.filter(task => task.date === dateString);
  };
  
  return (
    <div className="transition-all duration-300 ml-0">
      <div className="max-w-7xl mx-auto">
        <div className="w-full max-w-4xl mx-auto">
          {/* View selector row */}
          <div className="flex items-stretch bg-white border-gray-200">
            <div className="flex-1 flex">
              <button className="flex-1 flex flex-col items-stretch p-2 text-center transition-colors text-gray-600 hover:bg-gray-50 active:bg-gray-100">
                <span className="text-lg text-gray-600 font-medium">Month</span>
              </button>
              <button className="flex-1 flex flex-col items-stretch p-2 text-center transition-colors border-b-2 border-emerald-400 bg-gray-50">
                <span className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 font-medium">Week</span>
              </button>
              <button className="flex-1 flex flex-col items-stretch p-2 text-center transition-colors text-gray-600 hover:bg-gray-50 active:bg-gray-100">
                <span className="text-lg text-gray-600 font-medium">Day</span>
              </button>
            </div>
            <button className="px-4 py-3 border-l border-gray-200 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600">
              Today
            </button>
          </div>
          
          {/* Week navigation row */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col h-full">
              <div className="relative">
                <div className="flex items-stretch bg-white shadow-sm">
                  <div className="flex items-center">
                    <button className="p-3 text-blue-500 hover:bg-gray-50">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="h-8 w-px mx-1 bg-gradient-to-r from-blue-200 to-emerald-200"></div>
                  </div>
                  
                  {/* Week selector buttons */}
                  {weekOptions.map((option) => (
                    <button 
                      key={option.week}
                      className={`flex-1 flex flex-col items-stretch p-2 text-center transition-colors ${
                        option.week === activeWeek 
                          ? "border-b-2 border-emerald-400 bg-gray-50" 
                          : "text-gray-600 hover:bg-gray-50 active:bg-gray-100"
                      }`}
                      onClick={() => {
                        setActiveWeek(option.week);
                        setActiveWeekMonth(option.month);
                      }}
                    >
                      <span className="text-xs font-medium text-gray-500">{option.month}</span>
                      <span className={`text-lg ${
                        option.week === activeWeek
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600" 
                          : "text-gray-600"
                        } font-medium`}
                      >
                        {option.week}
                      </span>
                      <span className="text-xs mt-1 text-gray-400 invisible">
                        {option.label}
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
              
              {/* Week content - Days */}
              <div className="flex-1 overflow-y-auto">
                {daysOfWeek.map((day, index) => {
                  const dayTasks = getTasksForDate(day.date);
                  const hasNoTasks = dayTasks.length === 0;
                  
                  return (
                    <div key={day.name} className={`border-b border-gray-100 ${hasNoTasks ? "bg-white" : ""}`}>
                      {/* Day header */}
                      <div className="p-3 font-medium flex items-center border-b border-gray-100">
                        <span className="text-lg text-gray-700">{day.name}</span>
                        <span className="text-sm text-gray-500 ml-2">{day.date}</span>
                      </div>
                      
                      {/* Day content */}
                      {hasNoTasks ? (
                        // Empty day
                        <div className="p-6 text-center">
                          <p className="text-gray-500 italic">No tasks scheduled</p>
                          <button className="mt-2 text-blue-500 flex items-center justify-center mx-auto hover:text-blue-700">
                            <Plus className="h-4 w-4 mr-1" />
                            Add task
                          </button>
                        </div>
                      ) : (
                        // Day with tasks
                        <div className="p-4 space-y-3">
                          {dayTasks.map(task => (
                            <div 
                              key={task.id} 
                              className={`bg-white rounded-lg p-0 border border-gray-200 overflow-hidden ${task.completed ? "opacity-70" : ""}`}
                            >
                              <div className="w-full">
                                <div className="flex items-start gap-3">
                                  {/* Complete/Incomplete toggle */}
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
                                  
                                  {/* Task details */}
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
                                  
                                  {/* Action buttons */}
                                  <div className="flex space-x-1">
                                    <button 
                                      aria-label="Edit task" 
                                      className="p-1.5 rounded-full transition-colors text-gray-400 hover:text-blue-500 hover:bg-blue-50"
                                    >
                                      <SquarePen className="h-4 w-4" />
                                    </button>
                                    <button 
                                      aria-label="Delete task" 
                                      className="p-1.5 rounded-full transition-colors text-gray-400 hover:text-red-500 hover:bg-red-50"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          {/* Add task button */}
                          <button className="w-full mt-1 py-2 border border-dashed border-gray-300 rounded-lg text-blue-500 flex items-center justify-center hover:bg-blue-50 active:bg-blue-100">
                            <Plus className="h-4 w-4 mr-1" />
                            Add task
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernCalendarWeekView;
