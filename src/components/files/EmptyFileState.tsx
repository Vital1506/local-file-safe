
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { File as FileIcon } from 'lucide-react';

const EmptyFileState = () => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default EmptyFileState;
