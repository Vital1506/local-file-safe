
import React from 'react';
import { cn } from '@/lib/utils';
import { useSidebar, SidebarProvider } from './SidebarContext';
import { useSidebarItems } from './SidebarItems';
import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';
import SidebarFooter from './SidebarFooter';
import SidebarMobileToggle from './SidebarMobileToggle';
import SidebarMobileOverlay from './SidebarMobileOverlay';

const SidebarContent: React.FC = () => {
  const { collapsed, isMobile, mobileOpen } = useSidebar();
  const { menuItems, adminItems, isAdmin } = useSidebarItems();

  const sidebarClasses = cn(
    'fixed h-screen bg-card shadow-lg transition-all duration-300 flex flex-col z-50',
    collapsed ? 'w-[70px]' : 'w-[240px]',
    isMobile && 'left-0',
    isMobile && !mobileOpen && '-translate-x-full'
  );

  return (
    <>
      <SidebarMobileToggle />

      <div className={sidebarClasses}>
        <SidebarHeader />

        <div className="flex-grow overflow-y-auto py-4">
          <SidebarMenu items={menuItems} />
          {isAdmin && <SidebarMenu items={adminItems} title="ADMIN" />}
        </div>

        <SidebarFooter />
      </div>

      <SidebarMobileOverlay />
    </>
  );
};

const Sidebar: React.FC = () => {
  return (
    <SidebarProvider>
      <SidebarContent />
    </SidebarProvider>
  );
};

export default Sidebar;
