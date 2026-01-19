"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-gray-900 border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span className="font-bold text-2xl">ResumeCraft</span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
            Dashboard
          </Link>
          <Link href="/create-resume" className="text-sm font-medium hover:underline underline-offset-4">
            Create Resume
          </Link>
          <Link href="/scan-resume" className="text-sm font-medium hover:underline underline-offset-4">
            Scan Resume
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-100">
                    {user?.name?.charAt(0) || "U"}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/profile")}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")}>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
