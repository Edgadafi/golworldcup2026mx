'use client';

import { PropsWithChildren, useState, useEffect } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'viem/chains';
import { wagmiConfig } from '../lib/wagmi';
import { config, validateConfig, type ConfigValidationResult } from '../lib/config';

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  const [configResult, setConfigResult] = useState<ConfigValidationResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Validar configuración al montar el componente
      const result = validateConfig();
      setConfigResult(result);
      
      if (!result.isValid) {
        console.error('🚨 Configuración inválida detectada');
      }
    } catch (error) {
      console.error('❌ Error al validar la configuración:', error);
      setConfigResult({
        isValid: false,
        errors: [`Error interno: ${error instanceof Error ? error.message : 'Error desconocido'}`],
        warnings: [],
        details: {
          onchainKit: false,
          walletConnect: false,
          chain: false,
          app: false,
        }
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Mostrar loading mientras se valida
  if (isLoading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
          <div className="text-blue-600 text-center">
            <h2 className="text-xl font-bold mb-4">🔄 Validando Configuración</h2>
            <p className="mb-4">
              Verificando variables de entorno...
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar error si la configuración no es válida
  if (!configResult?.isValid) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
          <div className="text-red-600 text-center">
            <h2 className="text-xl font-bold mb-4">⚠️ Configuración Requerida</h2>
            <p className="mb-4">
              La aplicación necesita variables de entorno para funcionar correctamente.
            </p>
            
            {configResult?.errors && configResult.errors.length > 0 && (
              <div className="text-left text-sm bg-red-100 p-3 rounded mb-4">
                <p className="font-semibold mb-2 text-red-800">Errores encontrados:</p>
                <ul className="list-disc list-inside space-y-1 text-red-700">
                  {configResult.errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {configResult?.warnings && configResult.warnings.length > 0 && (
              <div className="text-left text-sm bg-yellow-100 p-3 rounded mb-4">
                <p className="font-semibold mb-2 text-yellow-800">Advertencias:</p>
                <ul className="list-disc list-inside space-y-1 text-yellow-700">
                  {configResult.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="text-left text-sm bg-gray-100 p-3 rounded">
              <p className="font-semibold mb-2">Variables requeridas:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><code>NEXT_PUBLIC_ONCHAINKIT_API_KEY</code></li>
              </ul>
            </div>
            
            <p className="mt-4 text-xs text-gray-600">
              Verifica tu archivo <code>.env.local</code> en la raíz del proyecto
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Configuración válida, renderizar la aplicación
  console.log('🎉 Configuración validada, renderizando aplicación...');
  
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={config.onchainKit.apiKey}
          chain={base}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}





