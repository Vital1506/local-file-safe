
import { Clock, FileText, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { UserData } from '@/types/user';
import UserAvatar from './UserAvatar';
import UserRoleBadge from './UserRoleBadge';
import UserStatusBadge from './UserStatusBadge';
import { formatDate, formatFileSize } from '@/utils/formatUtils';

interface UserTableProps {
  users: UserData[];
  onToggleStatus: (userId: string) => void;
  loading: boolean;
}

const UserTable = ({ users, onToggleStatus, loading }: UserTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/40">
            <th className="text-left py-3 px-4">User</th>
            <th className="text-left py-3 px-4">Role</th>
            <th className="text-left py-3 px-4 hidden md:table-cell">Created</th>
            <th className="text-left py-3 px-4 hidden lg:table-cell">Last Login</th>
            <th className="text-left py-3 px-4 hidden lg:table-cell">Files</th>
            <th className="text-left py-3 px-4 hidden md:table-cell">Storage Used</th>
            <th className="text-left py-3 px-4">Status</th>
            <th className="text-right py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-muted/30">
              <td className="py-3 px-4">
                <UserAvatar username={user.username} email={user.email} />
              </td>
              <td className="py-3 px-4">
                <UserRoleBadge role={user.role} />
              </td>
              <td className="py-3 px-4 text-sm hidden md:table-cell">
                {formatDate(user.createdAt)}
              </td>
              <td className="py-3 px-4 text-sm hidden lg:table-cell">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                  {formatDate(user.lastLogin)}
                </div>
              </td>
              <td className="py-3 px-4 text-sm hidden lg:table-cell">
                <div className="flex items-center">
                  <FileText className="h-3 w-3 mr-1 text-muted-foreground" />
                  {user.totalFiles}
                </div>
              </td>
              <td className="py-3 px-4 text-sm hidden md:table-cell">
                {formatFileSize(user.totalStorage)}
              </td>
              <td className="py-3 px-4">
                <UserStatusBadge status={user.status} />
              </td>
              <td className="py-3 px-4 text-right space-x-1">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => toast.info(`Edit user ${user.username}`)}
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button 
                  variant={user.status === 'active' ? 'destructive' : 'default'}
                  size="sm"
                  onClick={() => onToggleStatus(user.id)}
                  disabled={loading}
                >
                  {user.status === 'active' ? 'Deactivate' : 'Activate'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
