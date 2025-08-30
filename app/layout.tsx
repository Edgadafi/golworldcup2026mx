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
        url: '/pase-a-gol-assets/images/og-1200x630.png',
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
    images: ['/pase-a-gol-assets/images/og-1200x630.png'],
  },
  manifest: '/manifest.json',
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
        <link rel="icon" type="image/png" sizes="192x192" href="/pase-a-gol-assets/icons/icon-192.png" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}