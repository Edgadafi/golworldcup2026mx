'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useFarcasterSDK } from '../hooks/useFarcasterSDK';

interface FarcasterInitializerProps {
  children: React.ReactNode;
}

export function FarcasterInitializer({ children }: FarcasterInitializerProps) {
  const { isReady, callReady, error, isFarcasterEnv, user } = useFarcasterSDK();
  const [showLoading, setShowLoading] = useState(true);
  const [loadingTime, setLoadingTime] = useState(0);
  const [retryCount, setRetryCount] = useState(0);

  // Mostrar loading inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1000);

    const interval = setInterval(() => {
      setLoadingTime(prev => prev + 100);
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Mecanismo de reintento inteligente
  useEffect(() => {
    // Solo activamos el reintento si no está listo y han pasado más de 3 segundos
    if (!isReady && loadingTime > 3000 && retryCount === 0) {
      console.log('⏰ La carga está tardando, forzando el primer reintento...');
      setRetryCount(prev => prev + 1);
      callReady();
    }
  }, [isReady, loadingTime, callReady, retryCount]);

  // Reintentos adicionales en entorno Farcaster
  useEffect(() => {
    if (isFarcasterEnv && !isReady && retryCount < 3) {
      const timer = setTimeout(() => {
        console.log(`🔄 Reintento ${retryCount + 1}: Forzando llamada a ready() en entorno Farcaster...`);
        setRetryCount(prev => prev + 1);
        callReady();
      }, 2000 + (retryCount * 1000));
      
      return () => clearTimeout(timer);
    }
  }, [isFarcasterEnv, isReady, retryCount, callReady]);

  // Mostrar errores si los hay
  if (error) {
    console.warn('⚠️ Error en Farcaster SDK:', error);
  }

  // Pantalla de carga mientras se inicializa
  if (showLoading || !isReady) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100 flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Pa$e a Gol CDMX
          </h2>
          <p className="text-gray-600 mb-4">
            {isFarcasterEnv ? 'Inicializando en Farcaster...' : 'Inicializando aplicación...'}
          </p>
          
          {/* Información del usuario si está disponible */}
          {user && (
            <div className="bg-white bg-opacity-80 rounded-lg p-4 mb-4 max-w-sm mx-auto">
              <div className="flex items-center space-x-3">
                <img 
                  src={user.pfp} 
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = '/pase-a-gol-assets/icons/icon-1024.png.png';
                  }}
                />
                <div className="text-left">
                  <p className="font-semibold text-gray-800">{user.displayName}</p>
                  <p className="text-sm text-gray-600">@{user.username}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Spinner de carga */}
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          
          {/* Información de estado */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>Entorno: {isFarcasterEnv ? '🌐 Farcaster' : '🌍 Web'}</p>
            <p>Estado: {isReady ? '✅ Listo' : '🔄 Inicializando...'}</p>
            {retryCount > 0 && <p>Reintentos: {retryCount}/3</p>}
          </div>
        </div>
      </motion.div>
    );
  }

  // Renderiza la aplicación principal cuando todo está listo
  console.log('🎉 FarcasterInitializer: Aplicación lista para renderizar');
  return <>{children}</>;
}