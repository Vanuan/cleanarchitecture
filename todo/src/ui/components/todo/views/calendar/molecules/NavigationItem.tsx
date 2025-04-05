import React, { memo } from "react";

export interface NavigationItemData {
  key: string;
  isSelected: boolean;
  onClick: () => void;
  upperContent?: React.ReactNode;
  mainContent: React.ReactNode;
  lowerContent?: React.ReactNode;
  isCompact?: boolean;
}

interface NavigationItemStyleProps {
  baseClassName?: string;
  selectedClassName?: string;
  unselectedClassName?: string;
}

interface NavigationItemProps {
  item: NavigationItemData;
  styleProps?: NavigationItemStyleProps;
}

export const NavigationItem = memo(({ item, styleProps }: NavigationItemProps) => {
  const {
    isSelected,
    onClick,
    upperContent,
    mainContent,
    lowerContent
  } = item;

  const {
    baseClassName,
    selectedClassName,
    unselectedClassName
  } = styleProps || {};

  const className = `${baseClassName} ${
    isSelected ? selectedClassName : unselectedClassName
  }`;

  return (
    <button className={className} onClick={onClick}>
      {upperContent}
      {mainContent}
      {lowerContent}
    </button>
  );
}); 