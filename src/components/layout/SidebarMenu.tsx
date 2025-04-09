
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SidebarMenuItem } from './SidebarItems';
import { cn } from '@/lib/utils';
import { useSidebar } from './SidebarContext';

interface SidebarMenuProps {
  items: SidebarMenuItem[];
  title?: string;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ items, title }) => {
  const navigate = useNavigate();
  const { collapsed } = useSidebar();

  if (items.length === 0) return null;

  return (
    <div className="px-3 py-2">
      {!collapsed && title && (
        <p className="text-xs font-medium text-muted-foreground mb-3">{title}</p>
      )}
      <nav className="space-y-1">
        {items.map((item) => (
          <Button
            key={item.title}
            variant={item.active ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start mb-1",
              item.active ? "bg-secondary" : "",
              collapsed ? "px-3" : "px-3"
            )}
            onClick={() => navigate(item.path)}
          >
            <item.icon className={cn("h-5 w-5", item.active ? "text-primary" : "")} />
            {!collapsed && <span className="ml-3">{item.title}</span>}
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default SidebarMenu;
