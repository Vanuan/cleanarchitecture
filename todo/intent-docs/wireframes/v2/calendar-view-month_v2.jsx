import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const ModernCalendarMonthView = () => {
  // Current month and year state
  const [activeMonth, setActiveMonth] = useState("Apr");
  const [activeYear, setActiveYear] = useState(2025);
  const [activeDay, setActiveDay] = useState(16);
  
  // Mock task data
  const taskData = {
    "Apr 1, 2025": 3,
    "Apr 2, 2025": 4
  };
  
  // Array of months to display in the month selector
  const months = ["Feb", "Mar", "Apr", "May", "Jun"];
  
  // Days of week for header
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  // Function to get the label for the month (Previous, This Month, Next, etc.)
  const getMonthLabel = (month) => {
    if (month === "Feb") return "Last Month";
    if (month === "Mar") return "Previous";
    if (month === "Apr") return "This Month";
    if (month === "May") return "Next Month";
    return "";
  };
  
  // Create calendar grid data
  const generateCalendarDays = () => {
    // For April 2025, the first day is Tuesday (index 1)
    // This is mock data - in a real app you'd calculate this properly
    const firstDayIndex = 1; // Tuesday
    const daysInMonth = 30; // April has 30 days
    const daysInPrevMonth = 31; // March has 31 days
    
    let days = [];
    
    // Add days from previous month (March)
    const prevMonthStartDay = daysInPrevMonth - firstDayIndex + 1;
    for (let i = prevMonthStartDay; i <= daysInPrevMonth; i++) {
      days.push({ day: i, currentMonth: false });
    }
    
    // Add days from current month (April)
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, currentMonth: true });
    }
    
    // Add days from next month (May)
    const remainingCells = 42 - days.length; // 6 rows × 7 columns = 42 cells
    for (let i = 1; i <= remainingCells; i++) {
      days.push({ day: i, currentMonth: false });
    }
    
    return days;
  };
  
  const calendarDays = generateCalendarDays();
  
  return (
    <div className="transition-all duration-300 ml-0">
      <div className="max-w-7xl mx-auto">
        <div className="w-full max-w-4xl mx-auto">
          {/* View selector row */}
          <div className="flex items-stretch bg-white border-gray-200">
            <div className="flex-1 flex">
              <button className="flex-1 flex flex-col items-stretch p-2 text-center transition-colors border-b-2 border-emerald-400 bg-gray-50">
                <span className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 font-medium">Month</span>
              </button>
              <button className="flex-1 flex flex-col items-stretch p-2 text-center transition-colors text-gray-600 hover:bg-gray-50 active:bg-gray-100">
                <span className="text-lg text-gray-600 font-medium">Week</span>
              </button>
              <button className="flex-1 flex flex-col items-stretch p-2 text-center transition-colors text-gray-600 hover:bg-gray-50 active:bg-gray-100">
                <span className="text-lg text-gray-600 font-medium">Day</span>
              </button>
            </div>
            <button className="px-4 py-3 border-l border-gray-200 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600">
              Today
            </button>
          </div>
          
          {/* Month navigation row */}
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
                  
                  {/* Month selector buttons */}
                  {months.map((month) => (
                    <button 
                      key={month}
                      className={`flex-1 flex flex-col items-stretch p-2 text-center transition-colors ${
                        month === activeMonth 
                          ? "border-b-2 border-emerald-400 bg-gray-50" 
                          : "text-gray-600 hover:bg-gray-50 active:bg-gray-100"
                      }`}
                      onClick={() => setActiveMonth(month)}
                    >
                      <span className="text-xs font-medium text-gray-500">{activeYear}</span>
                      <span className={`text-lg ${
                        month === activeMonth
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600" 
                          : "text-gray-600"
                        } font-medium`}
                      >
                        {month}
                      </span>
                      <span className={`text-xs mt-1 ${
                        month === activeMonth
                          ? "font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500" 
                          : "text-gray-400"
                        }`}
                      >
                        {getMonthLabel(month)}
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
              
              {/* Calendar legend */}
              <div className="flex justify-between items-center text-xs px-4 py-3 border-b border-gray-200 bg-white">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full mr-1"></div>
                  <span className="text-gray-600">Tasks</span>
                </div>
                <div className="text-gray-500">Click on any day to add a task</div>
              </div>
              
              {/* Calendar grid */}
              <div className="p-4">
                <div className="bg-white border-t border-l border-gray-200 overflow-hidden">
                  {/* Day names header */}
                  <div className="grid grid-cols-7 text-center bg-white">
                    {daysOfWeek.map(day => (
                      <div key={day} className="p-2 border-b border-r border-gray-200 font-medium text-sm text-gray-500">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar grid */}
                  <div>
                    {/* Split the calendar days into rows (weeks) */}
                    {Array.from({ length: 5 }, (_, weekIndex) => (
                      <div key={`week-${weekIndex}`} className="grid grid-cols-7">
                        {calendarDays.slice(weekIndex * 7, (weekIndex + 1) * 7).map((dayInfo, dayIndex) => {
                          const dayNum = dayInfo.day;
                          const isCurrentMonth = dayInfo.currentMonth;
                          const dateString = isCurrentMonth ? `Apr ${dayNum}, 2025` : "";
                          const hasEvents = isCurrentMonth && taskData[dateString];
                          const isToday = isCurrentMonth && dayNum === activeDay;
                          
                          return (
                            <div 
                              key={`day-${weekIndex}-${dayIndex}`}
                              className={`h-24 p-1 border-r border-b border-gray-200 ${
                                isCurrentMonth ? "bg-white" : "bg-gray-50"
                              } ${isToday ? "border-t-2 border-emerald-400" : ""}`}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="flex justify-between items-start">
                                <span className={`block text-right p-1 font-medium ${
                                  !isCurrentMonth ? "text-gray-400" : 
                                  isToday ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600" : 
                                  "text-gray-700"
                                }`}>
                                  {dayNum}
                                </span>
                              </div>
                              
                              <div className="mt-1 px-1">
                                {hasEvents && (
                                  <div className="mb-1 p-1 rounded text-xs bg-gradient-to-r from-blue-100 to-emerald-100">
                                    <span className="text-blue-800">{taskData[dateString]} tasks</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
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

export default ModernCalendarMonthView;
