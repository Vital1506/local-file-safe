
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  FileText, 
  Shield, 
  Upload, 
  Star,
  Users
} from 'lucide-react';

export interface SidebarMenuItem {
  title: string;
  icon: React.ElementType;
  path: string;
  active: boolean;
}

export const useSidebarItems = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isAdmin = user?.role === 'admin';

  const menuItems: SidebarMenuItem[] = [
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

  const adminItems: SidebarMenuItem[] = isAdmin ? [
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
  ] : [];

  return { menuItems, adminItems, isAdmin };
};
