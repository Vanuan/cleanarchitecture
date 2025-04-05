import React, { useMemo } from "react";
import { CalendarViewType } from "../../calendar-hooks";
import { BaseNavigationSelector } from "../molecules/BaseNavigationSelector";
import { NavigationItemData } from "../molecules/NavigationItem";
import { NavigationStyleVariant, getNavigationLabelStyles } from "../molecules/navigationStyles";
import { MainLabel } from "../atoms/NavigationLabels";

interface CalendarViewSelectorProps {
  view: CalendarViewType;
  onViewChange: (view: CalendarViewType) => void;
  styleVariant?: NavigationStyleVariant;
}

export const CalendarViewSelector: React.FC<CalendarViewSelectorProps> = ({
  view,
  onViewChange,
  styleVariant = "default"
}) => {
  const items: Omit<NavigationItemData, 'isCompact'>[] = useMemo(() => [
    {
      key: "month",
      isSelected: view === "month",
      onClick: () => onViewChange("month"),
      mainContent: (
        <MainLabel className={getNavigationLabelStyles(styleVariant, view === "month").mainLabel}>
          Month
        </MainLabel>
      )
    },
    {
      key: "week",
      isSelected: view === "week",
      onClick: () => onViewChange("week"),
      mainContent: (
        <MainLabel className={getNavigationLabelStyles(styleVariant, view === "week").mainLabel}>
          Week
        </MainLabel>
      )
    },
    {
      key: "day",
      isSelected: view === "day",
      onClick: () => onViewChange("day"),
      mainContent: (
        <MainLabel className={getNavigationLabelStyles(styleVariant, view === "day").mainLabel}>
          Day
        </MainLabel>
      )
    }
  ], [view, onViewChange, styleVariant]);

  return (
    <div className="flex-1 flex">
      <BaseNavigationSelector
        items={items}
        styleVariant={styleVariant}
        isCompact={false}
      />
    </div>
  );
}; 