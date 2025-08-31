import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const accept = request.headers.get('accept') || '';
  const url = request.nextUrl.pathname;
  
  // Detectar Farcaster y otros bots más efectivamente
  const isFarcaster = 
    userAgent.includes('Farcaster') || 
    userAgent.includes('farcaster') ||
    userAgent.includes('bot') ||
    userAgent.includes('crawler') ||
    userAgent.includes('spider') ||
    userAgent.includes('facebookexternalhit') ||
    userAgent.includes('Twitterbot') ||
    userAgent.includes('LinkedInBot') ||
    userAgent.includes('WhatsApp') ||
    userAgent.includes('TelegramBot') ||
    userAgent.includes('Discordbot') ||
    userAgent.includes('Slackbot') ||
    userAgent.includes('Mozilla/5.0 (compatible; Googlebot') ||
    userAgent.includes('Mozilla/5.0 (compatible; Bingbot') ||
    userAgent.includes('Mozilla/5.0 (compatible; YandexBot') ||
    userAgent.includes('Mozilla/5.0 (compatible; DuckDuckBot') ||
    userAgent.includes('Mozilla/5.0 (compatible; Baiduspider') ||
    userAgent.includes('Mozilla/5.0 (compatible; AhrefsBot') ||
    userAgent.includes('Mozilla/5.0 (compatible; SemrushBot') ||
    userAgent.includes('Mozilla/5.0 (compatible; MJ12bot') ||
    userAgent.includes('Mozilla/5.0 (compatible; DotBot') ||
    userAgent.includes('Mozilla/5.0 (compatible; BLEXBot') ||
    userAgent.includes('Mozilla/5.0 (compatible; SemrushBot') ||
    userAgent.includes('Mozilla/5.0 (compatible; rogerbot') ||
    userAgent.includes('Mozilla/5.0 (compatible; Exabot') ||
    userAgent.includes('Mozilla/5.0 (compatible; sistrix') ||
    userAgent.includes('Mozilla/5.0 (compatible; Nutch') ||
    userAgent.includes('Mozilla/5.0 (compatible; Scrapy') ||
    userAgent.includes('Mozilla/5.0 (compatible; Python-requests') ||
    userAgent.includes('Mozilla/5.0 (compatible; curl') ||
    userAgent.includes('Mozilla/5.0 (compatible; Wget') ||
    userAgent.includes('Mozilla/5.0 (compatible; HTTPie') ||
    userAgent.includes('Mozilla/5.0 (compatible; PostmanRuntime') ||
    userAgent.includes('Mozilla/5.0 (compatible; Insomnia') ||
    userAgent.includes('Mozilla/5.0 (compatible; Thunder Client') ||
    userAgent.includes('Mozilla/5.0 (compatible; REST Client') ||
    userAgent.includes('Mozilla/5.0 (compatible; HTTPie') ||
    userAgent.includes('Mozilla/5.0 (compatible; curl') ||
    userAgent.includes('Mozilla/5.0 (compatible; Wget') ||
    userAgent.includes('Mozilla/5.0 (compatible; Python-requests') ||
    userAgent.includes('Mozilla/5.0 (compatible; Scrapy') ||
    userAgent.includes('Mozilla/5.0 (compatible; Nutch') ||
    userAgent.includes('Mozilla/5.0 (compatible; Exabot') ||
    userAgent.includes('Mozilla/5.0 (compatible; sistrix') ||
    userAgent.includes('Mozilla/5.0 (compatible; rogerbot') ||
    userAgent.includes('Mozilla/5.0 (compatible; SemrushBot') ||
    userAgent.includes('Mozilla/5.0 (compatible; BLEXBot') ||
    userAgent.includes('Mozilla/5.0 (compatible; DotBot') ||
    userAgent.includes('Mozilla/5.0 (compatible; MJ12bot') ||
    userAgent.includes('Mozilla/5.0 (compatible; SemrushBot') ||
    userAgent.includes('Mozilla/5.0 (compatible; AhrefsBot') ||
    userAgent.includes('Mozilla/5.0 (compatible; Baiduspider') ||
    userAgent.includes('Mozilla/5.0 (compatible; DuckDuckBot') ||
    userAgent.includes('Mozilla/5.0 (compatible; YandexBot') ||
    userAgent.includes('Mozilla/5.0 (compatible; Bingbot') ||
    userAgent.includes('Mozilla/5.0 (compatible; Googlebot') ||
    userAgent.includes('Slackbot') ||
    userAgent.includes('Discordbot') ||
    userAgent.includes('TelegramBot') ||
    userAgent.includes('WhatsApp') ||
    userAgent.includes('LinkedInBot') ||
    userAgent.includes('Twitterbot') ||
    userAgent.includes('facebookexternalhit') ||
    userAgent.includes('spider') ||
    userAgent.includes('crawler') ||
    userAgent.includes('bot') ||
    userAgent.includes('farcaster') ||
    userAgent.includes('Farcaster');
  
  // Si es Farcaster o un bot, servir el HTML estático
  if (isFarcaster) {
    console.log('🤖 Bot detectado:', userAgent);
    console.log('📄 Sirviendo frame.html para:', url);
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
     * - frame.html (frame file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.well-known|frame.html).*)',
  ],
};
