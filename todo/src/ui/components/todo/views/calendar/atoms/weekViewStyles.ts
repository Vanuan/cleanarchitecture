export type WeekViewStyleVariant = "default" | "inverted";

export interface WeekViewStyleProps {
  viewContainerClassName: string;
  daySectionContainerBaseClassName: string;
  daySectionTodayClassName: string;
  daySectionEmptyClassName: string;
  dayHeaderContainerClassName: string;
  dayNameBaseClassName: string;
  dayNameTodayClassName: string;
  dayDateBaseClassName: string;
  dayDateTodayClassName: string;
  dayBadgeBaseClassName: string;
  dayBadgeTodayClassName: string;
  dayBadgeOtherClassName: string;
  taskContainerClassName: string;
  taskItemWrapperClassName: string;
  taskItemCompletedClassName: string;
  addButtonClassName: string;
  emptyStateContainerClassName: string;
  emptyStateTextClassName: string;
  emptyStateButtonClassName: string;
  addIconClassName: string;
}

export const getWeekViewStyleProps = (
  variant: WeekViewStyleVariant
): WeekViewStyleProps => {
  switch (variant) {
    case "inverted":
      return {
        viewContainerClassName: "flex flex-col h-full", // Keep base layout
        daySectionContainerBaseClassName: "border-b border-gray-100", // Lighter border
        daySectionTodayClassName: "bg-gradient-to-r from-blue-50 to-emerald-50", // Subtle gradient for today
        daySectionEmptyClassName: "bg-white", // Empty days are white
        dayHeaderContainerClassName: "p-3 font-medium flex items-center border-b border-gray-100", // Lighter border
        dayNameBaseClassName: "text-lg text-gray-700",
        dayNameTodayClassName: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600", // Gradient text today
        dayDateBaseClassName: "text-sm text-gray-500 ml-2",
        dayDateTodayClassName: "text-gray-600", // Slightly darker date text on gradient
        dayBadgeBaseClassName: "ml-2 text-xs px-2 py-0.5 rounded",
        dayBadgeTodayClassName: "bg-blue-100 text-blue-800",
        dayBadgeOtherClassName: "bg-gray-100 text-gray-600",
        taskContainerClassName: "p-4 space-y-3", // Added space between items
        taskItemWrapperClassName: "bg-white rounded-lg p-0 border border-gray-200 overflow-hidden", // Card wrapper for each item
        taskItemCompletedClassName: "opacity-70", // More subtle completed state
        addButtonClassName: "w-full mt-1 py-2 border border-dashed border-gray-300 rounded-lg text-blue-500 flex items-center justify-center hover:bg-blue-50 active:bg-blue-100",
        emptyStateContainerClassName: "p-6 text-center",
        emptyStateTextClassName: "text-gray-500 italic",
        emptyStateButtonClassName: "mt-2 text-blue-500 flex items-center justify-center mx-auto hover:text-blue-700",
        addIconClassName: "h-4 w-4 mr-1"
      };
    default: // Styles extracted from the original WeekView component
      return {
        viewContainerClassName: "flex flex-col h-full",
        daySectionContainerBaseClassName: "", // Base has no extra bg
        daySectionTodayClassName: "bg-blue-50",
        daySectionEmptyClassName: "bg-gray-50",
        dayHeaderContainerClassName: "p-3 font-medium flex items-center",
        dayNameBaseClassName: "text-lg",
        dayNameTodayClassName: "text-blue-700",
        dayDateBaseClassName: "text-sm text-gray-500 ml-2",
        dayDateTodayClassName: "text-blue-600",
        dayBadgeBaseClassName: "ml-2 text-xs px-2 py-0.5 rounded",
        dayBadgeTodayClassName: "bg-blue-200 text-blue-800",
        dayBadgeOtherClassName: "bg-gray-100 text-gray-600",
        taskContainerClassName: "p-4",
        taskItemWrapperClassName: "bg-white rounded-lg p-3 border border-gray-200 mb-3",
        taskItemCompletedClassName: "bg-gray-50", // This was applied to the wrapper in default
        addButtonClassName: "w-full mt-1 py-2 border border-dashed border-gray-300 rounded-lg text-blue-500 flex items-center justify-center hover:bg-blue-50",
        emptyStateContainerClassName: "p-6 text-center text-gray-500",
        emptyStateTextClassName: "", // Default text color applied by container
        emptyStateButtonClassName: "mt-2 text-blue-500 flex items-center justify-center mx-auto hover:text-blue-700",
        addIconClassName: "mr-1 h-4 w-4" // Combined size and margin
      };
  }
};

// Helper function to combine day section classes
export const getDaySectionClasses = (
  styles: WeekViewStyleProps,
  isToday: boolean,
  isEmpty: boolean
): string => {
  let classes = styles.daySectionContainerBaseClassName;
  if (isToday) {
    classes += ` ${styles.daySectionTodayClassName}`;
  } else if (isEmpty) {
     classes += ` ${styles.daySectionEmptyClassName}`;
  }
  return classes;
};

// Helper function for day name classes
export const getDayNameClasses = (
  styles: WeekViewStyleProps,
  isToday: boolean
): string => {
  return isToday
    ? `${styles.dayNameBaseClassName} ${styles.dayNameTodayClassName}`
    : styles.dayNameBaseClassName;
}

// Helper function for day date classes
export const getDayDateClasses = (
  styles: WeekViewStyleProps,
  isToday: boolean
): string => {
  return isToday
    ? `${styles.dayDateBaseClassName} ${styles.dayDateTodayClassName}`
    : styles.dayDateBaseClassName;
}

// Helper function for badge classes
export const getBadgeClasses = (
  styles: WeekViewStyleProps,
  isToday: boolean
): string => {
  return isToday
    ? `${styles.dayBadgeBaseClassName} ${styles.dayBadgeTodayClassName}`
    : `${styles.dayBadgeBaseClassName} ${styles.dayBadgeOtherClassName}`;
}
