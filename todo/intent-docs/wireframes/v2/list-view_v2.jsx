import React, { useState } from "react";
import {
  Circle,
  Clock,
  CircleCheck,
  SquarePen,
  Trash2,
  Tag,
  Plus,
  CalendarDays,
  Layout,
  List,
  Table,
  LayoutGrid
} from "lucide-react";

const ModernTodoListView = () => {
  // Sample tasks
  const [tasks, setTasks] = useState([
    { id: 1, title: "Double selector", completed: false, date: "Apr 1, 2025" },
    { id: 2, title: "Current month/week", completed: false, date: "Apr 1, 2025" },
    { id: 3, title: "Next/Prev for current week in day view", completed: true, date: "Apr 1, 2025" },
    { id: 4, title: "Make the app suitable for more entity types", completed: false, date: "Apr 2, 2025" },
    { id: 5, title: "Green today on day view", completed: true, date: "Apr 2, 2025" },
    { id: 6, title: "Consistent plus button for mobile screens", completed: false, date: "Apr 2, 2025" },
    { id: 7, title: "Integrate into CRM", completed: true, date: "Apr 2, 2025" },
    { id: 8, title: "Atomic design", completed: false, date: "" },
    { id: 9, title: "New navigation sidebar", completed: true, date: "" },
    { id: 10, title: "Add description", completed: false, date: "" }
  ]);
  
  // Active view mode
  const [activeView, setActiveView] = useState("list");
  
  // Toggle task completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Todo App</h1>
        
        {/* View selector and add button */}
        <div className="flex gap-2">
          <button 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-emerald-500 text-white hover:from-blue-600 hover:to-emerald-600 transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add Todo
          </button>
          
          {/* View toggle buttons */}
          <div className="flex rounded-md shadow-sm">
            <button 
              onClick={() => setActiveView("list")}
              className={`flex items-center gap-1 px-3 py-2 rounded-l-md ${
                activeView === "list" 
                  ? "bg-blue-100 text-blue-600" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </button>
            <button 
              onClick={() => setActiveView("table")}
              className={`flex items-center gap-1 px-3 py-2 ${
                activeView === "table" 
                  ? "bg-blue-100 text-blue-600" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Table className="h-4 w-4" />
              <span className="hidden sm:inline">Table</span>
            </button>
            <button 
              onClick={() => setActiveView("board")}
              className={`flex items-center gap-1 px-3 py-2 ${
                activeView === "board" 
                  ? "bg-blue-100 text-blue-600" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Board</span>
            </button>
            <button 
              onClick={() => setActiveView("calendar")}
              className={`flex items-center gap-1 px-3 py-2 rounded-r-md ${
                activeView === "calendar" 
                  ? "bg-blue-100 text-blue-600" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <CalendarDays className="h-4 w-4" />
              <span className="hidden sm:inline">Calendar</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Task List */}
      <ul className="flex flex-col gap-3">
        {tasks.map(task => (
          <li key={task.id}>
            <div className="w-full bg-white rounded-lg shadow-sm p-3 border border-gray-100 transition-all duration-200 hover:shadow-md">
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
                  
                  {/* Task metadata */}
                  {(task.date || task.completed !== undefined) && (
                    <div className="flex items-center gap-2 flex-wrap mt-2">
                      {task.date && (
                        <span className="text-xs px-2 py-1 rounded-full flex items-center gap-1 border bg-gray-100 text-gray-600 border-gray-200">
                          <Clock className="h-4 w-4 mr-0.5" />
                          {task.date}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Task actions */}
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
          </li>
        ))}
        
        {/* Add task button at bottom */}
        <li>
          <button className="w-full py-3 border border-dashed border-gray-300 rounded-lg text-blue-500 flex items-center justify-center hover:bg-blue-50 active:bg-blue-100">
            <Plus className="h-4 w-4 mr-2" />
            Add new task
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ModernTodoListView;
