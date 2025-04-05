import React from "react";

interface LabelProps {
  children: React.ReactNode;
  className?: string;
}

export const UpperLabel: React.FC<LabelProps> = ({ children, className = "" }) => (
  <span className={`text-xs font-medium ${className}`}>{children}</span>
);

export const MainLabel: React.FC<LabelProps> = ({ children, className = "" }) => (
  <span className={`text-lg ${className}`}>{children}</span>
);

export const LowerLabel: React.FC<LabelProps> = ({ children, className = "" }) => (
  <span className={`text-xs mt-1 ${className}`}>{children}</span>
); 