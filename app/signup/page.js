"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";


export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    const nameRegex = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

    if (!formData.name.trim() || !nameRegex.test(formData.name.trim())) {
      toast({
        title: "Error",
        description:
          "Please enter a valid name (only letters and spaces allowed)",
        variant: "destructive",
      });
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }

    if (!passwordRegex.test(formData.password)) {
      toast({
        title: "Error",
        description:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
        variant: "destructive",
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const { signup } = useAuth();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;
  
      setIsLoading(true);
  
      try {
        await signup(formData.email, formData.password, {
          first_name: formData.name.split(/\s+/)[0],
          last_name: formData.name.split(/\s+/).slice(1).join(' ') || '',
          email: formData.email
        });

        toast({
          title: "Success!",
          description: "Your account has been created successfully.",
        });

        // Clear form
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        });

        router.push("/dashboard"); // Redirect to dashboard directly as mock auth auto-logs in
      } catch (error) {
        console.error("Signup failed:", error);
        toast({
          title: "Error",
          description: error.message || "Signup failed. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className="relative z-10 w-full max-w-md p-4">
      <Card className="w-full backdrop-blur-sm bg-card/80">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Create an Account
          </CardTitle>
          <CardDescription className="text-center">
            Join ResumeCraft to build your perfect resume
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="transition-colors focus:ring-2"
                placeholder="John Doe"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="transition-colors focus:ring-2"
                placeholder="john@example.com"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="transition-colors focus:ring-2"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters with uppercase, lowercase, and
                number
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="transition-colors focus:ring-2"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="w-full transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              Login
            </Link>
          </p>
          <p className="text-xs text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
