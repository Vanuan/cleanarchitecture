export type NavigationStyleVariant = "default" | "minimal" | "colorful" | "inverted";

interface NavigationStyleProps {
  baseClassName: string;
  selectedClassName: string;
  unselectedClassName: string;
}

interface LabelStyleProps {
  upperLabel: string;
  mainLabel: string;
  lowerLabel: string;
}

export const getNavigationStyleProps = (
  styleVariant: NavigationStyleVariant,
  isCompact: boolean = false
): NavigationStyleProps => {
  const baseClassName = isCompact
    ? "flex-1 flex items-normal justify-center p-2 transition-colors text-sm font-medium"
    : "flex-1 flex flex-col items-stretch p-2 text-center transition-colors";

  switch (styleVariant) {
    case "minimal":
      return {
        baseClassName,
        selectedClassName: "border-b-2 border-black text-black",
        unselectedClassName: "border-b-2 border-transparent text-gray-500 hover:text-gray-700"
      };
    case "colorful":
      return {
        baseClassName,
        selectedClassName: "bg-white bg-opacity-30 text-white font-bold",
        unselectedClassName: "hover:bg-white hover:bg-opacity-20 text-white"
      };
    case "inverted":
      return {
        baseClassName,
        selectedClassName: "border-b-2 border-emerald-400 bg-gray-50",
        unselectedClassName: "text-gray-600 hover:bg-gray-50 active:bg-gray-100"
      };
    default:
      return {
        baseClassName,
        selectedClassName: isCompact ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700",
        unselectedClassName: isCompact
          ? "bg-white text-gray-700 hover:bg-gray-50"
          : "hover:bg-gray-50 active:bg-gray-100 text-gray-600"
      };
  }
};

export const getNavigationLabelStyles = (
  styleVariant: NavigationStyleVariant,
  isSelected: boolean = false,
  isToday: boolean = false
): LabelStyleProps => {
  switch (styleVariant) {
    case "minimal":
      return {
        upperLabel: "text-gray-500",
        mainLabel: isSelected ? "font-bold" : "font-medium",
        lowerLabel: isToday ? "text-blue-600 font-medium" : "text-gray-500"
      };
    case "colorful":
      return {
        upperLabel: "text-white",
        mainLabel: isSelected ? "font-bold text-white" : "text-white",
        lowerLabel: isToday ? "text-white font-bold" : "text-white"
      };
    case "inverted":
      return {
        upperLabel: "text-gray-500",
        mainLabel: isSelected 
          ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 font-medium"
          : "text-gray-600 font-medium",
        lowerLabel: isToday 
          ? "font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500"
          : "text-gray-400"
      };
    default:
      return {
        upperLabel: "text-gray-500",
        mainLabel: isSelected ? "font-bold" : "font-medium",
        lowerLabel: isToday ? "text-green-600 font-medium" : "text-gray-500"
      };
  }
}; 