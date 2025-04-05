import React, { useState, useMemo, useEffect, memo } from "react";
import {
  DayNavigationService,
  WeekNavigationService,
  MonthNavigationService,
  NavigationConfig,
  INavigationItem,
} from "../services";

// Helper function to determine visible count based on window width
const getVisibleCountFromWidth = (width: number): number => {
  if (width < 375) {
    // Smallest screens
    return 3;
  } else if (width < 640) {
    // Small screens
    return 5;
  } else {
    return 7;
  }
};

// Get initial visible count based on current window width
const getInitialVisibleCount = (): number => {
  // Check if window is available (for SSR compatibility)
  if (typeof window !== "undefined") {
    return getVisibleCountFromWidth(window.innerWidth);
  }
  // Default fallback for SSR
  return 5;
};

// Memoized Navigation Item component
const NavigationItem = memo(
  ({
    item,
    onDateChange,
    variant = "default",
  }: {
    item: INavigationItem;
    onDateChange: (date: Date) => void;
    variant?: string;
  }) => {
    // Pre-compute class names based on the item state and variant
    const getItemClasses = () => {
      const baseClasses =
        "flex-1 flex flex-col items-center p-3 transition-colors";

      switch (variant) {
        case "minimal":
          return `${baseClasses} ${
            item.isSelected
              ? "border-b-2 border-black text-black"
              : "border-b-2 border-transparent text-gray-500 hover:text-gray-700"
          }`;
        case "colorful":
          return `${baseClasses} ${
            item.isSelected
              ? "bg-white bg-opacity-30 text-white font-bold"
              : "hover:bg-white hover:bg-opacity-20 text-white"
          }`;
        case "inverted":
          return `${baseClasses} ${
            item.isSelected
              ? "bg-gradient-to-r from-blue-50 to-emerald-50 border-b-2 border-emerald-400"
              : "hover:bg-gray-50"
          }`;
        default: // default style
          return `${baseClasses} ${
            item.isSelected
              ? "bg-blue-100 text-blue-700"
              : "hover:bg-gray-50 active:bg-gray-100 text-gray-600"
          }`;
      }
    };

    const getUpperLabelClasses = () => {
      switch (variant) {
        case "minimal":
          return "text-xs font-medium";
        case "colorful":
          return "text-xs font-medium text-white";
        case "inverted":
          return "text-xs font-medium text-gray-500";
        default:
          return "text-xs font-medium text-gray-500";
      }
    };

    const getMainLabelClasses = () => {
      const baseClasses = "text-lg";

      if (variant === "inverted") {
        return `${baseClasses} ${
          item.isSelected
            ? "font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600"
            : "font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500"
        }`;
      }

      return `${baseClasses} ${item.isSelected ? "font-bold" : "font-medium"}`;
    };

    const getLowerLabelClasses = () => {
      switch (variant) {
        case "minimal":
          return `text-xs ${
            item.isToday ? "text-blue-600 font-medium" : "text-gray-500"
          } mt-1`;
        case "colorful":
          return `text-xs ${
            item.isToday ? "text-white font-bold" : "text-white"
          } mt-1`;
        case "inverted":
          return `text-xs ${
            item.isToday
              ? "font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500"
              : "text-gray-400"
          } mt-1`;
        default:
          return `text-xs ${
            item.isToday ? "text-green-600 font-medium" : "text-gray-500"
          } mt-1`;
      }
    };

    // Memoize the handler to prevent unnecessary re-renders
    const handleClick = useMemo(
      () => () => onDateChange(item.date),
      [onDateChange, item.date]
    );

    return (
      <button className={getItemClasses()} onClick={handleClick}>
        <span className={getUpperLabelClasses()}>{item.upperLabel}</span>
        <span className={getMainLabelClasses()}>{item.mainLabel}</span>
        {item.lowerLabel && (
          <span className={getLowerLabelClasses()}>{item.lowerLabel}</span>
        )}
      </button>
    );
  }
);

// SVG components for better performance
const LeftArrow = memo(() => (
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
    className="w-5 h-5"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
));

const RightArrow = memo(() => (
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
    className="w-5 h-5"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
));

interface AdaptiveNavigationProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  config: NavigationConfig;
  styleVariant?: "default" | "minimal" | "colorful" | "inverted";
}

