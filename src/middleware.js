import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const path = request.nextUrl.pathname
    const isPublic = path.startsWith('/login') || path.startsWith('/signup') || path.startsWith('/verifyEmail')
    const token = request.cookies.get("token")?.value || ""
    if(isPublic && token){
        return NextResponse.redirect(new URL(`/`, request.url))
    }else if(!isPublic && !token){
        return NextResponse.redirect(new URL('/login', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login', '/signup', '/verifyEmail', '/profile']
}