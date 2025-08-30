'use client';

import { useState, useEffect, useCallback } from 'react';

// Tipos para el SDK de Farcaster
interface FarcasterSDK {
  ready: () => Promise<void>;
  isReady: () => Promise<boolean>;
  getFrame: () => any;
  getCast: () => any;
  getUser: () => any;
}

interface FarcasterUser {
  fid: number;
  username: string;
  displayName: string;
  pfp: string;
  followerCount: number;
  followingCount: number;
}

export function useFarcasterSDK() {
  const [sdk, setSdk] = useState<FarcasterSDK | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFarcasterEnv, setIsFarcasterEnv] = useState(false);
  const [user, setUser] = useState<FarcasterUser | null>(null);

  // Detectar si estamos en un entorno de Farcaster
  useEffect(() => {
    const checkFarcasterEnv = () => {
      try {
        // Verificar si estamos en un frame de Farcaster
        const isFrame = window.location.href.includes('warpcast.com') || 
                       window.location.href.includes('farcaster.xyz') ||
                       window.location.href.includes('frame');
        
        // Verificar si tenemos acceso a las APIs de Farcaster
        const hasFarcasterAPIs = typeof window !== 'undefined' && 
                                (window as any).farcaster !== undefined;
        
        setIsFarcasterEnv(isFrame || hasFarcasterAPIs);
        
        if (isFrame || hasFarcasterAPIs) {
          console.log('🌐 Entorno de Farcaster detectado');
        } else {
          console.log('🌍 Ejecutando en entorno web estándar');
        }
      } catch (error) {
        console.warn('⚠️ Error al detectar entorno de Farcaster:', error);
        setIsFarcasterEnv(false);
      }
    };

    checkFarcasterEnv();
  }, []);

  // Inicializar el SDK
  useEffect(() => {
    const initializeSDK = async () => {
      try {
        // En un entorno real de Farcaster, aquí cargarías el SDK
        // Por ahora, simulamos la funcionalidad básica
        if (isFarcasterEnv) {
          console.log('🚀 Inicializando SDK de Farcaster...');
          
          // Simular SDK de Farcaster
          const mockSDK: FarcasterSDK = {
            ready: async () => {
              console.log('✅ SDK de Farcaster listo');
              setIsReady(true);
            },
            isReady: async () => isReady,
            getFrame: () => ({ id: 'mock-frame-id' }),
            getCast: () => ({ hash: 'mock-cast-hash' }),
            getUser: () => user,
          };
          
          setSdk(mockSDK);
          
          // Simular usuario de Farcaster
          setUser({
            fid: 12345,
            username: 'paseagol_cdmx',
            displayName: 'Pa$e A Gol CDMX',
            pfp: '/pase-a-gol-assets/icons/icon-1024.png.png',
            followerCount: 1000,
            followingCount: 500,
          });
          
          // Marcar como listo después de un breve delay
          setTimeout(() => {
            setIsReady(true);
            console.log('🎉 SDK de Farcaster inicializado correctamente');
          }, 1000);
          
        } else {
          // En entorno web estándar, marcar como listo inmediatamente
          console.log('🌍 Entorno web estándar, saltando inicialización de Farcaster');
          setIsReady(true);
        }
        
      } catch (error) {
        console.error('❌ Error al inicializar SDK de Farcaster:', error);
        setError(`Error de inicialización: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        
        // En caso de error, marcar como listo para no bloquear la app
        setIsReady(true);
      }
    };

    if (typeof window !== 'undefined') {
      initializeSDK();
    }
  }, [isFarcasterEnv]);

  // Función para forzar el estado "ready"
  const callReady = useCallback(async () => {
    try {
      if (sdk) {
        await sdk.ready();
        setIsReady(true);
        console.log('✅ Estado ready forzado exitosamente');
      } else {
        console.warn('⚠️ SDK no disponible para callReady');
        setIsReady(true); // Marcar como listo de todas formas
      }
    } catch (error) {
      console.error('❌ Error en callReady:', error);
      setError(`Error en callReady: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      setIsReady(true); // Marcar como listo para no bloquear
    }
  }, [sdk]);

  // Función para obtener información del usuario
  const getUserInfo = useCallback(async () => {
    try {
      if (sdk && isReady) {
        const userInfo = await sdk.getUser();
        return userInfo;
      }
      return null;
    } catch (error) {
      console.error('❌ Error al obtener información del usuario:', error);
      return null;
    }
  }, [sdk, isReady]);

  // Función para obtener información del frame
  const getFrameInfo = useCallback(async () => {
    try {
      if (sdk && isReady) {
        const frameInfo = await sdk.getFrame();
        return frameInfo;
      }
      return null;
    } catch (error) {
      console.error('❌ Error al obtener información del frame:', error);
      return null;
    }
  }, [sdk, isReady]);

  return {
    sdk,
    isReady,
    error,
    isFarcasterEnv,
    user,
    callReady,
    getUserInfo,
    getFrameInfo,
  };
}