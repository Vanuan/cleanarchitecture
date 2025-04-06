import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { EntityViewType } from "./EntityView";
import { Menu, Plus } from "lucide-react";

const TitleBarContainer = tw.div<{ $isVisible: boolean }>`
  sticky w-full top-0 flex items-center justify-between border-b border-gray-200 z-10 flex-shrink-0
  h-16 px-4 bg-white shadow-sm transition-transform duration-300 ease-in-out transform ${({ $isVisible }) => ($isVisible ? 'translate-y-0' : '-translate-y-full')}
`;

const Title = tw.div`
  flex flex-col items-center justify-center flex-1
`;

const TitleText = tw.span`
  text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600
  font-semibold
`;

const ActionButton = tw.button`
  p-3 text-gray-600 hover:bg-gray-50 active:bg-gray-100 rounded-full
`;

interface TitleBarProps {
  onMenuClick: () => void;
  currentView: EntityViewType;
  onAddClick: () => void;
  isVisible: boolean;
}

export function TitleBar({ onMenuClick, currentView, onAddClick, isVisible }: TitleBarProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <TitleBarContainer $isVisible={isVisible}>
      {isMobile && (
        <ActionButton onClick={onMenuClick}>
          <Menu className="w-6 h-6" />
        </ActionButton>
      )}
      
      <Title>
        <TitleText>{currentView}</TitleText>
      </Title>
      
      <ActionButton onClick={onAddClick}>
        <Plus className="w-5 h-5" />
      </ActionButton>
    </TitleBarContainer>
  );
} 