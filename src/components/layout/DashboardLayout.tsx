
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  adminRequired?: boolean;
}

const DashboardLayout = ({ children, adminRequired = false }: DashboardLayoutProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    } else if (adminRequired && user?.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [isLoading, isAuthenticated, adminRequired, user, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="h-6 w-6 text-primary animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-[70px] md:ml-[240px] transition-all duration-300 pt-16 md:pt-0">
        <div className="container mx-auto p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
