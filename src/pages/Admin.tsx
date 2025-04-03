
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import FileList from '@/components/files/FileList';
import UserList from '@/components/admin/UserList';
import { Button } from '@/components/ui/button';
import { Upload, Users, ChevronLeft } from 'lucide-react';

const Admin = () => {
  const { section } = useParams<{ section?: string }>();
  const navigate = useNavigate();
  
  // Render the appropriate content based on the section
  const renderContent = () => {
    switch (section) {
      case 'users':
        return (
          <div>
            <div className="mb-6 flex items-center">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/admin')}
                className="mr-2"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h1 className="text-2xl font-bold">User Management</h1>
            </div>
            <UserList />
          </div>
        );
      default:
        return (
          <div>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage all files and users</p>
              </div>
              <div className="flex space-x-2 mt-4 sm:mt-0">
                <Button 
                  variant="outline"
                  onClick={() => navigate('/admin/users')}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
                <Button onClick={() => navigate('/dashboard/upload')}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload File
                </Button>
              </div>
            </div>
            <FileList showAll={true} />
          </div>
        );
    }
  };

  return (
    <DashboardLayout adminRequired>
      {renderContent()}
    </DashboardLayout>
  );
};

export default Admin;
