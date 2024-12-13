import { NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    // Kalau nggak ada session, redirect ke login
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Kalau ada session, lanjut ke halaman yang diminta
  return res
}

// Matcher buat middleware (hanya untuk dashboard)
export const config = {
  matcher: ['/dashboard/:path*'],
}
