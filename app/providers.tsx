'use client';

import { PropsWithChildren, useState, useEffect } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'viem/chains';
import { wagmiConfig } from '../lib/wagmi';

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular un pequeño delay para mostrar el loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Mostrar loading mientras se inicializa
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md text-center">
          <div className="text-blue-600">
            <div className="w-16 h-16 mx-auto mb-4">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
            </div>
            <h2 className="text-2xl font-bold mb-2">🚀 Inicializando</h2>
            <p className="text-gray-600">Preparando Pa$e a Gol...</p>
          </div>
        </div>
      </div>
    );
  }

  // Usar API key por defecto en producción si no hay una configurada
  const apiKey = process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || 'dCYkTdedsxBb9dGjUgAjtU47LEftQrfp';
  
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={apiKey}
          chain={base}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}





