"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import supabase from "@/supabse/config";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    async function fetchProfile() {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Profile</CardTitle>
          <CardDescription>Your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">First Name</h3>
              <p className="text-lg">{profile?.first_name || "Not set"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Last Name</h3>
              <p className="text-lg">{profile?.last_name || "Not set"}</p>
            </div>
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
              <p className="text-lg">{profile?.email || "Not set"}</p>
            </div>
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-sm font-medium text-muted-foreground">Member Since</h3>
              <p className="text-lg">
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString()
                  : "Not available"}
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard")}
            >
              Back to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}