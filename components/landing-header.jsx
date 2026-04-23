"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

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

  const NavLinks = ({ className }) => (
    <>
      <Link href="/" className={`text-sm font-medium hover:text-blue-600 transition-colors ${className}`}>
        Home
      </Link>
      <Link href="/create-resume" className={`text-sm font-medium hover:text-blue-600 transition-colors ${className}`}>
        Create Resume
      </Link>
      <Link href="/scan-resume" className={`text-sm font-medium hover:text-blue-600 transition-colors ${className}`}>
        ATS Scan
      </Link>
      <Link href="#features" className={`text-sm font-medium hover:text-blue-600 transition-colors ${className}`}>
        Features
      </Link>
      <Link href="#testimonials" className={`text-sm font-medium hover:text-blue-600 transition-colors ${className}`}>
        Testimonials
      </Link>
    </>
  )

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b border-transparent ${
        isScrolled 
          ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm border-gray-200 dark:border-gray-800" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2 group">
           <div className="w-8 h-8 flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
             <img src="Logo-2.png" alt="logo" className="w-22 h-22 rounded-full" /> 
           </div>
          <span className="font-bold text-xl tracking-tight">ResumeCraft</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
          
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                   <Menu className="h-5 w-5" />
                   <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 mt-8">
                   <Link href="/" className="flex items-center space-x-2 mb-4">
                      <span className="font-bold text-xl">ResumeCraft</span>
                   </Link>
                   <NavLinks className="text-lg py-2 border-b dark:border-gray-800" />
                   <div className="flex flex-col gap-3 mt-4">
                      <Button variant="outline" onClick={() => router.push("/mock-test")} className="w-full">
                        AI Mock Test
                      </Button>
                      <Button onClick={() => router.push("/create-resume")} className="w-full bg-blue-600 hover:bg-blue-700">
                        Build Resume
                      </Button>
                   </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden md:flex gap-3">
            <Button variant="ghost" onClick={() => router.push("/mock-test")} className="hover:bg-gray-100 dark:hover:bg-gray-800">
              Mock Test
            </Button>
            <Button onClick={() => router.push("/create-resume")} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all">
              Build Resume
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
