'use client'

import { useAuth } from './AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const RouteGuard: React.FC<{ children: React.ReactNode; isPrivate?: boolean }> = ({ children, isPrivate = false }) => {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isPrivate && !user) {
      router.push('/login')
    }
  }, [isLoading, isPrivate, user, router])

  if (isLoading) return <div>Loading...</div>

  return <>{children}</>
}

export default RouteGuard