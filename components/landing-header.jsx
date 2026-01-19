"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function LandingHeader() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl">ResumeCraft</span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </Link>
          <Link href="/features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ModeToggle />
          {isAuthenticated ? (
            <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
          ) : (
            <>
              <Button variant="ghost" onClick={() => router.push("/login")}>
                Login
              </Button>
              <Button onClick={() => router.push("/signup")}>Sign Up</Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
