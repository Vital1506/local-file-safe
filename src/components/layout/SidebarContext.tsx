
import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SidebarContextType {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  isMobile: boolean;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', checkSize);
    checkSize();

    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Close mobile sidebar when navigating
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <SidebarContext.Provider 
      value={{ 
        collapsed, 
        setCollapsed, 
        isMobile, 
        mobileOpen, 
        setMobileOpen, 
        toggleSidebar 
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
