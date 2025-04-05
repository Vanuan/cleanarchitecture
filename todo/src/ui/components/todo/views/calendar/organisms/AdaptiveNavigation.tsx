import React, { useState, useMemo, useEffect, memo } from "react";
import {
  DayNavigationService,
  WeekNavigationService,
  MonthNavigationService,
  NavigationConfig,
} from "../services";
import { DateNavigationSelector } from "./DateNavigationSelector";

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

  // Determine the longest label based on the navigation type
  const longestLabel = useMemo(() => {
    if (config === DayNavigationService) {
      return "Yesterday"; // Longest possible day label
    } else if (config === WeekNavigationService) {
      return "This Week"; // Longest possible week label
    } else {
      return "This Month"; // Longest possible month label
    }
  }, [config]);

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
        className={`flex items-stretch ${
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

        <DateNavigationSelector
          visibleItems={visibleItems}
          onDateChange={onDateChange}
          styleVariant={styleVariant}
          longestLabel={longestLabel}
        />

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
