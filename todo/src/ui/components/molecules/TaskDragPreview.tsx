import { useSpring, animated } from '@react-spring/web';

export const TaskDragPreview = ({ item }) => {
  const getAnimationColor = () => {
    return 'from-green-300 to-emerald-500';    
  };

  const [props] = useSpring(() => ({
    from: { scale: 1, rotate: 0, opacity: 0.9 },
    to: [
      { scale: 1.05, rotate: 1, opacity: 0.95 },
      { scale: 1.03, rotate: 0.5, opacity: 0.92 },
      { scale: 1.05, rotate: 1, opacity: 0.95 }
    ],
    loop: true,
    config: { mass: 1, tension: 300, friction: 20 }
  }));

  return (
    <animated.div 
      className="p-4 bg-white rounded-md border-2 border-blue-300"
      style={{
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
        opacity: props.opacity,
        zIndex: 1000,
        userSelect: 'none',
        width: '280px',
      }}
    >
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-800">{item.title}</h4>
      </div>
      <div className={`mt-2 w-full h-1 bg-gradient-to-r ${getAnimationColor()} rounded-full`}>
        <div className="h-full w-1/3 bg-white bg-opacity-30 rounded-full animate-pulse"></div>
      </div>
    </animated.div>
  );
};