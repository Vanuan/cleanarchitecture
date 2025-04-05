import React from "react";
import { NavigationItem, NavigationItemData } from "./NavigationItem";
import { getNavigationStyleProps, NavigationStyleVariant } from "./navigationStyles";

interface BaseNavigationSelectorProps {
  items: Omit<NavigationItemData, 'isCompact'>[];
  styleVariant?: NavigationStyleVariant;
  isCompact?: boolean;
}

export const BaseNavigationSelector: React.FC<BaseNavigationSelectorProps> = ({
  items,
  styleVariant = "default",
  isCompact = false,
}) => {
  const itemStyleProps = getNavigationStyleProps(styleVariant, isCompact);

  return (
    <>
        {items.map((item) => (
          <NavigationItem
            key={item.key}
            item={{ ...item, isCompact }}
            styleProps={itemStyleProps}
          />
        ))}
    </>
  );
}; 