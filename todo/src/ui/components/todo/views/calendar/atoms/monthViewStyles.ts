export type MonthViewStyleVariant = "default" | "inverted";

// Export the interface
export interface MonthViewStyleProps {
  gridContainerClassName: string;
  headerContainerClassName: string;
  headerCellClassName: string;
  dayCellBaseClassName: string;
  dayCellCurrentMonthClassName: string;
  dayCellOtherMonthClassName: string;
  dayCellTodayClassName: string;
  dayNumberBaseClassName: string;
  dayNumberTodayClassName: string;
  dayNumberOtherMonthClassName: string;
  taskInfoContainerClassName: string;
  taskInfoBadgeClassName: string;
  taskInfoBadgeDotClassName?: string; // Optional dot
  taskInfoBadgeTextClassName: string;
  // Add hint styles
  hintContainerClassName: string;
  hintLegendContainerClassName: string;
  hintIndicatorClassName: string;
  hintLegendTextClassName: string;
  hintHelperTextClassName: string;
}

export const getMonthViewStyleProps = (
  styleVariant: MonthViewStyleVariant
): MonthViewStyleProps => {
  switch (styleVariant) {
    case "inverted":
      return {
        gridContainerClassName: "bg-white border-t border-l border-gray-200 overflow-hidden", // Outer container needs top/left border
        headerContainerClassName: "grid grid-cols-7 text-center bg-white", // Header bg white
        headerCellClassName: "p-2 border-b border-r border-gray-200 font-medium text-sm text-gray-500", // Header cells need bottom/right border
        dayCellBaseClassName: "h-24 p-1 border-r border-b border-gray-200", // Day cells need right/bottom border
        dayCellCurrentMonthClassName: "bg-white",
        dayCellOtherMonthClassName: "bg-gray-50",
        dayCellTodayClassName: "border-t-2 border-emerald-400", // Today has top border accent
        dayNumberBaseClassName: "block text-right p-1 font-medium text-gray-700", // Adjusted alignment/padding
        dayNumberTodayClassName: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600", // Gradient text for today
        dayNumberOtherMonthClassName: "text-gray-400",
        taskInfoContainerClassName: "mt-1 px-1", // Adjusted margin/padding
        taskInfoBadgeClassName: "mb-1 p-1 rounded text-xs bg-gradient-to-r from-blue-100 to-emerald-100", // Gradient background badge
        // taskInfoBadgeDotClassName: undefined, // No dot in inverted example
        taskInfoBadgeTextClassName: "text-blue-800", // Consistent text color for now
        // Inverted hint styles based on user example
        hintContainerClassName: "flex justify-between items-center text-xs px-4 py-3 border-b border-gray-200 bg-white",
        hintLegendContainerClassName: "flex items-center",
        hintIndicatorClassName: "w-3 h-3 bg-gradient-to-r from-blue-400 to-emerald-400 mr-1", // Gradient indicator
        hintLegendTextClassName: "text-gray-600",
        hintHelperTextClassName: "text-gray-500",
      };
    case "default":
    default:
      return {
        gridContainerClassName: "border border-gray-200 rounded-lg overflow-hidden",
        headerContainerClassName: "grid grid-cols-7 text-center bg-gray-50",
        headerCellClassName: "py-2 border-b border-gray-200 font-medium text-gray-600",
        dayCellBaseClassName: "min-h-24 p-2 border border-gray-200", // Original used border on all sides here
        dayCellCurrentMonthClassName: "bg-white", // Default current month is white
        dayCellOtherMonthClassName: "bg-gray-50",
        dayCellTodayClassName: "bg-blue-50", // Today has light blue background
        dayNumberBaseClassName: "text-sm font-medium",
        dayNumberTodayClassName: "font-bold text-blue-600",
        dayNumberOtherMonthClassName: "text-gray-400",
        taskInfoContainerClassName: "mt-2 flex flex-wrap gap-1",
        taskInfoBadgeClassName: "flex items-center bg-blue-100 px-2 py-1 rounded-md",
        taskInfoBadgeDotClassName: "w-2 h-2 bg-blue-500 rounded-full mr-1",
        taskInfoBadgeTextClassName: "text-xs text-blue-800",
        // Default hint styles (extracted from original MonthView)
        hintContainerClassName: "flex justify-end mb-2 text-xs", // Adjusted container
        hintLegendContainerClassName: "flex items-center mr-3",
        hintIndicatorClassName: "w-3 h-3 bg-blue-500 rounded-full mr-1", // Simple blue dot
        hintLegendTextClassName: "", // No specific class needed, default text color applies
        hintHelperTextClassName: "text-gray-500",
      };
  }
};

// Helper function to combine base and conditional classes
export const getDayCellClasses = (
  styles: MonthViewStyleProps,
  isCurrentMonth: boolean,
  isToday: boolean
): string => {
  let classes = styles.dayCellBaseClassName;
  if (isCurrentMonth) {
    classes += ` ${styles.dayCellCurrentMonthClassName}`;
    if (isToday) {
      classes += ` ${styles.dayCellTodayClassName}`;
    }
  } else {
    classes += ` ${styles.dayCellOtherMonthClassName}`;
  }
  return classes;
};

// Helper function to combine base and conditional classes for day number
export const getDayNumberClasses = (
    styles: MonthViewStyleProps,
    isCurrentMonth: boolean,
    isToday: boolean
): string => {
    let classes = styles.dayNumberBaseClassName;
    if (isCurrentMonth) {
        if (isToday) {
            classes += ` ${styles.dayNumberTodayClassName}`;
        }
    } else {
        classes += ` ${styles.dayNumberOtherMonthClassName}`;
    }
    return classes;
};

