
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { uploadFile } from '@/services/fileService';
import { validatePassword, passwordStrength } from '@/services/encryptionService';
import { Upload, Lock, FileText, AlertTriangle, CheckCircle } from 'lucide-react';

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [encryptionPassword, setEncryptionPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Password strength
  const strength = passwordStrength(encryptionPassword);
  
  // Validate password on change
  const handlePasswordChange = (value: string) => {
    setEncryptionPassword(value);
    const result = validatePassword(value);
    setPasswordValid(result.valid);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }
    
    if (!encryptionPassword) {
      toast.error('Please enter an encryption password');
      return;
    }
    
    const validation = validatePassword(encryptionPassword);
    if (!validation.valid) {
      toast.error(validation.message);
      return;
    }
    
    if (encryptionPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setUploading(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);
    
    try {
      await uploadFile(file, user?.id || '', encryptionPassword);
      
      // Set progress to 100% when complete
      setProgress(100);
      
      // Reset form after successful upload
      setFile(null);
      setEncryptionPassword('');
      setConfirmPassword('');
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Navigate back to the file list
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
    } catch (error) {
      console.error('Error uploading file:', error);
      // Error is handled in the fileService
    } finally {
      clearInterval(interval);
      setTimeout(() => setUploading(false), 1000);
    }
  };
  
  // Get strength color
  const getStrengthColor = () => {
    if (strength < 30) return 'bg-destructive';
    if (strength < 60) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Upload className="mr-2 h-5 w-5" />
          Upload and Encrypt File
        </CardTitle>
        <CardDescription>
          Upload your file to be securely encrypted and stored
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleUpload}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="file">Select File</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-secondary/50 transition-colors" onClick={() => fileInputRef.current?.click()}>
              <input
                id="file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              {file ? (
                <div className="flex flex-col items-center">
                  <FileText className="h-10 w-10 mb-2 text-primary" />
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {file.size < 1024 
                      ? `${file.size} bytes` 
                      : file.size < 1048576 
                        ? `${(file.size / 1024).toFixed(2)} KB` 
                        : `${(file.size / 1048576).toFixed(2)} MB`}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="h-10 w-10 mb-2 text-muted-foreground" />
                  <p className="font-medium">Drop your file here or click to browse</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Supports all file types
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center">
                <Lock className="mr-2 h-4 w-4" />
                Encryption Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter a strong password"
                className="secure-input"
                value={encryptionPassword}
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
              {encryptionPassword && (
                <div className="mt-2 space-y-1">
                  <Progress value={strength} className={getStrengthColor()} />
                  <div className="flex justify-between text-xs">
                    <span className={strength < 30 ? 'text-destructive' : 'text-muted-foreground'}>Weak</span>
                    <span className={strength >= 30 && strength < 60 ? 'text-warning' : 'text-muted-foreground'}>Medium</span>
                    <span className={strength >= 60 ? 'text-success' : 'text-muted-foreground'}>Strong</span>
                  </div>
                </div>
              )}
              {encryptionPassword && !passwordValid && (
                <p className="text-xs text-destructive flex items-center mt-1">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Password must include uppercase, lowercase, numbers, and special characters
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="secure-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {encryptionPassword && confirmPassword && (
                <p className={`text-xs flex items-center mt-1 ${
                  encryptionPassword === confirmPassword ? 'text-success' : 'text-destructive'
                }`}>
                  {encryptionPassword === confirmPassword ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Passwords match
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Passwords do not match
                    </>
                  )}
                </p>
              )}
            </div>
          </div>
          
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading and encrypting...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto" 
            onClick={() => navigate('/dashboard')}
            type="button"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="w-full sm:w-auto"
            disabled={uploading || !file || !encryptionPassword || !passwordValid || encryptionPassword !== confirmPassword}
          >
            {uploading ? 'Processing...' : 'Upload & Encrypt'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FileUpload;
