
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import { Shield } from 'lucide-react';

const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md mx-auto mb-6 text-center">
        <div className="flex items-center justify-center">
          <Shield className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold ml-2">SFMS</h1>
        </div>
        <p className="text-muted-foreground mt-2">
          Secure File Management System
        </p>
      </div>
      <LoginForm />
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Protected with end-to-end encryption
      </p>
    </div>
  );
};

export default Login;
