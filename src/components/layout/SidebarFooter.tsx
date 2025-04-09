
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSidebar } from './SidebarContext';

const SidebarFooter: React.FC = () => {
  const { user, logout } = useAuth();
  const { collapsed } = useSidebar();

  return (
    <div className="p-4 border-t">
      <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && (
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium">{user?.username}</p>
              <p className="text-xs text-muted-foreground">{user?.role}</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={logout}
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default SidebarFooter;
