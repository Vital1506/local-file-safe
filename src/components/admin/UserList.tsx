
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, User, Search, Shield, Clock, FileText, Settings } from 'lucide-react';
import { toast } from 'sonner';

// Mock user data
const MOCK_USERS = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin' as const,
    createdAt: new Date('2023-01-10'),
    lastLogin: new Date('2023-05-25'),
    totalFiles: 12,
    totalStorage: 25600000, // 25.6 MB
    status: 'active' as const,
  },
  {
    id: '2',
    username: 'user',
    email: 'user@example.com',
    role: 'user' as const,
    createdAt: new Date('2023-02-15'),
    lastLogin: new Date('2023-05-26'),
    totalFiles: 8,
    totalStorage: 12800000, // 12.8 MB
    status: 'active' as const,
  },
  {
    id: '3',
    username: 'alice',
    email: 'alice@example.com',
    role: 'user' as const,
    createdAt: new Date('2023-03-20'),
    lastLogin: new Date('2023-05-20'),
    totalFiles: 5,
    totalStorage: 6400000, // 6.4 MB
    status: 'inactive' as const,
  },
  {
    id: '4',
    username: 'bob',
    email: 'bob@example.com',
    role: 'user' as const,
    createdAt: new Date('2023-04-05'),
    lastLogin: new Date('2023-05-18'),
    totalFiles: 3,
    totalStorage: 3200000, // 3.2 MB
    status: 'active' as const,
  },
];

const UserList = () => {
  const [users, setUsers] = useState(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const handleToggleStatus = (userId: string) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, status: user.status === 'active' ? 'inactive' as const : 'active' as const } 
          : user
      ));
      
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
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">System Users</CardTitle>
          <CardDescription>
            Total of {filteredUsers.length} users
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/30">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{user.username}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                        {user.role === 'admin' ? (
                          <Shield className="h-3 w-3 mr-1" />
                        ) : (
                          <User className="h-3 w-3 mr-1" />
                        )}
                        {user.role}
                      </Badge>
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
                      <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
                        {user.status === 'active' ? (
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse" />
                        ) : null}
                        {user.status}
                      </Badge>
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
                        onClick={() => handleToggleStatus(user.id)}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default UserList;
