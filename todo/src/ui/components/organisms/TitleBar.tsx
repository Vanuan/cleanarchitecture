import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { Menu, Plus } from "lucide-react";
import { useLocation } from "react-router-dom";
import { viewRoutes } from "../../routes/viewRoutes";

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
  onAddClick: () => void;
  isVisible: boolean;
}

export function TitleBar({ onMenuClick, onAddClick, isVisible }: TitleBarProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const location = useLocation();
  const currentLabel =
    viewRoutes.find((route) => route.path === location.pathname)?.label || "";

  return (
    <TitleBarContainer $isVisible={isVisible}>
      {isMobile && (
        <ActionButton onClick={onMenuClick}>
          <Menu className="w-6 h-6" />
        </ActionButton>
      )}
      
      <Title>
        <TitleText>{currentLabel}</TitleText>
      </Title>
      
      <ActionButton onClick={onAddClick}>
        <Plus className="w-5 h-5" />
      </ActionButton>
    </TitleBarContainer>
  );
}