const AdaptiveNavigation: React.FC<AdaptiveNavigationProps> = ({
  currentDate,
  onDateChange,
  config,
  styleVariant = "default",
}) => {
  // Initialize with the correct count based on current window size
  const [visibleCount, setVisibleCount] = useState(getInitialVisibleCount());

  // Adjust visible items based on screen width with debouncing
  useEffect(() => {
    let timeoutId: number | null = null;

    const handleResize = () => {
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = window.setTimeout(() => {
        setVisibleCount(getVisibleCountFromWidth(window.innerWidth));
      }, 150); // Debounce time
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Memoize navigation items to prevent recalculation on every render
  const navigationItems = useMemo(
    () => config.generateItems(currentDate),
    [currentDate, config]
  );

  // Memoize visible items to avoid slicing on every render
  // But ensure the selected day stays centered
  const visibleItems = useMemo(() => {
    // Find the index of the selected item
    const selectedIndex = navigationItems.findIndex((item) => item.isSelected);

    if (selectedIndex === -1) {
      // Fallback if no item is selected
      return navigationItems.slice(0, visibleCount);
    }

    // Calculate how many items to show on each side of the selected item
    const itemsPerSide = Math.floor(visibleCount / 2);

    // Calculate start and end indices, ensuring we don't go out of bounds
    let startIndex = Math.max(0, selectedIndex - itemsPerSide);
    let endIndex = startIndex + visibleCount;

    // Adjust if we're going beyond the array length
    if (endIndex > navigationItems.length) {
      endIndex = navigationItems.length;
      startIndex = Math.max(0, endIndex - visibleCount);
    }

    return navigationItems.slice(startIndex, endIndex);
  }, [navigationItems, visibleCount]);

  // Memoize handlers to prevent recreation on every render
  const handlePrevious = useMemo(
    () => () => onDateChange(config.navigatePrevious(currentDate)),
    [onDateChange, config, currentDate]
  );

  const handleNext = useMemo(
    () => () => onDateChange(config.navigateNext(currentDate)),
    [onDateChange, config, currentDate]
  );

  return (
    <div className="relative">
      <div
        className={`flex items-center ${
          styleVariant === "minimal"
            ? "bg-white"
            : styleVariant === "colorful"
            ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg"
            : styleVariant === "inverted"
            ? "bg-white shadow-sm"
            : "bg-white border-b border-gray-200"
        }`}
      >
        {/* Previous Button */}
        <div className="flex items-center">
          <button
            className={`p-3 ${
              styleVariant === "minimal"
                ? "text-gray-500 hover:text-gray-900"
                : styleVariant === "colorful"
                ? "text-white hover:bg-white hover:bg-opacity-20"
                : styleVariant === "inverted"
                ? "text-blue-500 hover:bg-gray-50"
                : "text-gray-600 hover:bg-gray-50 active:bg-gray-100"
            }`}
            onClick={handlePrevious}
          >
            <LeftArrow />
          </button>

          {/* Vertical Separator */}
          <div
            className={`h-8 w-px mx-1 ${
              styleVariant === "minimal"
                ? "bg-gray-200"
                : styleVariant === "colorful"
                ? "bg-white bg-opacity-20"
                : styleVariant === "inverted"
                ? "bg-gradient-to-r from-blue-200 to-emerald-200"
                : "bg-gray-200"
            }`}
          ></div>
        </div>

        {/* Items Container */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex justify-between">
            {visibleItems.map((item) => (
              <NavigationItem
                key={item.key}
                item={item}
                onDateChange={onDateChange}
                variant={styleVariant}
              />
            ))}
          </div>
        </div>

        {/* Next Button */}
        <div className="flex items-center">
          {/* Vertical Separator */}
          <div
            className={`h-8 w-px mx-1 ${
              styleVariant === "minimal"
                ? "bg-gray-200"
                : styleVariant === "colorful"
                ? "bg-white bg-opacity-20"
                : styleVariant === "inverted"
                ? "bg-gradient-to-r from-blue-200 to-emerald-200"
                : "bg-gray-200"
            }`}
          ></div>

          <button
            className={`p-3 ${
              styleVariant === "minimal"
                ? "text-gray-500 hover:text-gray-900"
                : styleVariant === "colorful"
                ? "text-white hover:bg-white hover:bg-opacity-20 rounded-xl"
                : styleVariant === "inverted"
                ? "text-blue-500 hover:bg-gray-50 rounded-xl"
                : ""
            }`}
            onClick={handleNext}
          >
            <RightArrow />
          </button>
        </div>
      </div>
    </div>
  );
};

// Concrete navigation components
export const DayNavigation: React.FC<{
  currentDate: Date;
  onDateChange: (date: Date) => void;
  styleVariant?: "default" | "minimal" | "colorful" | "inverted";
}> = ({ styleVariant, ...props }) => (
  <AdaptiveNavigation
    {...props}
    config={DayNavigationService}
    styleVariant={styleVariant}
  />
);

export const WeekNavigation: React.FC<{
  currentDate: Date;
  onDateChange: (date: Date) => void;
  styleVariant?: "default" | "minimal" | "colorful" | "inverted";
}> = ({ styleVariant, ...props }) => (
  <AdaptiveNavigation
    {...props}
    config={WeekNavigationService}
    styleVariant={styleVariant}
  />
);

export const MonthNavigation: React.FC<{
  currentDate: Date;
  onDateChange: (date: Date) => void;
  styleVariant?: "default" | "minimal" | "colorful" | "inverted";
}> = ({ styleVariant, ...props }) => (
  <AdaptiveNavigation
    {...props}
    config={MonthNavigationService}
    styleVariant={styleVariant}
  />
);
