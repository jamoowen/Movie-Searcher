import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function Middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    const { data: { user }} = await supabase.auth.getUser()

    if (user && req.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/account', req.url))
    }

    if (!user && req.nextUrl.pathname !=='/') {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return res;

    

}
// export Middleware;

export const config = {
    matcher: ['/', '/account']
};

