
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useSidebar } from './SidebarContext';

const SidebarMobileToggle: React.FC = () => {
  const { isMobile, toggleSidebar } = useSidebar();

  if (!isMobile) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed top-4 left-4 z-50"
      onClick={toggleSidebar}
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle Menu</span>
    </Button>
  );
};

export default SidebarMobileToggle;
