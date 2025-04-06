import React, { useState, useEffect, useRef } from "react";
import tw from "tailwind-styled-components";
import { ResponsiveSidebar } from "../organisms/ResponsiveSidebar";
import { TitleBar } from "../organisms/TitleBar";
import { EntityViewType } from "../organisms/EntityView";

const LayoutContainer = tw.div`
  h-screen bg-gray-50 flex overflow-hidden
`;

const MainContent = tw.div<{ $isCollapsed: boolean; $isMobile: boolean }>`
  transition-all duration-300 ml-0
`;

const ContentWrapper = tw.div`
  flex flex-col flex-1 overflow-y-auto
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
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const [isTitleBarVisible, setIsTitleBarVisible] = useState(true);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const wrapperElement = contentWrapperRef.current;
    if (!wrapperElement) return;

    const handleScroll = () => {
      const currentScrollTop = wrapperElement.scrollTop;
      if (currentScrollTop > prevScrollTop) {
        if (currentScrollTop > 64) {
          setIsTitleBarVisible(false);
        }
      } else {
        setIsTitleBarVisible(true);
      }
      setPrevScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    wrapperElement.addEventListener('scroll', handleScroll);
    return () => {
      wrapperElement.removeEventListener('scroll', handleScroll);
    };
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
      <ContentWrapper ref={contentWrapperRef}>
        <TitleBar 
          onMenuClick={handleMenuClick} 
          currentView={currentView} 
          onAddClick={onAddClick}
          isVisible={isTitleBarVisible}
        />
        <MainContent $isCollapsed={isCollapsed} $isMobile={isMobile}>
          {children}
        </MainContent>
      </ContentWrapper>
    </LayoutContainer>
  );
} 