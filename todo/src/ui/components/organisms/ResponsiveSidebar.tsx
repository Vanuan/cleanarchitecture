import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { EntityViewType } from "./EntityView";
import { X, ChevronRight, ChevronLeft, CheckSquare } from "lucide-react";

const Overlay = tw.div<{ $isOpen: boolean }>`
  fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300
  ${({ $isOpen }) => ($isOpen ? "opacity-100" : "opacity-0 pointer-events-none")}
`;

const SidebarContainer = tw.div<{ $isCollapsed: boolean; $isOpen: boolean; $isMobile: boolean }>`
  h-screen bg-white shadow-lg transform transition-all duration-300 ease-in-out z-30
  ${({ $isOpen, $isCollapsed, $isMobile }) => {
    if ($isMobile) {
      return $isOpen ? "fixed top-0 left-0 w-4/5 max-w-xs translate-x-0" : "fixed top-0 left-0 w-4/5 max-w-xs -translate-x-full";
    }
    return $isCollapsed ? "w-16" : "w-64";
  }}
`;

const SidebarHeader = tw.div`
  p-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white
`;

const LogoContainer = tw.div`
  flex items-center justify-center
  ${({ $isCollapsed }: { $isCollapsed?: boolean }) => 
    $isCollapsed ? "w-8 h-8" : "w-10 h-10"}
`;

const Logo = tw.div`
  w-full h-full rounded-lg bg-white flex items-center justify-center
  shadow-md
`;

const AppTitle = tw.h2`
  text-xl font-bold ml-3 whitespace-nowrap overflow-hidden
`;

const CloseButton = tw.button`
  p-1 rounded-full hover:bg-white hover:bg-opacity-20
`;

const NavItem = tw.button<{ $active?: boolean; $isCollapsed?: boolean }>`
  w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center
  ${({ $active }) =>
    $active
      ? "bg-blue-50 text-blue-600"
      : "hover:bg-gray-100 active:bg-gray-200 text-gray-700"}
  ${({ $isCollapsed }) => $isCollapsed && "justify-center"}
`;

const NavIcon = tw.div`
  flex-shrink-0
`;

const NavLabel = tw.span`
  ${({ $isCollapsed }: { $isCollapsed?: boolean }) => 
    $isCollapsed ? "hidden" : "ml-3"}
`;

const CollapseButton = tw.button`
  p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none
`;

interface ResponsiveSidebarProps {
  currentView: EntityViewType;
  onViewChange: (view: EntityViewType) => void;
  viewConfigs: Array<{
    id: EntityViewType;
    label: string;
    icon: React.ReactNode;
  }>;
  isCollapsed: boolean;
  onCollapseChange: (isCollapsed: boolean) => void;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function ResponsiveSidebar({
  currentView,
  onViewChange,
  viewConfigs,
  isCollapsed,
  onCollapseChange,
  isOpen,
  onOpenChange,
}: ResponsiveSidebarProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        onOpenChange(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onOpenChange]);

  const handleToggle = () => {
    if (isMobile) {
      onOpenChange(!isOpen);
    } else {
      onCollapseChange(!isCollapsed);
    }
  };

  const renderNavItem = (view: { id: EntityViewType; label: string; icon: React.ReactNode }) => (
    <NavItem
      key={view.id}
      $active={currentView === view.id}
      $isCollapsed={isCollapsed && !isMobile}
      onClick={() => {
        onViewChange(view.id);
        if (isMobile) onOpenChange(false);
      }}
    >
      <NavIcon>{view.icon}</NavIcon>
      <NavLabel $isCollapsed={isCollapsed && !isMobile}>{view.label}</NavLabel>
    </NavItem>
  );

  return (
    <>
      {isMobile && <Overlay $isOpen={isOpen} onClick={() => onOpenChange(false)} />}
      <SidebarContainer $isCollapsed={isCollapsed} $isOpen={isOpen} $isMobile={isMobile}>
        <div className="h-full flex flex-col">
          <SidebarHeader>
            <div className="flex items-center">
              <LogoContainer $isCollapsed={isCollapsed && !isMobile}>
                <Logo>
                  <CheckSquare className="w-5 h-5 text-blue-600" />
                </Logo>
              </LogoContainer>
              {(!isCollapsed || isMobile) && <AppTitle>Todo App</AppTitle>}
              {isMobile && (
                <CloseButton onClick={() => onOpenChange(false)} className="ml-auto">
                  <X className="w-6 h-6" />
                </CloseButton>
              )}
            </div>
          </SidebarHeader>
          
          <div className="p-2 flex-1">
            <div className="mt-6">
              {(!isCollapsed || isMobile) && (
                <h3 className="text-sm font-medium text-gray-500 px-4 mb-2">Views</h3>
              )}
              {viewConfigs.map(renderNavItem)}
            </div>
          </div>
          
          {/* Collapse Button - Only show in desktop */}
          {!isMobile && (
            <div className="border-t border-gray-200 p-2 flex justify-center">
              <CollapseButton
                onClick={handleToggle}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? (
                  <ChevronRight className="w-5 h-5" />
                ) : (
                  <ChevronLeft className="w-5 h-5" />
                )}
              </CollapseButton>
            </div>
          )}
        </div>
      </SidebarContainer>
    </>
  );
} 