
import { Badge } from '@/components/ui/badge';
import { UserStatus } from '@/types/user';

interface UserStatusBadgeProps {
  status: UserStatus;
}

const UserStatusBadge = ({ status }: UserStatusBadgeProps) => {
  return (
    <Badge variant={status === 'active' ? 'success' : 'secondary'}>
      {status === 'active' ? (
        <div className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse" />
      ) : null}
      {status}
    </Badge>
  );
};

export default UserStatusBadge;
