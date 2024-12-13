import { NextResponse } from 'next/server'
import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Buat Supabase client dari middleware
  const supabase = createMiddlewareSupabaseClient({ req, res })

  // Cek session user
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Kalau nggak ada session, redirect ke halaman login
  if (!session) {
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  return res
}

// Konfigurasi middleware untuk route dashboard
export const config = {
  matcher: '/dashboard/:path*',
}
