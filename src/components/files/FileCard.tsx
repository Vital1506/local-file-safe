
import { useNavigate } from 'react-router-dom';
import { FileItem } from '@/services/fileService';
import FileIconComponent from './FileIcon';
import { formatDate, formatFileSize } from '@/utils/fileUtils';

interface FileCardProps {
  file: FileItem;
}

const FileCard = ({ file }: FileCardProps) => {
  const navigate = useNavigate();
  
  return (
    <div 
      key={file.id}
      className="file-card group cursor-pointer"
      onClick={() => navigate(`/dashboard/file/${file.id}`)}
    >
      <div className="flex justify-center mb-4">
        <FileIconComponent fileType={file.type} />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-center truncate">{file.name}</h3>
        <p className="text-xs text-center text-muted-foreground">
          {formatDate(file.createdAt)} • {formatFileSize(file.size)}
        </p>
      </div>
    </div>
  );
};

export default FileCard;
