export interface INavigationItem {
  key: string;
  upperLabel: string;
  mainLabel: string;
  date: Date;
  isSelected: boolean;
  lowerLabel?: string;
  isToday?: boolean;
  isYesterday?: boolean;
  isTomorrow?: boolean;
}

export interface NavigationConfig {
  generateItems: (currentDate: Date) => INavigationItem[];
  navigatePrevious: (date: Date) => Date;
  navigateNext: (date: Date) => Date;
}
