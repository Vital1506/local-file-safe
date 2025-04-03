
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  FileItem,
  downloadFile
} from '@/services/fileService';
import { 
  Download, 
  FileText, 
  Calendar, 
  Clock, 
  User, 
  Shield, 
  Key, 
  Save, 
  LockKeyhole,
  History 
} from 'lucide-react';

interface FileDetailsProps {
  file: FileItem;
}

const FileDetails = ({ file }: FileDetailsProps) => {
  const [decryptionPassword, setDecryptionPassword] = useState('');
  const [downloading, setDownloading] = useState(false);
  
  const handleDownload = async () => {
    if (!decryptionPassword) {
      return;
    }
    
    setDownloading(true);
    
    try {
      await downloadFile(file.id, decryptionPassword);
      setDecryptionPassword('');
    } catch (error) {
      console.error('Error downloading file:', error);
    } finally {
      setDownloading(false);
    }
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Format time for display
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl flex items-center">
                <FileText className="mr-2 h-6 w-6" strokeWidth={1.5} />
                {file.name}
              </CardTitle>
              <CardDescription className="mt-1">
                {formatFileSize(file.size)} • Uploaded on {formatDate(file.createdAt)}
              </CardDescription>
            </div>
            <Badge variant={file.status === 'encrypted' ? 'default' : 'destructive'}>
              {file.status === 'encrypted' && (
                <div className="h-2 w-2 rounded-full bg-green-500 mr-1.5 animate-pulse" />
              )}
              {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        
        <Separator />
        
        <CardContent className="pt-6">
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="history">Version History</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Date Added</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(file.createdAt)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Last Modified</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(file.updatedAt)} at {formatTime(file.updatedAt)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <User className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Owner</p>
                      <p className="text-sm text-muted-foreground">
                        user-{file.ownerId}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Access Control</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <Badge variant="outline" className="text-xs">
                          Owner: Full Access
                        </Badge>
                        {file.sharedWith.length > 0 ? (
                          file.sharedWith.map((userId) => (
                            <Badge key={userId} variant="outline" className="text-xs">
                              user-{userId}: Read Access
                            </Badge>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Not shared with anyone
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Key className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Tags</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {file.tags.length > 0 ? (
                          file.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No tags
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4">
              <div className="space-y-6">
                <div className="flex items-start">
                  <History className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Version History</p>
                    <p className="text-sm text-muted-foreground">
                      This file has {file.versions.length} version{file.versions.length !== 1 ? 's' : ''}.
                    </p>
                  </div>
                </div>
                
                {file.versions.map((version, index) => (
                  <div 
                    key={version.versionId}
                    className="flex items-center justify-between p-3 border rounded-md"
                  >
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="text-sm font-medium">
                          Version {file.versions.length - index}
                          {index === 0 && " (Current)"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(version.createdAt)} • {formatFileSize(version.size)}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center text-sm mb-2">
                  <LockKeyhole className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium">Encryption Status</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  This file is {file.status === 'encrypted' ? 'encrypted' : 'not encrypted'} and secured with AES-256 encryption.
                </p>
              </div>
              
              <div className="space-y-2 mt-4">
                <Label htmlFor="password">Decryption Password</Label>
                <div className="flex space-x-2">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter the file's decryption password"
                    className="flex-1 secure-input"
                    value={decryptionPassword}
                    onChange={(e) => setDecryptionPassword(e.target.value)}
                  />
                  <Button 
                    onClick={handleDownload} 
                    disabled={!decryptionPassword || downloading}
                  >
                    {downloading ? 'Decrypting...' : 'Decrypt & Download'}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileDetails;
