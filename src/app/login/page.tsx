'use client'

import { useEffect, useState } from 'react'
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
  }, [])

  return (
    // <div>
    //   <h1>Login</h1>
    //   <form onSubmit={handleLogin}>
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <button type="submit" disabled={loading}>
    //       {loading ? 'Logging in...' : 'Login'}
    //     </button>
    //   </form>
    //   {error && <p style={{ color: 'red' }}>{error}</p>}
    // </div>
    <Login/>
  )
}

export default LoginPage
