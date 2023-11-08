import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
// import type { Database } from '@/lib/database.types'

export async function GET(request: NextRequest) {
  // console.log('!!! resetting password')
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    await supabase.auth.exchangeCodeForSession(code)
    return NextResponse.redirect(new URL('/account', request.url))
  }
  return NextResponse.redirect(new URL('/', request.url))
  // URL to redirect to after sign in process completes
  
}