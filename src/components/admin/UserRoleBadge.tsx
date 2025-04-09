
import { Shield, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@/types/user';

interface UserRoleBadgeProps {
  role: UserRole;
}

const UserRoleBadge = ({ role }: UserRoleBadgeProps) => {
  return (
    <Badge variant={role === 'admin' ? 'default' : 'secondary'}>
      {role === 'admin' ? (
        <Shield className="h-3 w-3 mr-1" />
      ) : (
        <User className="h-3 w-3 mr-1" />
      )}
      {role}
    </Badge>
  );
};

export default UserRoleBadge;
