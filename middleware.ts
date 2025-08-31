import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const isFarcaster = userAgent.includes('Farcaster') || 
                     userAgent.includes('farcaster') ||
                     userAgent.includes('bot') ||
                     userAgent.includes('crawler') ||
                     userAgent.includes('spider');
  
  // Si es Farcaster o un bot, servir el HTML estático
  if (isFarcaster) {
    return NextResponse.rewrite(new URL('/frame.html', request.url));
  }
  
  // Para usuarios normales, continuar con la aplicación normal
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - .well-known (well-known files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.well-known|frame.html).*)',
  ],
};
