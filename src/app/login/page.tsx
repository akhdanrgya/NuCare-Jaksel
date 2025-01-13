'use client'

import { useEffect } from 'react'
import { supabase } from '@/libs/supabaseClient'
import { useRouter } from 'next/navigation'
import Login from '@/components/Login'

const LoginPage = () => {
  const router = useRouter()

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          router.push('/dashboard')
        } else if (event === 'SIGNED_OUT') {
        }
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [router])

  return (
    <Login/>
  )
}

export default LoginPage
