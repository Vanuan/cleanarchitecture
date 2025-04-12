import { useSpring } from "@react-spring/web";
import React from "react";
import { useEffect } from "react";
import tw from "tailwind-styled-components";

// Empty column state
const EmptyColumn = () => (
  <div className="flex flex-col items-center justify-center h-40 text-gray-400">
    <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
    </svg>
    <p className="text-sm">Drag items here</p>
  </div>
);

const Column = tw.div`
  rounded-lg overflow-hidden flex flex-col 
  min-w-[280px] w-full bg-white border border-gray-200
`;

const ColumnHeader = tw.div`
  p-3 font-medium text-gray-700 bg-gradient-to-r flex justify-between items-center
`;

const ColumnContent = tw.div`
  flex-1 p-2 min-h-[200px]
`;

const TaskCount = tw.span`
  text-white text-xs font-medium px-2.5 py-1 rounded-full
`;

export const TaskColumn = ({ id, isActive, isOver, children, additionalProps, dropRef }) => {
  // Get column theme
  const getColumnTheme = (columnId: 'todo' | 'completed') => {
    const themes = {
      'todo': { bg: 'from-blue-100 to-indigo-50', count: 'bg-blue-500' },
      'completed': { bg: 'from-emerald-100 to-green-50', count: 'bg-emerald-500' },
      'default': { bg: 'from-gray-100 to-gray-50', count: 'bg-gray-500' }
    };
    
    return themes[columnId] || themes['default'];
  };
  
  const theme = getColumnTheme(id.toString());
  const childrenCount = React.Children.count(children);
  
  // Animation for column hover/drop state
  const [props, api] = useSpring(() => ({
    scale: 1,
    shadow: 5,
    brightness: 1,
    config: { mass: 1, tension: 280, friction: 20 }
  }));

  useEffect(() => {
    api.start({
      scale: isOver ? 1.02 : 1,
      shadow: isOver ? 15 : 5,
      brightness: isOver ? 1.05 : 1,
    });
  }, [isOver, api]);

  return (
    <Column
      ref={dropRef}
      className={`${isActive ? 'ring-2 ring-blue-300' : ''}`}
      style={{
        transform: props.scale.to(s => `scale(${s})`),
        boxShadow: props.shadow.to(s => `0 ${s/2}px ${s}px rgba(0, 0, 0, 0.1)`),
        filter: props.brightness.to(b => `brightness(${b})`),
        position: 'relative', // Ensure proper stacking for the overlay
      }}
    >
      <ColumnHeader className={`${theme.bg} ${isOver ? 'border-b-2 border-blue-300' : ''}`}>
        <span>{additionalProps?.title}</span>
        <TaskCount 
          className={`${theme.count}`}
          style={{
            transform: isOver ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 200ms ease',
          }}
        >
          {childrenCount}
        </TaskCount>
      </ColumnHeader>
      
      <ColumnContent>
        <div className="space-y-3">
          {children}
        </div>
        
        {!isOver && childrenCount === 0 && <EmptyColumn />}
        
        {/* Full column drop overlay */}
        {isOver && (
          <div 
            className="absolute inset-0 top-0 mt-12 border-2  bg-blue-50 bg-opacity-80 flex items-center justify-center z-10"
          >
            <div className="text-lg text-blue-600 font-medium flex flex-col items-center">
              <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
              <span>Drop here</span>
            </div>
          </div>
        )}
      </ColumnContent>
    </Column>
  );
};
