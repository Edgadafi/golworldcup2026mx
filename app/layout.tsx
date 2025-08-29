import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@coinbase/onchainkit/styles.css'
import Providers from './providers'
import { FarcasterInitializer } from './components/FarcasterInitializer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pa$e A Gol CDMX - Mundial 2026 Ready',
  description: 'Transforma cómo compartes dinero en CDMX. Conecta con tu comunidad, envía al instante y descubre el poder de una red financiera descentralizada.',
  keywords: ['finanzas', 'pagos', 'CDMX', 'social', 'comunidad', 'Mundial 2026', 'Farcaster'],
  authors: [{ name: 'FlashSend CDMX' }],
  creator: 'FlashSend CDMX',
  publisher: 'FlashSend CDMX',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://flashsend-cdmx.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Pa$e A Gol CDMX - Mundial 2026 Ready',
    description: 'Transforma cómo compartes dinero en CDMX. Conecta con tu comunidad, envía al instante y descubre el poder de una red financiera descentralizada.',
    url: 'https://flashsend-cdmx.vercel.app',
    siteName: 'Pa$e A Gol CDMX',
    images: [
      {
        url: '/Pa$e%20a%20Gol-assets/images/preview-1200x630.png.png',
        width: 1200,
        height: 630,
        alt: 'Pa$e A Gol CDMX - Mundial 2026 Ready',
      },
      {
        url: '/Pa$e%20a%20Gol-assets/images/hero-1200x630.png.png',
        width: 1200,
        height: 630,
        alt: 'Pa$e A Gol CDMX Hero Image',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pa$e A Gol CDMX - Mundial 2026 Ready',
    description: 'Transforma cómo compartes dinero en CDMX. Conecta con tu comunidad, envía al instante y descubre el poder de una red financiera descentralizada.',
    images: ['/Pa$e%20a%20Gol-assets/images/preview-1200x630.png.png'],
    creator: '@flashsend_cdmx',
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://flashsend-cdmx.vercel.app/Pa$e%20a%20Gol-assets/images/preview-1200x630.png.png',
    'fc:frame:button:1': '⚽ ¡Pa$e a Gol!',
    'fc:frame:button:2': '🎯 Ver Estadísticas',
    'fc:frame:button:3': '🏆 Mundial 2026',
    'fc:frame:button:4': '💰 Conectar Wallet',
    'fc:frame:post_url': 'https://flashsend-cdmx.vercel.app',
    'fc:frame:input:text': 'Monto a transferir (MXN)',
    'fc:frame:state': 'pase-a-gol-cdmx-v1',
    'fc:frame:aspect_ratio': '1.91:1',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#0F172A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Pa$e A Gol CDMX" />
        <link rel="apple-touch-icon" href="/Pa$e%20a%20Gol-assets/icons/icon-1024.png.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/Pa$e%20a%20Gol-assets/icons/icon-1024.png.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/Pa$e%20a%20Gol-assets/icons/icon-1024.png.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <Providers>
          <FarcasterInitializer>
            {children}
          </FarcasterInitializer>
        </Providers>
      </body>
    </html>
  )
}
