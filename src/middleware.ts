import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'


export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const {data: {user}} = await supabase.auth.getUser();

  if (user && req.nextUrl.pathname === '/signin') {
    console.log("redirecting...")
    return NextResponse.redirect(new URL('/account', req.url))
  }
  if (!user && req.nextUrl.pathname === '/account' || !user && req.nextUrl.pathname=='/watchlist') {
    console.log('shouldnt be on account page');
    return NextResponse.redirect(new URL('/', req.url))
  } 



  // console.log(`request: ${req.url}`)
  // console.log(`response: ${res.url}`)
  return res
}