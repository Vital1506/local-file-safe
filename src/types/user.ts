
export type UserStatus = 'active' | 'inactive';
export type UserRole = 'admin' | 'user';

export interface UserData {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  lastLogin: Date;
  totalFiles: number;
  totalStorage: number;
  status: UserStatus;
}
