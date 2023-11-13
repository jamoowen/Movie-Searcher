import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'


export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const {data: {user}} = await supabase.auth.getUser();
  await supabase.auth.getSession();
  // console.log(`fetched session in middleware`)

  if (user && req.nextUrl.pathname === '/signin') {
    console.log("redirecting...")
    return NextResponse.redirect(new URL('/account', req.url))
  }
  if (!user && req.nextUrl.pathname === '/account' ) {
    // console.log('shouldnt be on account page');
    return NextResponse.redirect(new URL('/signin', req.url))
  } 
  if (!user && req.nextUrl.pathname=='/watchlist' ) {
    console.log('shouldnt be on watchlist page');
    return NextResponse.redirect(new URL('/signin?state=up', req.url))
  } 


  return res
}