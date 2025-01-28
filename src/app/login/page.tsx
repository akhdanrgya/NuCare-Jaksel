'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/libs/supabaseClient'
import { useRouter } from 'next/navigation'
import Login from '@/components/Login'

const LoginPage = () => {

  return (
    <Login />
  )
}

export default LoginPage
