
import { UserData } from '@/types/user';

// Mock user data
export const MOCK_USERS: UserData[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: new Date('2023-01-10'),
    lastLogin: new Date('2023-05-25'),
    totalFiles: 12,
    totalStorage: 25600000, // 25.6 MB
    status: 'active',
  },
  {
    id: '2',
    username: 'user',
    email: 'user@example.com',
    role: 'user',
    createdAt: new Date('2023-02-15'),
    lastLogin: new Date('2023-05-26'),
    totalFiles: 8,
    totalStorage: 12800000, // 12.8 MB
    status: 'active',
  },
  {
    id: '3',
    username: 'alice',
    email: 'alice@example.com',
    role: 'user',
    createdAt: new Date('2023-03-20'),
    lastLogin: new Date('2023-05-20'),
    totalFiles: 5,
    totalStorage: 6400000, // 6.4 MB
    status: 'inactive',
  },
  {
    id: '4',
    username: 'bob',
    email: 'bob@example.com',
    role: 'user',
    createdAt: new Date('2023-04-05'),
    lastLogin: new Date('2023-05-18'),
    totalFiles: 3,
    totalStorage: 3200000, // 3.2 MB
    status: 'active',
  },
];
