
import { User } from 'lucide-react';
import { UserRole } from '@/types/user';

interface UserAvatarProps {
  username: string;
  email: string;
}

const UserAvatar = ({ username, email }: UserAvatarProps) => {
  return (
    <div className="flex items-center">
      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
        <User className="h-4 w-4 text-primary" />
      </div>
      <div>
        <div className="font-medium">{username}</div>
        <div className="text-xs text-muted-foreground">{email}</div>
      </div>
    </div>
  );
};

export default UserAvatar;
