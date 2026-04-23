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
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
             RC
          </div>
          <span className="font-bold text-xl tracking-tight">ResumeCraft</span>
        </Link>
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/create-resume" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Create Resume
          </Link>
          <Link href="/scan-resume" className="text-sm font-medium hover:text-blue-600 transition-colors">
            ATS Scan
          </Link>
          <Link href="/mock-test" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Mock Test
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button 
            onClick={() => router.push("/create-resume")} 
            size="sm"
            className="hidden sm:flex bg-blue-600 hover:bg-blue-700"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}
