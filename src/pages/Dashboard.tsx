
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import FileList from '@/components/files/FileList';
import FileUpload from '@/components/files/FileUpload';
import FileDetails from '@/components/files/FileDetails';
import { FileItem, getUserFiles } from '@/services/fileService';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Upload, ChevronLeft } from 'lucide-react';

const Dashboard = () => {
  const { section, id } = useParams<{ section?: string; id?: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState<FileItem | null>(null);
  
  // Fetch file details if needed
  useEffect(() => {
    const fetchFileDetails = async () => {
      if (id && user) {
        try {
          const files = await getUserFiles(user.id);
          const foundFile = files.find(f => f.id === id);
          
          if (foundFile) {
            setFile(foundFile);
          } else {
            navigate('/dashboard');
          }
        } catch (error) {
          console.error('Error fetching file details:', error);
          navigate('/dashboard');
        }
      }
    };
    
    if (section === 'file') {
      fetchFileDetails();
    }
  }, [id, user, section, navigate]);
  
  // Render the appropriate content based on the section
  const renderContent = () => {
    switch (section) {
      case 'upload':
        return (
          <div>
            <div className="mb-6 flex items-center">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="mr-2"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h1 className="text-2xl font-bold">Upload New File</h1>
            </div>
            <FileUpload />
          </div>
        );
      case 'file':
        if (!file) {
          return (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          );
        }
        return (
          <div>
            <div className="mb-6 flex items-center">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="mr-2"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h1 className="text-2xl font-bold">File Details</h1>
            </div>
            <FileDetails file={file} />
          </div>
        );
      case 'starred':
        return (
          <div>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold">Starred Files</h1>
                <p className="text-muted-foreground">Access your important files quickly</p>
              </div>
              <Button 
                onClick={() => navigate('/dashboard/upload')}
                className="mt-4 sm:mt-0"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload New File
              </Button>
            </div>
            <FileList showAll={false} />
          </div>
        );
      default:
        return (
          <div>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold">My Files</h1>
                <p className="text-muted-foreground">Manage your secure files</p>
              </div>
              <Button 
                onClick={() => navigate('/dashboard/upload')}
                className="mt-4 sm:mt-0"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload New File
              </Button>
            </div>
            <FileList showAll={false} />
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      {renderContent()}
    </DashboardLayout>
  );
};

export default Dashboard;
