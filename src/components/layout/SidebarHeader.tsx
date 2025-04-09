
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X, Shield } from 'lucide-react';
import { useSidebar } from './SidebarContext';

const SidebarHeader: React.FC = () => {
  const { collapsed, isMobile, toggleSidebar } = useSidebar();

  return (
    <div className="flex items-center justify-between p-4 border-b">
      {!collapsed && (
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-semibold">SFMS</span>
        </div>
      )}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar} 
        className={cn(collapsed && !isMobile && 'mx-auto')}
      >
        {isMobile 
          ? <X className="h-5 w-5" />
          : collapsed 
            ? <Menu className="h-5 w-5" /> 
            : <X className="h-5 w-5" />
        }
      </Button>
    </div>
  );
};

export default SidebarHeader;
