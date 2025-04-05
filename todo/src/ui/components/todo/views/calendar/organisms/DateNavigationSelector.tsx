import React, { useCallback, useMemo } from "react";
import { INavigationItem } from "../services";
import { UpperLabel, MainLabel, LowerLabel } from "../atoms/NavigationLabels";
import { NavigationItemData } from "../molecules/NavigationItem";
import { BaseNavigationSelector } from "../molecules/BaseNavigationSelector";
import { NavigationStyleVariant } from "../molecules/navigationStyles";
import { getNavigationLabelStyles } from "../molecules/navigationStyles";

interface DateNavigationSelectorProps {
  visibleItems: INavigationItem[];
  onDateChange: (date: Date) => void;
  styleVariant?: NavigationStyleVariant;
  longestLabel: string;
}

export const DateNavigationSelector: React.FC<DateNavigationSelectorProps> = ({
  visibleItems,
  onDateChange,
  styleVariant = "default",
  longestLabel,
}) => {
  const getLabelStyles = useCallback(
    (item: INavigationItem) => {
      return getNavigationLabelStyles(
        styleVariant,
        item.isSelected,
        item.isToday
      );
    },
    [styleVariant]
  );

  const items: Omit<NavigationItemData, "isCompact">[] = useMemo(
    () =>
      visibleItems.map((item) => {
        const styles = getLabelStyles(item);
        return {
          key: item.key,
          isSelected: item.isSelected,
          onClick: () => onDateChange(item.date),
          upperContent: (
            <UpperLabel className={styles.upperLabel}>
              {item.upperLabel}
            </UpperLabel>
          ),
          mainContent: (
            <MainLabel className={styles.mainLabel}>{item.mainLabel}</MainLabel>
          ),
          lowerContent: item.lowerLabel ? (
            <LowerLabel className={styles.lowerLabel}>
              {item.lowerLabel}
            </LowerLabel>
          ) : (
            <LowerLabel className={`${styles.lowerLabel} invisible`} aria-hidden="true">
              {longestLabel}
            </LowerLabel>
          ),
        };
      }),
    [visibleItems, onDateChange, getLabelStyles, longestLabel]
  );

  return (
    <BaseNavigationSelector
      items={items}
      styleVariant={styleVariant}
      isCompact={false}
    />
  );
};
