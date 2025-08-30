import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pa$e A Gol CDMX - Transforma cómo compartes dinero',
  description: 'Transforma cómo compartes dinero en CDMX. Conecta con tu comunidad, envía al instante y descubre el poder de una red financiera descentralizada.',
  keywords: ['dinero', 'CDMX', 'transferencias', 'comunidad', 'descentralizado', 'Base', 'Ethereum'],
  authors: [{ name: 'Pa$e A Gol CDMX' }],
  creator: 'Pa$e A Gol CDMX',
  publisher: 'Pa$e A Gol CDMX',
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
    type: 'website',
    locale: 'es_MX',
    url: 'https://flashsend-cdmx.vercel.app',
    siteName: 'Pa$e A Gol CDMX',
    title: 'Pa$e A Gol CDMX - Transforma cómo compartes dinero',
    description: 'Transforma cómo compartes dinero en CDMX. Conecta con tu comunidad, envía al instante y descubre el poder de una red financiera descentralizada.',
    images: [
      {
        url: '/pase-a-gol-assets/images/og-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Pa$e A Gol CDMX - Dashboard principal',
      },
      {
        url: '/pase-a-gol-assets/images/hero-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Pa$e A Gol CDMX - Hero image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@paseagolcdmx',
    creator: '@paseagolcdmx',
    title: 'Pa$e A Gol CDMX - Transforma cómo compartes dinero',
    description: 'Transforma cómo compartes dinero en CDMX. Conecta con tu comunidad, envía al instante y descubre el poder de una red financiera descentralizada.',
    images: ['/pase-a-gol-assets/images/og-1200x630.png'],
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
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/pase-a-gol-assets/icons/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/pase-a-gol-assets/icons/icon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/pase-a-gol-assets/icons/icon-180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Pa$e A Gol',
    'application-name': 'Pa$e A Gol CDMX',
    'msapplication-TileColor': '#0F172A',
    'msapplication-config': '/browserconfig.xml',
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#0F172A" />
        <meta name="msapplication-TileColor" content="#0F172A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Pa$e A Gol" />
        <meta name="application-name" content="Pa$e A Gol CDMX" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/pase-a-gol-assets/icons/icon-180.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/pase-a-gol-assets/icons/icon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/pase-a-gol-assets/icons/icon-16.png" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}