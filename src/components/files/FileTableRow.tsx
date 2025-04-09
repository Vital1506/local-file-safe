
import { FileItem, deleteFile } from '@/services/fileService';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import FileIconComponent from './FileIcon';
import { formatDate, formatFileSize } from '@/utils/fileUtils';
import { useNavigate } from 'react-router-dom';
import { 
  Download,
  Star,
  Trash2 
} from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';

interface FileTableRowProps {
  file: FileItem;
  userId: string;
  isAdmin: boolean;
  onFileDeleted: () => void;
}

const FileTableRow = ({ file, userId, isAdmin, onFileDeleted }: FileTableRowProps) => {
  const navigate = useNavigate();

  const handleDelete = async (fileId: string) => {
    try {
      await deleteFile(fileId, userId, isAdmin);
      onFileDeleted();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <tr key={file.id} className="border-b hover:bg-white/50 transition-colors">
      <td className="py-3 px-4">
        <div className="flex items-center">
          <FileIconComponent fileType={file.type} />
          <div className="ml-3">
            <div className="font-medium">{file.name}</div>
            <div className="text-xs text-muted-foreground md:hidden">
              {formatDate(file.createdAt)} - {formatFileSize(file.size)}
            </div>
            {file.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {file.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs bg-white/50 border-white/20">
                    {tag}
                  </Badge>
                ))}
                {file.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs bg-white/50 border-white/20">
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
            <div className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse-secure" />
          )}
          {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
        </Badge>
      </td>
      <td className="py-3 px-4 text-right space-x-1">
        <Button variant="ghost" size="icon" title="Download" className="hover:bg-white/50">
          <Download className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          title={file.isStarred ? "Unstar" : "Star"}
          className="hover:bg-white/50"
        >
          <Star className={`h-4 w-4 ${file.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" title="Delete" className="hover:bg-white/50">
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="glass">
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
  );
};

export default FileTableRow;
