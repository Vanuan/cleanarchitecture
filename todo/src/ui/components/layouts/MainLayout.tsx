import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { ResponsiveSidebar } from "../organisms/ResponsiveSidebar";
import { TitleBar } from "../organisms/TitleBar";
import { EntityViewType } from "../organisms/EntityView";

const LayoutContainer = tw.div`
  min-h-screen bg-gray-50 flex
`;

const MainContent = tw.div<{ $isCollapsed: boolean; $isMobile: boolean }>`
  flex-1 transition-all duration-300 ml-0
`;

const ContentWrapper = tw.div`
  flex flex-col flex-1
`;

interface MainLayoutProps {
  children: React.ReactNode;
  currentView: EntityViewType;
  onViewChange: (view: EntityViewType) => void;
  onAddClick: () => void;
  viewConfigs: Array<{
    id: EntityViewType;
    label: string;
    icon: React.ReactNode;
  }>;
}

export function MainLayout({
  children,
  currentView,
  onViewChange,
  onAddClick,
  viewConfigs,
}: MainLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setIsMobile(true);
        setIsCollapsed(false);
        setIsSidebarOpen(false);
      } else if (width >= 768 && width < 1024) {
        setIsMobile(false);
        setIsCollapsed(true); // Collapse in tablet mode
        setIsSidebarOpen(false);
      } else { // width >= 1024
        setIsMobile(false);
        setIsCollapsed(false); // Expand on large screens
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuClick = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      // Allow toggling collapse state manually only on non-mobile
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <LayoutContainer>
      <ResponsiveSidebar
        currentView={currentView}
        onViewChange={onViewChange}
        viewConfigs={viewConfigs}
        isCollapsed={isCollapsed}
        onCollapseChange={setIsCollapsed}
        isOpen={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
      <ContentWrapper>
        <TitleBar 
          onMenuClick={handleMenuClick} 
          currentView={currentView} 
          onAddClick={onAddClick}
        />
        <MainContent $isCollapsed={isCollapsed} $isMobile={isMobile}>
          {children}
        </MainContent>
      </ContentWrapper>
    </LayoutContainer>
  );
} 