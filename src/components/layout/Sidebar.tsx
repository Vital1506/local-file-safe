
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { 
  User, 
  FileText, 
  Shield, 
  Upload, 
  LogOut,
  Menu,
  X,
  Star,
  Users,
  Settings
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
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

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  // Close mobile sidebar when navigating
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isAdmin = user?.role === 'admin';

  const menuItems = [
    {
      title: 'My Files',
      icon: FileText,
      path: '/dashboard',
      active: location.pathname === '/dashboard'
    },
    {
      title: 'Upload',
      icon: Upload,
      path: '/dashboard/upload',
      active: location.pathname === '/dashboard/upload'
    },
    {
      title: 'Starred',
      icon: Star,
      path: '/dashboard/starred',
      active: location.pathname === '/dashboard/starred'
    }
  ];

  const adminItems = [
    {
      title: 'All Files',
      icon: Shield,
      path: '/admin',
      active: location.pathname === '/admin'
    },
    {
      title: 'Users',
      icon: Users,
      path: '/admin/users',
      active: location.pathname === '/admin/users'
    }
  ];

  const sidebarClasses = cn(
    'fixed h-screen bg-card shadow-lg transition-all duration-300 flex flex-col z-50',
    collapsed ? 'w-[70px]' : 'w-[240px]',
    isMobile && 'left-0',
    isMobile && !mobileOpen && '-translate-x-full'
  );

  return (
    <>
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      )}

      <div className={sidebarClasses}>
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

        <div className="flex-grow overflow-y-auto py-4">
          <div className="px-3 py-2">
            {!collapsed && <p className="text-xs font-medium text-muted-foreground mb-3">FILES</p>}
            <nav className="space-y-1">
              {menuItems.map((item) => (
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

          {isAdmin && (
            <div className="px-3 py-2 mt-6">
              {!collapsed && <p className="text-xs font-medium text-muted-foreground mb-3">ADMIN</p>}
              <nav className="space-y-1">
                {adminItems.map((item) => (
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
          )}
        </div>

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
      </div>

      {/* Overlay for mobile */}
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
