
import { toast } from 'sonner';

// Types for our file system
export type FileStatus = 'encrypted' | 'decrypted' | 'processing' | 'error';

export type FileVersion = {
  versionId: string;
  createdAt: Date;
  size: number;
};

export type FileItem = {
  id: string;
  name: string;
  size: number;
  type: string;
  ownerId: string;
  status: FileStatus;
  createdAt: Date;
  updatedAt: Date;
  versions: FileVersion[];
  sharedWith: string[];
  tags: string[];
  isStarred: boolean;
  isDeleted: boolean;
};

// Mock database of files
let MOCK_FILES: FileItem[] = [
  {
    id: '1',
    name: 'confidential-report.pdf',
    size: 1024000,
    type: 'application/pdf',
    ownerId: '1',
    status: 'encrypted',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15'),
    versions: [
      {
        versionId: 'v1',
        createdAt: new Date('2023-01-15'),
        size: 1024000
      }
    ],
    sharedWith: [],
    tags: ['confidential', 'report'],
    isStarred: true,
    isDeleted: false
  },
  {
    id: '2',
    name: 'project-plan.docx',
    size: 512000,
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ownerId: '2',
    status: 'encrypted',
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2023-02-22'),
    versions: [
      {
        versionId: 'v1',
        createdAt: new Date('2023-02-20'),
        size: 500000
      },
      {
        versionId: 'v2',
        createdAt: new Date('2023-02-22'),
        size: 512000
      }
    ],
    sharedWith: ['1'],
    tags: ['project', 'planning'],
    isStarred: false,
    isDeleted: false
  },
  {
    id: '3',
    name: 'financial-data.xlsx',
    size: 789000,
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ownerId: '1',
    status: 'encrypted',
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-03-10'),
    versions: [
      {
        versionId: 'v1',
        createdAt: new Date('2023-03-10'),
        size: 789000
      }
    ],
    sharedWith: [],
    tags: ['financial', 'data'],
    isStarred: true,
    isDeleted: false
  }
];

// Function to get all files for a user
export const getUserFiles = async (userId: string) => {
  // Simulating API request delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Filter files based on ownership or shared access
  return MOCK_FILES.filter(
    file => 
      !file.isDeleted && 
      (file.ownerId === userId || file.sharedWith.includes(userId))
  );
};

// Function to get all files (admin only)
export const getAllFiles = async () => {
  // Simulating API request delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return all non-deleted files
  return MOCK_FILES.filter(file => !file.isDeleted);
};

// Function to upload a file
export const uploadFile = async (
  file: File, 
  userId: string, 
  encryptionPassword: string
) => {
  try {
    // Simulating API request delay and processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create new file object
    const newFile: FileItem = {
      id: `file-${Date.now()}`,
      name: file.name,
      size: file.size,
      type: file.type,
      ownerId: userId,
      status: 'encrypted',
      createdAt: new Date(),
      updatedAt: new Date(),
      versions: [
        {
          versionId: 'v1',
          createdAt: new Date(),
          size: file.size
        }
      ],
      sharedWith: [],
      tags: [],
      isStarred: false,
      isDeleted: false
    };
    
    // Add to mock database
    MOCK_FILES = [...MOCK_FILES, newFile];
    
    toast.success(`File ${file.name} uploaded and encrypted successfully`);
    return newFile;
  } catch (error) {
    console.error('Upload failed:', error);
    toast.error('File upload failed. Please try again.');
    throw error;
  }
};

// Function to download a file
export const downloadFile = async (fileId: string, decryptionPassword: string) => {
  try {
    // Find the file
    const file = MOCK_FILES.find(f => f.id === fileId);
    if (!file) {
      throw new Error('File not found');
    }
    
    // Simulating decryption and download delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success(`File ${file.name} downloaded and decrypted successfully`);
    return file;
  } catch (error) {
    console.error('Download failed:', error);
    toast.error('File download failed. Please try again.');
    throw error;
  }
};

// Function to delete a file
export const deleteFile = async (fileId: string, userId: string, isAdmin: boolean) => {
  try {
    // Find the file
    const fileIndex = MOCK_FILES.findIndex(f => f.id === fileId);
    if (fileIndex === -1) {
      throw new Error('File not found');
    }
    
    const file = MOCK_FILES[fileIndex];
    
    // Check if user has permission to delete
    if (!isAdmin && file.ownerId !== userId) {
      throw new Error('You do not have permission to delete this file');
    }
    
    // Simulating secure deletion delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mark as deleted (in a real system, we might securely overwrite)
    MOCK_FILES = MOCK_FILES.map(f => 
      f.id === fileId ? { ...f, isDeleted: true } : f
    );
    
    toast.success(`File ${file.name} securely deleted`);
    return true;
  } catch (error) {
    console.error('Deletion failed:', error);
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('File deletion failed. Please try again.');
    }
    throw error;
  }
};

// Function to share a file with another user
export const shareFile = async (fileId: string, targetUserId: string, userId: string) => {
  try {
    // Find the file
    const fileIndex = MOCK_FILES.findIndex(f => f.id === fileId);
    if (fileIndex === -1) {
      throw new Error('File not found');
    }
    
    const file = MOCK_FILES[fileIndex];
    
    // Check if user has permission to share
    if (file.ownerId !== userId) {
      throw new Error('You do not have permission to share this file');
    }
    
    // Check if already shared with this user
    if (file.sharedWith.includes(targetUserId)) {
      throw new Error('File already shared with this user');
    }
    
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Update shared users
    MOCK_FILES = MOCK_FILES.map(f => 
      f.id === fileId 
        ? { ...f, sharedWith: [...f.sharedWith, targetUserId] } 
        : f
    );
    
    toast.success(`File shared successfully`);
    return true;
  } catch (error) {
    console.error('Sharing failed:', error);
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('File sharing failed. Please try again.');
    }
    throw error;
  }
};

// Function to update file metadata
export const updateFile = async (
  fileId: string, 
  updates: Partial<Pick<FileItem, 'name' | 'tags' | 'isStarred'>>, 
  userId: string,
  isAdmin: boolean
) => {
  try {
    // Find the file
    const fileIndex = MOCK_FILES.findIndex(f => f.id === fileId);
    if (fileIndex === -1) {
      throw new Error('File not found');
    }
    
    const file = MOCK_FILES[fileIndex];
    
    // Check if user has permission to update
    if (!isAdmin && file.ownerId !== userId) {
      throw new Error('You do not have permission to update this file');
    }
    
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Update file
    MOCK_FILES = MOCK_FILES.map(f => 
      f.id === fileId 
        ? { 
            ...f, 
            ...updates,
            updatedAt: new Date()
          } 
        : f
    );
    
    toast.success(`File updated successfully`);
    return MOCK_FILES.find(f => f.id === fileId)!;
  } catch (error) {
    console.error('Update failed:', error);
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('File update failed. Please try again.');
    }
    throw error;
  }
};
