
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileItem, getUserFiles, getAllFiles } from '@/services/fileService';
import { useAuth } from '@/context/AuthContext';
import { Search, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';
import FileTable from './FileTable';
import FileGridView from './FileGridView';
import EmptyFileState from './EmptyFileState';

type SortField = 'name' | 'createdAt' | 'size';
type SortDirection = 'asc' | 'desc';

const FileList = ({ showAll = false }) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const fetchFiles = async () => {
    setLoading(true);
    try {
      let fetchedFiles;
      if (showAll && user?.role === 'admin') {
        fetchedFiles = await getAllFiles();
      } else {
        fetchedFiles = await getUserFiles(user?.id || '');
      }
      setFiles(fetchedFiles);
    } catch (error) {
      toast.error('Failed to fetch files');
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchFiles();
  }, [user?.id, showAll]);
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const filteredFiles = files
    .filter(file => {
      if (!searchTerm) return true;
      const lowerSearch = searchTerm.toLowerCase();
      return (
        file.name.toLowerCase().includes(lowerSearch) ||
        file.tags.some(tag => tag.toLowerCase().includes(lowerSearch))
      );
    })
    .sort((a, b) => {
      if (sortField === 'name') {
        return sortDirection === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (sortField === 'createdAt') {
        return sortDirection === 'asc'
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortField === 'size') {
        return sortDirection === 'asc'
          ? a.size - b.size
          : b.size - a.size;
      }
      return 0;
    });
    
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={fetchFiles} variant="outline">
          <RefreshCcw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Files</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          {loading ? (
            <Card>
              <div className="py-24 flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            </Card>
          ) : filteredFiles.length === 0 ? (
            <Card>
              <EmptyFileState />
            </Card>
          ) : (
            <FileTable
              files={filteredFiles}
              userId={user?.id || ''}
              isAdmin={user?.role === 'admin'}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              onFileDeleted={fetchFiles}
              loading={loading}
            />
          )}
        </TabsContent>
        
        <TabsContent value="documents" className="mt-4">
          <FileGridView files={filteredFiles} fileType="documents" />
        </TabsContent>
        
        <TabsContent value="images" className="mt-4">
          <FileGridView files={filteredFiles} fileType="images" />
        </TabsContent>
        
        <TabsContent value="other" className="mt-4">
          <FileGridView files={filteredFiles} fileType="other" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FileList;
