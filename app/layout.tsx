import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pa$e A Gol CDMX - Transforma cómo compartes dinero',
  description: 'Transforma cómo compartes dinero en CDMX. Conecta con tu comunidad, envía al instante y descubre el poder de una red financiera descentralizada.',
  metadataBase: new URL('https://flashsend-cdmx.vercel.app'),
  openGraph: {
    title: 'Pa$e A Gol CDMX - Transforma cómo compartes dinero',
    description: 'Transforma cómo compartes dinero en CDMX. Conecta con tu comunidad, envía al instante y descubre el poder de una red financiera descentralizada.',
    url: 'https://flashsend-cdmx.vercel.app',
    siteName: 'Pa$e A Gol CDMX',
    images: [
      {
        url: '/PaseaGol-assets/images/og-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Pa$e A Gol CDMX',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pa$e A Gol CDMX - Transforma cómo compartes dinero',
    description: 'Transforma cómo compartes dinero en CDMX. Conecta con tu comunidad, envía al instante y descubre el poder de una red financiera descentralizada.',
    images: ['/PaseaGol-assets/images/og-1200x630.png'],
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
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
