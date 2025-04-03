
import { FileItem } from '@/services/fileService';
import { Card, CardContent } from '@/components/ui/card';
import FileTableRow from './FileTableRow';
import { ChevronDown, ChevronUp } from 'lucide-react';

type SortField = 'name' | 'createdAt' | 'size';
type SortDirection = 'asc' | 'desc';

interface FileTableProps {
  files: FileItem[];
  userId: string;
  isAdmin: boolean;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onFileDeleted: () => void;
  loading: boolean;
}

const FileTable = ({ 
  files, 
  userId, 
  isAdmin, 
  sortField, 
  sortDirection, 
  onSort, 
  onFileDeleted,
  loading
}: FileTableProps) => {
  
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (files.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="text-left py-3 px-4">
                  <button
                    className="flex items-center font-medium text-sm"
                    onClick={() => onSort('name')}
                  >
                    Name {getSortIcon('name')}
                  </button>
                </th>
                <th className="text-left py-3 px-4 hidden md:table-cell">
                  <button
                    className="flex items-center font-medium text-sm"
                    onClick={() => onSort('createdAt')}
                  >
                    Date Added {getSortIcon('createdAt')}
                  </button>
                </th>
                <th className="text-left py-3 px-4 hidden md:table-cell">
                  <button
                    className="flex items-center font-medium text-sm"
                    onClick={() => onSort('size')}
                  >
                    Size {getSortIcon('size')}
                  </button>
                </th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-right py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <FileTableRow 
                  key={file.id} 
                  file={file} 
                  userId={userId} 
                  isAdmin={isAdmin} 
                  onFileDeleted={onFileDeleted}
                />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileTable;
