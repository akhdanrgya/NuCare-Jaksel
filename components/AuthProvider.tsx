'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../libs/supabaseClient'

type AuthContextType = {
  user: any
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      console.log('Session from getSession:', data)
      setUser(data.session?.user || null)
      setIsLoading(false)
    }

    // Get session on first load
    getSession()

    // Listen for session changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      console.log('Auth state changed:', session)
      setUser(session?.user || null)
      if (!session?.user) {
        router.push('/login')
      }
    })

    // Cleanup listener on unmount
    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [router])

  // While loading, show loading state
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth harus dipakai di dalam AuthProvider')
  return context
}