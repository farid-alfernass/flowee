import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /apps/* routes (survey app)
  // Public paths within /apps that don't require auth
  const publicPaths = ['/apps/login', '/api/auth']
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path))

  // Not an /apps route — let it through (landing page, static files, etc.)
  if (!pathname.startsWith('/apps')) {
    return NextResponse.next()
  }

  if (isPublicPath) {
    return NextResponse.next()
  }

  // Check for session cookie (Better Auth)
  const sessionToken =
    request.cookies.get('better-auth.session_token')?.value ||
    request.cookies.get('__Secure-better-auth.session_token')?.value

  if (!sessionToken) {
    const loginUrl = new URL('/apps/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, icons, manifest, service worker
     */
    '/((?!_next/static|_next/image|favicon.ico|icons|manifest.json|sw.js|workbox-.*\\.js).*)',
  ],
}
