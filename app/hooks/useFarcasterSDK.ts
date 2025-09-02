'use client';

import { useState, useEffect, useCallback } from 'react';

// Importar la nueva SDK de Farcaster Mini App
import MiniAppSDK from '@farcaster/miniapp-sdk';

// Tipos para el SDK de Farcaster Mini App
interface FarcasterUser {
  fid: number;
  username: string;
  displayName: string;
  pfp: string;
  followerCount: number;
  followingCount: number;
}

export function useFarcasterSDK() {
  const [sdk, setSdk] = useState<typeof MiniAppSDK | null>(null);
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
        if (isFarcasterEnv) {
          console.log('🚀 Inicializando Farcaster Mini App SDK...');
          
          // Crear instancia del SDK
          const miniAppSDK = new (MiniAppSDK as any)({
            appName: 'Pa$e a GoI CDMX',
            appVersion: '1.0.0',
            appIcon: 'https://flashsend-cdmx.vercel.app/icon.png',
          });
          
          setSdk(miniAppSDK);
          
          // Inicializar el SDK
          await miniAppSDK.ready();
          setIsReady(true);
          
          console.log('🎉 Farcaster Mini App SDK inicializado correctamente');
          
          // Obtener información del usuario si está disponible
          try {
            const userInfo = await miniAppSDK.getUser();
            if (userInfo) {
              setUser({
                fid: userInfo.fid || 0,
                username: userInfo.username || 'usuario',
                displayName: userInfo.displayName || 'Usuario',
                pfp: userInfo.pfp || '/pase-a-gol-assets/icons/icon-1024.png',
                followerCount: userInfo.followerCount || 0,
                followingCount: userInfo.followingCount || 0,
              });
            }
          } catch (userError) {
            console.warn('⚠️ No se pudo obtener información del usuario:', userError);
          }
          
        } else {
          // En entorno web estándar, marcar como listo inmediatamente
          console.log('🌍 Entorno web estándar, saltando inicialización de Farcaster');
          setIsReady(true);
        }
        
      } catch (error) {
        console.error('❌ Error al inicializar Farcaster Mini App SDK:', error);
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

  // Función para enviar mensajes al frame padre
  const sendMessage = useCallback(async (message: any) => {
    try {
      if (sdk && isReady) {
        await sdk.sendMessage(message);
        console.log('📤 Mensaje enviado al frame padre:', message);
      }
    } catch (error) {
      console.error('❌ Error al enviar mensaje:', error);
    }
  }, [sdk, isReady]);

  // Función para cerrar el Mini App
  const closeMiniApp = useCallback(async () => {
    try {
      if (sdk && isReady) {
        await sdk.close();
        console.log('🔒 Mini App cerrado');
      }
    } catch (error) {
      console.error('❌ Error al cerrar Mini App:', error);
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
    sendMessage,
    closeMiniApp,
  };
}