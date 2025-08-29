'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useFarcasterSDK } from '../hooks/useFarcasterSDK';

interface FarcasterInitializerProps {
  children: React.ReactNode;
}

export function FarcasterInitializer({ children }: FarcasterInitializerProps) {
  const { isReady, callReady, error, isFarcasterEnv, sdk } = useFarcasterSDK();
  const [showLoading, setShowLoading] = useState(true);
  const [loadingTime, setLoadingTime] = useState(0);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Show loading for at least 1 second to ensure smooth transition
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1000);

    // Track loading time for debugging
    const interval = setInterval(() => {
      setLoadingTime(prev => prev + 100);
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Force ready call if taking too long
  useEffect(() => {
    if (!isReady && loadingTime > 3000) {
      console.log('Loading taking too long, forcing ready call...');
      setRetryCount(prev => prev + 1);
      callReady();
    }
  }, [isReady, loadingTime, callReady]);

  // Additional retry mechanism for Farcaster environment
  useEffect(() => {
    if (isFarcasterEnv && !isReady && sdk && retryCount < 3) {
      const timer = setTimeout(() => {
        console.log(`Retry ${retryCount + 1}: Forcing ready() call in Farcaster environment...`);
        setRetryCount(prev => prev + 1);
        callReady();
      }, 2000 + (retryCount * 1000));
      
      return () => clearTimeout(timer);
    }
  }, [isFarcasterEnv, isReady, sdk, retryCount, callReady]);

  // Show loading screen while initializing
  if (showLoading || !isReady) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100 flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4"
          >
            ⚽
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Pa$e a Gol CDMX
          </h2>
          <p className="text-gray-600 mb-4">
            Inicializando aplicación...
          </p>
          
          {/* Environment info */}
          <div className="text-xs text-gray-500 mb-2">
            Entorno: {isFarcasterEnv ? 'Farcaster' : 'Local'}
          </div>
          
          {/* Debug info */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 max-w-md mx-auto">
              <p className="text-sm font-semibold">Error de inicialización:</p>
              <p className="text-xs">{error}</p>
            </div>
          )}
          
          <div className="text-xs text-gray-500 mb-4">
            Tiempo: {Math.round(loadingTime / 1000)}s | Intentos: {retryCount}
          </div>
          
          <div className="flex justify-center space-x-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              className="w-3 h-3 bg-green-500 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              className="w-3 h-3 bg-blue-500 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              className="w-3 h-3 bg-green-500 rounded-full"
            />
          </div>
          
          {/* Force ready button for debugging */}
          {loadingTime > 2000 && (
            <button
              onClick={() => {
                setRetryCount(prev => prev + 1);
                callReady();
              }}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Forzar Inicialización (Intento {retryCount + 1})
            </button>
          )}
          
          {/* SDK Status */}
          <div className="mt-4 text-xs text-gray-600">
            SDK: {sdk ? '✅ Disponible' : '❌ No disponible'} | 
            Ready: {isReady ? '✅ Llamado' : '❌ Pendiente'}
          </div>
        </div>
      </motion.div>
    );
  }

  // Render children when ready
  return <>{children}</>;
}
