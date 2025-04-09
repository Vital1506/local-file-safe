
import React from 'react';
import { useSidebar } from './SidebarContext';

const SidebarMobileOverlay: React.FC = () => {
  const { isMobile, mobileOpen, setMobileOpen } = useSidebar();

  if (!(isMobile && mobileOpen)) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      onClick={() => setMobileOpen(false)}
    />
  );
};

export default SidebarMobileOverlay;
