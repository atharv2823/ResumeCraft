"use client"

import { createContext, useContext, useState, useEffect } from "react"
// import supabase from "@/supabse/config"

const AuthContext = createContext({
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
})

export function AuthProvider({ children }) {
  // Mock Data
  const mockUser = {
    id: 'mock-user-123',
    email: 'demo@resumecraft.com',
    aud: 'authenticated',
    role: 'authenticated',
  }

  const mockProfile = {
    id: 'mock-user-123',
    first_name: 'Demo',
    last_name: 'User',
    email: 'demo@resumecraft.com',
    avatar_url: null,
    created_at: new Date().toISOString(),
  }

  // Initialize with mock user (bypass auth)
  const [user, setUser] = useState(mockUser)
  const [profile, setProfile] = useState(mockProfile)
  const [isLoading, setIsLoading] = useState(false)

  // NOTE: We are bypassing actual Supabase calls here.

  const login = async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Just refresh the mock state
    setUser(mockUser)
    setProfile(mockProfile)
    return { user: mockUser, profile: mockProfile }
  }

  const signup = async (email, password, userData) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    setUser(mockUser)
    setProfile({ ...mockProfile, ...userData })
    return { user: mockUser, profile: { ...mockProfile, ...userData } }
  }

  const logout = async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    // For now, let's strictly follow "remove all authentication" by potentially NOT actually logging out
    // or allows logging out but simple re-login.
    // However, if the user wants to "move anywhere", maybe we should just never set user to null?
    // But if they explicitly click logout, they might expect to see a login screen.
    setUser(null)
    setProfile(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
