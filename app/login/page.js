"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";


export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return false;
    }
  
    if (!formData.password.trim()) {
      toast({
        title: "Error",
        description: "Please enter your password",
        variant: "destructive"
      });
      return false;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return false;
    }
  
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Authenticate using Mock Auth from Context
      await login(formData.email, formData.password);

      toast({
        title: "Success!",
        description: "Logged in successfully"
      });
      
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: "Error",
        description: error.message || "Login failed. Please check your credentials.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          data: {
            first_name: '',
            last_name: '',
            avatar_url: ''
          }
        }
      });

      if (error) {
        if (error.status === 400 && error.message.includes('provider is not enabled')) {
          throw new Error('Google sign-in is not properly configured. Please contact support.');
        }
        throw error;
      }
      
      toast({
        title: "Redirecting",
        description: "Please wait while we redirect you to Google.",
      });
    } catch (error) {
      console.error('Error signing in with Google:', error);
      toast({
        title: "Authentication Error",
        description: error.message || "Failed to sign in with Google. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md p-4 mx-auto mt-8">
      <Card className="w-full backdrop-blur-sm bg-background/95">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to ResumeCraft
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Login to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                disabled={isLoading}
                className="w-full"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                disabled={isLoading}
                className="w-full"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
              variant="default"
            >
              {isLoading ? (
                <>
                  <svg
                    className="w-4 h-4 mr-2 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 text-muted-foreground bg-background">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full mt-4 space-x-2"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Sign in with Google</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link 
              href="/signup" 
              className="font-medium text-primary hover:underline"
              tabIndex={0}
            >
              Sign up
            </Link>
          </p>
          <Link 
            href="/forgot-password" 
            className="text-sm text-muted-foreground hover:underline"
            tabIndex={0}
          >
            Forgot your password?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
