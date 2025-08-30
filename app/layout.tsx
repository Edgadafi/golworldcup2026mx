import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@coinbase/onchainkit/styles.css';
import Providers from './providers';
import { FarcasterInitializer } from './components/FarcasterInitializer';

const inter = Inter({ subsets: ['latin'] });

const APP_URL = 'https://flashsend-cdmx.vercel.app';

// TODO EL MANEJO DE METADATOS VA AQUÍ
export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: 'Pa$e A Gol CDMX - Mundial 2026 Ready',
  description: 'Transforma cómo compartes dinero en CDMX.',
  
  openGraph: {
    title: 'Pa$e A Gol CDMX - Mundial 2026 Ready',
    description: 'Transforma cómo compartes dinero en CDMX.',
    // RUTA DE IMAGEN CORREGIDA Y SIMPLIFICADA
    images: [`/pase-a-gol-assets/images/preview-1200x630.png`],
  },
  
  // METADATOS DE FARCASTER EN EL LUGAR CORRECTO
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${APP_URL}/pase-a-gol-assets/images/preview-1200x630.png`,
    'fc:frame:button:1': '⚽ ¡Pa$e a Gol!',
    'fc:frame:post_url': `${APP_URL}/api/frame`, // Buena práctica apuntar a una API
  },
};

// EL LAYOUT NO DEBE TENER <head> MANUAL
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <FarcasterInitializer>
            {children}
          </FarcasterInitializer>
        </Providers>
      </body>
    </html>
  );
}