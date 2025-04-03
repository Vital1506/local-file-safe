
import { FileItem } from '@/services/fileService';
import { Card, CardContent } from '@/components/ui/card';
import FileCard from './FileCard';

interface FileGridViewProps {
  files: FileItem[];
  fileType: string;
}

const FileGridView = ({ files, fileType }: FileGridViewProps) => {
  // Filter files based on file type
  const filteredFiles = files.filter(file => {
    if (fileType === 'documents') {
      return file.type.includes('pdf') || 
             file.type.includes('document') || 
             file.type.includes('word');
    }
    if (fileType === 'images') {
      return file.type.includes('image');
    }
    if (fileType === 'other') {
      return !file.type.includes('pdf') && 
             !file.type.includes('document') && 
             !file.type.includes('word') &&
             !file.type.includes('image');
    }
    return true;
  });

  if (filteredFiles.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No {fileType} files found.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFiles.map(file => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileGridView;
