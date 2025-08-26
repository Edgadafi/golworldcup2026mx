import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@coinbase/onchainkit/styles.css'
import Providers from './providers'
import { FarcasterInitializer } from './components/FarcasterInitializer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pa$e A Gol CDMX - Mundial 2026 Ready',
  description: 'Envía dinero instantáneamente a cualquier usuario de Farcaster',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
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
  )
}
