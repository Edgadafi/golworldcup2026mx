import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FlashSend CDMX - Envía pagos rápidos y seguros',
  description: 'Envía pagos rápidos y seguros',
  metadataBase: new URL('https://flashsend-cdmx.vercel.app'),
  openGraph: {
    title: 'FlashSend CDMX',
    description: 'Envía pagos rápidos y seguros',
    url: 'https://flashsend-cdmx.vercel.app',
    siteName: 'FlashSend CDMX',
    images: [
      {
        url: '/preview-image.png',
        width: 1200,
        height: 630,
        alt: 'FlashSend CDMX - Envía pagos rápidos y seguros',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlashSend CDMX',
    description: 'Envía pagos rápidos y seguros',
    images: ['/preview-image.png'],
  },
  manifest: '/manifest.json',
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://flashsend-cdmx.vercel.app/PaseaGol-assets/images/hero-1200x630.png',
    'fc:frame:button:1': '🎯 Pa$e Rápido',
    'fc:frame:button:2': '👥 Pa$e Grupal',
    'fc:frame:button:3': '📊 Mercado',
    'fc:frame:button:4': '🏠 Inicio',
    'fc:frame:post_url': 'https://flashsend-cdmx.vercel.app/api/frame',
    'fc:frame:aspect_ratio': '1.91:1',
    // Farcaster Mini App meta tag
    'fc:miniapp': '{"version":"1","image":"https://flashsend-cdmx.vercel.app/preview-image.png","button":{"text":"Abrir FlashSend"}}',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0F172A" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" sizes="192x192" href="/PaseaGol-assets/icons/icon-192.png" />
        
        {/* Farcaster Frame Meta Tags */}
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="https://flashsend-cdmx.vercel.app/PaseaGol-assets/images/hero-1200x630.png" />
        <meta name="fc:frame:button:1" content="🎯 Pa$e Rápido" />
        <meta name="fc:frame:button:2" content="👥 Pa$e Grupal" />
        <meta name="fc:frame:button:3" content="📊 Mercado" />
        <meta name="fc:frame:button:4" content="🏠 Inicio" />
        <meta name="fc:frame:post_url" content="https://flashsend-cdmx.vercel.app/api/frame" />
        <meta name="fc:frame:aspect_ratio" content="1.91:1" />
        
        {/* Farcaster Mini App Meta Tags */}
        <meta property="fc:miniapp" content='{"version":"1","image":"https://flashsend-cdmx.vercel.app/preview-image.png","button":{"text":"Abrir FlashSend"}}' />
        
        {/* Open Graph Meta Tags adicionales para Mini App */}
        <meta property="og:title" content="FlashSend CDMX" />
        <meta property="og:description" content="Envía pagos rápidos y seguros" />
        <meta property="og:image" content="https://flashsend-cdmx.vercel.app/preview-image.png" />
        <meta property="og:url" content="https://flashsend-cdmx.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="FlashSend CDMX" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
