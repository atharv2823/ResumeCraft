"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardActions } from "@/components/dashboard-actions"
import { RecentResumes } from "@/components/recent-resumes"
import { AnimatedBackground } from "@/components/animated-background"

export default function DashboardPage() {
  const { user, profile, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <div className="relative z-10">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">
            Welcome, {profile?.first_name || user?.email}
          </h1>
          <div className="mb-8 p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-semibold mb-4">
                Profile Information
              </h2>
              <button
                onClick={() => router.push("/profile/edit")}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Edit Profile
              </button>
            </div>
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={`${profile.first_name}'s Profile`}
                    className="w-24 h-24 rounded-full ring-2 ring-primary/20"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-2xl font-semibold text-muted-foreground">
                      {profile?.first_name?.[0]?.toUpperCase() || "?"}
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-3 flex-grow">
                <p className="text-lg font-medium">
                  {profile?.first_name} {profile?.last_name}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium">Email:</span> {profile?.email}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium">Member since:</span>{" "}
                  {profile?.created_at &&
                    new Date(profile.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <DashboardActions />
          <RecentResumes />
        </main>
      </div>
    </div>
  );
}
