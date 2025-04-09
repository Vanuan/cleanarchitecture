export type DayViewStyleVariant = "default" | "inverted";

// TODO: Define more specific styles based on inverted look and feel
interface DayViewStyleProps {
  viewContainerClassName: string;
  // All Day Section
  allDaySectionContainerClassName: string;
  allDayHeaderContainerClassName: string;
  allDayHeaderTitleClassName: string;
  allDayHeaderHintClassName: string;
  allDayHintIconClassName: string;
  allDayItemsContainerClassName: string;
  allDayItemWrapperClassName: string;
  allDayItemTimeClassName: string;
  allDayEmptyStateClassName: string;
  allDayAddButtonContainerClassName: string;
  allDayAddButtonClassName: string;
  allDayAddButtonIconClassName: string;
  // Schedule Section
  scheduleSectionContainerClassName: string;
  scheduleHeaderContainerClassName: string;
  scheduleHeaderTitleClassName: string;
  scheduleGridClassName: string;
  timeSlotWrapperClassName: string;
  timeLabelClassName: string;
  timeSlotClassName: string;
  taskItemClassName: string; // Style for the task block itself
  taskItemTitleClassName: string;
  taskItemTimeClassName: string;
  taskItemTimeIconClassName: string;
  currentTimeIndicatorClassName: string;
  currentTimeDotClassName: string;
}

export const getDayViewStyleProps = (
  variant: DayViewStyleVariant
): DayViewStyleProps => {
  switch (variant) {
    case "inverted":
      // Define inverted styles - aiming for cleaner look
      return {
        viewContainerClassName: "flex flex-col h-full bg-white", // White background
        // All Day Section - Cleaner borders, less prominent background
        allDaySectionContainerClassName: "mb-3 border border-gray-100 rounded-lg overflow-hidden", // Lighter border, added rounded
        allDayHeaderContainerClassName: "p-3 border-b border-gray-100 flex justify-between items-center",
        allDayHeaderTitleClassName: "font-medium text-gray-700",
        allDayHeaderHintClassName: "text-xs text-gray-500 flex items-center",
        allDayHintIconClassName: "h-4 w-4 mr-1 text-gray-400",
        allDayItemsContainerClassName: "divide-y divide-gray-100",
        allDayItemWrapperClassName: "p-3", // Wrapper for padding
        allDayItemTimeClassName: "text-xs text-gray-500 mb-1",
        allDayEmptyStateClassName: "p-3 text-gray-500 text-center italic", // Added italic
        allDayAddButtonContainerClassName: "p-3",
        allDayAddButtonClassName: "w-full py-2 border border-dashed border-gray-300 rounded-lg text-blue-500 flex items-center justify-center hover:bg-blue-50 active:bg-blue-100",
        allDayAddButtonIconClassName: "h-4 w-4 mr-1",
        // Schedule Section - Lighter grid lines
        scheduleSectionContainerClassName: "bg-white border border-gray-100 rounded-lg overflow-hidden", // Lighter border, added rounded
        scheduleHeaderContainerClassName: "p-3 border-b border-gray-100",
        scheduleHeaderTitleClassName: "font-medium text-gray-700",
        scheduleGridClassName: "relative", // Keep relative positioning
        timeSlotWrapperClassName: "flex border-b border-gray-100 last:border-b-0", // Lighter border
        timeLabelClassName: "w-16 py-2 px-2 text-right text-xs text-gray-500 border-r border-gray-100", // Lighter border
        timeSlotClassName: "flex-1 min-h-[70px] relative hover:bg-blue-50 cursor-pointer transition-colors", // Add hover/cursor for adding tasks
        taskItemClassName: "absolute inset-x-2 rounded-md p-2 overflow-hidden bg-blue-50 hover:bg-blue-100 transition-colors border-l-4 border-blue-400 cursor-default", // Use lighter bg/border, reset cursor
        taskItemTitleClassName: "font-medium text-sm text-blue-800",
        taskItemTimeClassName: "flex items-center text-xs text-blue-700 mt-1",
        taskItemTimeIconClassName: "h-3 w-3 mr-1",
        currentTimeIndicatorClassName: "absolute left-16 right-0 border-t-2 border-red-500 z-20",
        currentTimeDotClassName: "w-2 h-2 rounded-full bg-red-500 -mt-1 -ml-1",
      };
    default: // Extracted from original DayView
      return {
        viewContainerClassName: "flex flex-col h-full bg-gray-50",
        allDaySectionContainerClassName: "bg-white mb-3 shadow-sm",
        allDayHeaderContainerClassName: "p-3 border-b border-gray-200 flex justify-between items-center",
        allDayHeaderTitleClassName: "font-medium text-gray-900",
        allDayHeaderHintClassName: "text-xs text-gray-500 flex items-center",
        allDayHintIconClassName: "mr-1 h-4 w-4", // Adjusted size notation
        allDayItemsContainerClassName: "divide-y divide-gray-100",
        allDayItemWrapperClassName: "p-3",
        allDayItemTimeClassName: "text-xs text-gray-500 mb-1",
        allDayEmptyStateClassName: "p-3 text-gray-500 text-center",
        allDayAddButtonContainerClassName: "p-3",
        allDayAddButtonClassName: "w-full py-2 border border-dashed border-gray-300 rounded-lg text-blue-500 flex items-center justify-center",
        allDayAddButtonIconClassName: "h-4 w-4 mr-1",
        scheduleSectionContainerClassName: "bg-white shadow-sm",
        scheduleHeaderContainerClassName: "p-3 border-b border-gray-200",
        scheduleHeaderTitleClassName: "font-medium text-gray-900",
        scheduleGridClassName: "relative",
        timeSlotWrapperClassName: "flex border-b border-gray-100 last:border-b-0",
        timeLabelClassName: "w-16 py-2 px-2 text-right text-xs text-gray-500 border-r border-gray-100",
        timeSlotClassName: "flex-1 min-h-[70px] relative", // No hover/cursor by default
        taskItemClassName: "absolute inset-x-2 rounded-md p-2 overflow-hidden hover:bg-blue-200 transition-colors border-l-4 border-blue-500", // Original had hover:bg-blue-200
        taskItemTitleClassName: "font-medium text-sm",
        taskItemTimeClassName: "flex items-center text-xs text-gray-600 mt-1",
        taskItemTimeIconClassName: "h-3 w-3 mr-1",
        currentTimeIndicatorClassName: "absolute left-16 right-0 border-t-2 border-red-500 z-20",
        currentTimeDotClassName: "w-2 h-2 rounded-full bg-red-500 -mt-1 -ml-1",
      };
  }
};
