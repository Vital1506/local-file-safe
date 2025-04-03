
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Lock, FileText, Upload, Download, UserCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 border-b bg-card">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold ml-2">SFMS</h1>
          </div>
          <div className="space-x-2">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button onClick={() => navigate('/register')}>
              Register
            </Button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-12 flex justify-center">
            <Lock className="h-16 w-16 text-primary animate-pulse-secure" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Secure File Management System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Store, manage, and share your files with end-to-end encryption
            for maximum privacy and security.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" onClick={() => navigate('/register')}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
              Login
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-center">End-to-End Encryption</CardTitle>
                <CardDescription className="text-center">
                  Your files are encrypted before storage and only decrypted with your password.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-5 w-5 mr-2 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Shield className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">AES-256 encryption</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 mr-2 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Shield className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">Secure password-based decryption</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 mr-2 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Shield className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">Files are never stored unencrypted</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-center">File Management</CardTitle>
                <CardDescription className="text-center">
                  Easily upload, organize, and manage all your sensitive documents.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-5 w-5 mr-2 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Upload className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">Upload and encrypt any file type</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 mr-2 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Download className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">Securely download and decrypt files</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 mr-2 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileText className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">Version history and file recovery</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserCheck className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-center">Role-Based Access</CardTitle>
                <CardDescription className="text-center">
                  Control who can access your files with granular permissions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-5 w-5 mr-2 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <UserCheck className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">Admin and user role management</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 mr-2 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <UserCheck className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">Share files with specific users</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 mr-2 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <UserCheck className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">Activity logging and auditing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to secure your files?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join today and experience peace of mind knowing your files
            are protected with military-grade encryption.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/register')}
          >
            Create an Account
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-muted">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-primary" />
              <span className="ml-2 font-semibold">SFMS 2025</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Secure File Management System &copy; 2025. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
