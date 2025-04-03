import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileItem, getUserFiles, getAllFiles, deleteFile } from '@/services/fileService';
import { useAuth } from '@/context/AuthContext';
import { 
  FileType, 
  File as FileIcon,
  Image, 
  FileSpreadsheet, 
  FileText,
  Search,
  Download,
  Trash2,
  Star,
  ChevronDown,
  ChevronUp,
  RefreshCcw 
} from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const getFileIcon = (fileType: string) => {
  if (fileType.includes('pdf')) return <FileType className="h-10 w-10 text-red-500" />;
  if (fileType.includes('image')) return <Image className="h-10 w-10 text-blue-500" />;
  if (fileType.includes('sheet') || fileType.includes('excel') || fileType.includes('csv')) 
    return <FileSpreadsheet className="h-10 w-10 text-green-500" />;
  if (fileType.includes('word') || fileType.includes('document')) 
    return <FileText className="h-10 w-10 text-blue-500" />;
  return <FileIcon className="h-10 w-10 text-gray-500" />;
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
};

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

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
  
  const handleDelete = async (fileId: string) => {
    try {
      await deleteFile(fileId, user?.id || '', user?.role === 'admin');
      fetchFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
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
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="py-24 flex items-center justify-center">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
                </div>
              ) : filteredFiles.length === 0 ? (
                <div className="py-24 flex flex-col items-center justify-center text-muted-foreground">
                  <FileIcon className="h-12 w-12 mb-4" strokeWidth={1.5} />
                  <p className="text-lg">No files found</p>
                  <p className="text-sm">Upload some files to get started</p>
                  <Button 
                    className="mt-4" 
                    onClick={() => navigate('/dashboard/upload')}
                  >
                    Upload Files
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/40">
                        <th className="text-left py-3 px-4">
                          <button
                            className="flex items-center font-medium text-sm"
                            onClick={() => handleSort('name')}
                          >
                            Name {getSortIcon('name')}
                          </button>
                        </th>
                        <th className="text-left py-3 px-4 hidden md:table-cell">
                          <button
                            className="flex items-center font-medium text-sm"
                            onClick={() => handleSort('createdAt')}
                          >
                            Date Added {getSortIcon('createdAt')}
                          </button>
                        </th>
                        <th className="text-left py-3 px-4 hidden md:table-cell">
                          <button
                            className="flex items-center font-medium text-sm"
                            onClick={() => handleSort('size')}
                          >
                            Size {getSortIcon('size')}
                          </button>
                        </th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFiles.map((file) => (
                        <tr key={file.id} className="border-b hover:bg-muted/30">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              {getFileIcon(file.type)}
                              <div className="ml-3">
                                <div className="font-medium">{file.name}</div>
                                <div className="text-xs text-muted-foreground md:hidden">
                                  {formatDate(file.createdAt)} - {formatFileSize(file.size)}
                                </div>
                                {file.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {file.tags.slice(0, 2).map((tag) => (
                                      <Badge key={tag} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                    {file.tags.length > 2 && (
                                      <Badge variant="outline" className="text-xs">
                                        +{file.tags.length - 2}
                                      </Badge>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm hidden md:table-cell">
                            {formatDate(file.createdAt)}
                          </td>
                          <td className="py-3 px-4 text-sm hidden md:table-cell">
                            {formatFileSize(file.size)}
                          </td>
                          <td className="py-3 px-4">
                            <Badge 
                              variant={file.status === 'encrypted' ? 'default' : 'destructive'}
                              className="h-6"
                            >
                              {file.status === 'encrypted' && (
                                <div className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse" />
                              )}
                              {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right space-x-1">
                            <Button variant="ghost" size="icon" title="Download">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title={file.isStarred ? "Unstar" : "Star"}
                            >
                              <Star className={`h-4 w-4 ${file.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" title="Delete">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action will securely delete {file.name}. This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDelete(file.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFiles
                  .filter(file => 
                    file.type.includes('pdf') || 
                    file.type.includes('document') || 
                    file.type.includes('word')
                  )
                  .map(file => (
                    <div 
                      key={file.id}
                      className="file-card group cursor-pointer"
                      onClick={() => navigate(`/dashboard/file/${file.id}`)}
                    >
                      <div className="flex justify-center mb-4">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-center truncate">{file.name}</h3>
                        <p className="text-xs text-center text-muted-foreground">
                          {formatDate(file.createdAt)} • {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="images" className="mt-4">
          {/* Similar to documents tab but filter for image types */}
        </TabsContent>
        
        <TabsContent value="other" className="mt-4">
          {/* Similar to documents tab but filter for other types */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FileList;
