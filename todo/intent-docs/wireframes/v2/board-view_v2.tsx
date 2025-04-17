import React, { useState } from "react";
import { Circle, CircleCheck, Clock, Tag, Trash2, SquarePen, GripVertical, Plus } from "lucide-react";

const TodoBoardView = () => {
  const [columns, setColumns] = useState({
    todo: {
      name: "Todo",
      items: [
        {
          id: "t1",
          title: "Double selector",
          dueDate: "Apr 1, 2025",
          status: "todo"
        },
        {
          id: "t2",
          title: "Current month/week",
          dueDate: "Apr 1, 2025",
          status: "todo"
        },
        {
          id: "t3",
          title: "Make the app suitable for more entity types",
          dueDate: "Apr 2, 2025",
          status: "todo"
        },
        {
          id: "t4",
          title: "Consistent plus button for mobile screens",
          dueDate: "Apr 2, 2025",
          status: "todo"
        },
        {
          id: "t5",
          title: "Atomic design",
          status: "todo"
        },
        {
          id: "t6",
          title: "Add description",
          status: "todo"
        }
      ]
    },
    completed: {
      name: "Completed",
      items: [
        {
          id: "c1",
          title: "Next/Prev for current week in day view",
          dueDate: "Apr 1, 2025",
          status: "completed"
        },
        {
          id: "c2",
          title: "Green today on day view",
          dueDate: "Apr 2, 2025",
          status: "completed"
        },
        {
          id: "c3",
          title: "Integrate into CRM",
          dueDate: "Apr 2, 2025",
          status: "completed"
        },
        {
          id: "c4",
          title: "New navigation sidebar https://claude.ai/chat/70a9000e-0652-44c0-8da0-5713adc81762",
          status: "completed"
        }
      ]
    }
  });

  // Simulate drag handling
  const handleDragStart = (e, id, sourceColumn) => {
    e.dataTransfer.setData("taskId", id);
    e.dataTransfer.setData("sourceColumn", sourceColumn);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const sourceColumn = e.dataTransfer.getData("sourceColumn");
    
    if (sourceColumn !== targetColumn) {
      const newColumns = {...columns};
      
      // Find the task to move
      const taskIndex = newColumns[sourceColumn].items.findIndex(item => item.id === taskId);
      const task = {...newColumns[sourceColumn].items[taskIndex]};
      
      // Update task status
      task.status = targetColumn;
      
      // Remove from source and add to target
      newColumns[sourceColumn].items.splice(taskIndex, 1);
      newColumns[targetColumn].items.push(task);
      
      setColumns(newColumns);
    }
  };

  const toggleTaskStatus = (taskId, currentStatus) => {
    const newColumns = {...columns};
    const targetStatus = currentStatus === "todo" ? "completed" : "todo";
    
    // Find the task
    const taskIndex = newColumns[currentStatus].items.findIndex(item => item.id === taskId);
    if (taskIndex !== -1) {
      const task = {...newColumns[currentStatus].items[taskIndex]};
      task.status = targetStatus;
      
      // Remove from current and add to target
      newColumns[currentStatus].items.splice(taskIndex, 1);
      newColumns[targetStatus].items.push(task);
      
      setColumns(newColumns);
    }
  };

  return (
    <div className="transition-all duration-300 ml-0 px-4 md:px-6 max-w-7xl mx-auto w-full">
      <div className="w-full">
        {/* Changed to flex-col on mobile and flex-row on md screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Todo Column */}
          <div 
            data-droppable-id="todo"
            className="w-full min-h-[100px]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "todo")}
          >
            <div className="rounded-lg overflow-hidden flex flex-col w-full bg-white border border-gray-200 shadow-sm">
              <div className="p-3 font-medium text-gray-700 bg-gradient-to-r flex justify-between items-center from-blue-100 to-indigo-50">
                <span>Todo</span>
                <span 
                  className="text-white text-xs font-medium px-2.5 py-1 rounded-full bg-blue-500" 
                  style={{transform: "scale(1)", transition: "transform 200ms"}}
                >
                  {columns.todo.items.length}
                </span>
              </div>
              
              <div className="flex-1 p-2 min-h-[200px]">
                <div className="space-y-3">
                  {columns.todo.items.map((task) => (
                    <div key={task.id} style={{opacity: 1, transition: "opacity 150ms ease-out, transform 150ms ease-out"}}>
                      <div className="mb-3" style={{opacity: 1, transform: "scale(1)"}}>
                        <div 
                          className="rounded-lg bg-white border-l-blue-500 border-l-4 transition-all duration-200 hover:shadow-md relative flex items-stretch cursor-pointer"
                          style={{boxShadow: "rgba(0, 0, 0, 0.05) 0px 2px 4px"}}
                          draggable
                          onDragStart={(e) => handleDragStart(e, task.id, "todo")}
                        >
                          <div 
                            role="button"
                            tabIndex={0}
                            aria-disabled="false"
                            aria-roledescription="draggable"
                            aria-describedby="DndDescribedBy-0"
                            aria-label="Drag to another column"
                            className="cursor-grab transition-colors duration-200 text-gray-400 hover:text-gray-600 touch-manipulation flex-shrink-0 flex items-center justify-center px-2 border-r border-gray-100 hover:bg-gray-100"
                            style={{zIndex: 10, touchAction: "none"}}
                          >
                            <GripVertical className="w-5 h-5" />
                          </div>
                          
                          <div className="flex-1 flex items-start p-4">
                            <div className="w-full">
                              <div className="flex items-start gap-3">
                                <button 
                                  className="mt-1 transition-colors text-gray-400 hover:text-blue-500" 
                                  aria-label="Mark as complete"
                                  onClick={() => toggleTaskStatus(task.id, "todo")}
                                >
                                  <span className="h-5 w-5">
                                    <Circle className="w-full h-full" />
                                  </span>
                                </button>
                                
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-gray-900 font-medium">{task.title}</h3>
                                  <div className="flex items-center gap-2 flex-wrap mt-2">
                                    {task.dueDate && (
                                      <span className="text-xs px-2 py-1 rounded-full flex items-center gap-1 border bg-gray-100 text-gray-600 border-gray-200">
                                        <span className="h-4 w-4 mr-0.5">
                                          <Clock className="h-full w-full" />
                                        </span>
                                        {task.dueDate}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Completed Column */}
          <div 
            data-droppable-id="completed"
            className="w-full min-h-[100px]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "completed")}
          >
            <div className="rounded-lg overflow-hidden flex flex-col w-full bg-white border border-gray-200 shadow-sm">
              <div className="p-3 font-medium text-gray-700 bg-gradient-to-r flex justify-between items-center from-emerald-100 to-green-50">
                <span>Completed</span>
                <span 
                  className="text-white text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500"
                  style={{transform: "scale(1)", transition: "transform 200ms"}}
                >
                  {columns.completed.items.length}
                </span>
              </div>
              
              <div className="flex-1 p-2 min-h-[200px]">
                <div className="space-y-3">
                  {columns.completed.items.map((task) => (
                    <div key={task.id} style={{opacity: 1, transition: "opacity 150ms ease-out, transform 150ms ease-out"}}>
                      <div className="mb-3" style={{opacity: 1, transform: "scale(1)"}}>
                        <div 
                          className="rounded-lg bg-white border-l-emerald-100 border-l-4 transition-all duration-200 hover:shadow-md relative flex items-stretch cursor-pointer"
                          style={{boxShadow: "rgba(0, 0, 0, 0.05) 0px 2px 4px"}}
                          draggable
                          onDragStart={(e) => handleDragStart(e, task.id, "completed")}
                        >
                          <div 
                            role="button"
                            tabIndex={0}
                            aria-disabled="false"
                            aria-roledescription="draggable"
                            aria-describedby="DndDescribedBy-0"
                            aria-label="Drag to another column"
                            className="cursor-grab transition-colors duration-200 text-gray-400 hover:text-gray-600 touch-manipulation flex-shrink-0 flex items-center justify-center px-2 border-r border-gray-100 hover:bg-gray-100"
                            style={{zIndex: 10, touchAction: "none"}}
                          >
                            <GripVertical className="w-5 h-5" />
                          </div>
                          
                          <div className="flex-1 flex items-start p-4">
                            <div className="w-full">
                              <div className="flex items-start gap-3">
                                <button 
                                  className="mt-1 transition-colors text-emerald-500 hover:text-emerald-600" 
                                  aria-label="Mark as incomplete"
                                  onClick={() => toggleTaskStatus(task.id, "completed")}
                                >
                                  <span className="h-5 w-5">
                                    <CircleCheck className="w-full h-full" />
                                  </span>
                                </button>
                                
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-medium line-through text-gray-500">{task.title}</h3>
                                  <div className="flex items-center gap-2 flex-wrap mt-2">
                                    {task.dueDate && (
                                      <span className="text-xs px-2 py-1 rounded-full flex items-center gap-1 border bg-gray-100 text-gray-600 border-gray-200">
                                        <span className="h-4 w-4 mr-0.5">
                                          <Clock className="h-full w-full" />
                                        </span>
                                        {task.dueDate}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Accessibility descriptions for drag and drop */}
      <div id="DndDescribedBy-0" style={{display: "none"}}>
        To pick up a draggable item, press the space bar.
        While dragging, use the arrow keys to move the item.
        Press space again to drop the item in its new position, or press escape to cancel.
      </div>
      <div 
        id="DndLiveRegion-0" 
        role="status" 
        aria-live="assertive" 
        aria-atomic="true" 
        style={{
          position: "fixed", 
          top: 0, 
          left: 0, 
          width: "1px", 
          height: "1px", 
          margin: "-1px", 
          border: 0, 
          padding: 0, 
          overflow: "hidden", 
          clip: "rect(0px, 0px, 0px, 0px)", 
          clipPath: "inset(100%)", 
          whiteSpace: "nowrap" 
        }}
      ></div>
    </div>
  );
};

export default TodoBoardView;
