
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { toast } from 'sonner';
import { UserData, UserStatus } from '@/types/user';
import { MOCK_USERS } from '@/data/mockUsers';
import UserSearch from './UserSearch';
import UserTable from './UserTable';

const UserList = () => {
  const [users, setUsers] = useState<UserData[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleToggleStatus = (userId: string) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedUsers = users.map(user => 
        user.id === userId 
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' as UserStatus } 
          : user
      );
      
      setUsers(updatedUsers);
      
      const user = users.find(u => u.id === userId);
      const newStatus = user?.status === 'active' ? 'deactivated' : 'activated';
      
      toast.success(`User ${user?.username} has been ${newStatus}`);
      setLoading(false);
    }, 500);
  };
  
  const filteredUsers = users.filter(user => {
    if (!searchTerm) return true;
    
    const search = searchTerm.toLowerCase();
    return (
      user.username.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.role.toLowerCase().includes(search)
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground">View and manage system users</p>
        </div>
        <Button>
          <User className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      
      <UserSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">System Users</CardTitle>
          <CardDescription>
            Total of {filteredUsers.length} users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserTable 
            users={filteredUsers} 
            onToggleStatus={handleToggleStatus} 
            loading={loading} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserList;
