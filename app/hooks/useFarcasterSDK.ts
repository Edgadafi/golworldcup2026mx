'use client';

import { useEffect, useState } from 'react';
import { MiniappSDK } from '@farcaster/miniapp-sdk';

export function useFarcasterSDK() {
  const [sdk, setSdk] = useState<MiniappSDK | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFarcasterEnv, setIsFarcasterEnv] = useState(false);

  useEffect(() => {
    const detectFarcasterEnvironment = () => {
      // Check if we're in a Farcaster environment
      const isInFarcaster = 
        typeof window !== 'undefined' && 
        (window.location.hostname.includes('vercel.app') || 
         window.location.hostname.includes('farcaster') ||
         window.navigator.userAgent.includes('Farcaster') ||
         // Check for Farcaster-specific environment variables or objects
         (window as any).farcaster ||
         (window as any).__FARCASTER__);
      
      setIsFarcasterEnv(isInFarcaster);
      console.log('Farcaster environment detected:', isInFarcaster);
      return isInFarcaster;
    };

    const initializeSDK = async () => {
      try {
        console.log('Initializing Farcaster Miniapp SDK...');
        
        // Initialize the Farcaster Miniapp SDK
        const farcasterSDK = new MiniappSDK();
        
        // Set the SDK instance
        setSdk(farcasterSDK);
        console.log('SDK instance created');

        // Wait a bit to ensure SDK is fully initialized
        await new Promise(resolve => setTimeout(resolve, 100));

        // Call ready() to indicate the app is ready
        // This resolves the "InSplash screen: Ready not called" error
        console.log('Calling sdk.actions.ready()...');
        await farcasterSDK.actions.ready();
        console.log('sdk.actions.ready() completed successfully');
        
        setIsReady(true);
        setError(null);
        console.log('Farcaster SDK initialized and ready');
      } catch (error) {
        console.error('Error initializing Farcaster SDK:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
        setIsReady(false);
        
        // If ready() fails, try again after a delay
        setTimeout(() => {
          console.log('Retrying ready() call...');
          callReady();
        }, 1000);
      }
    };

    // Detect environment first
    const isFarcaster = detectFarcasterEnvironment();
    
    // Always initialize the SDK when the component mounts
    // This ensures it works in both Farcaster and local environments
    if (typeof window !== 'undefined') {
      initializeSDK();
    }

    return () => {
      // Cleanup if needed
      if (sdk) {
        // Any cleanup logic here
      }
    };
  }, []);

  const callReady = async () => {
    if (sdk) {
      try {
        console.log('Manually calling sdk.actions.ready()...');
        await sdk.actions.ready();
        setIsReady(true);
        setError(null);
        console.log('Manual ready() call completed successfully');
      } catch (error) {
        console.error('Error calling ready():', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      }
    } else {
      console.warn('SDK not available for manual ready() call');
    }
  };

  // Force ready call if we're in Farcaster environment and not ready
  useEffect(() => {
    if (isFarcasterEnv && !isReady && sdk) {
      const timer = setTimeout(() => {
        console.log('Forcing ready() call in Farcaster environment...');
        callReady();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isFarcasterEnv, isReady, sdk]);

  return {
    sdk,
    isReady,
    error,
    isFarcasterEnv,
    callReady
  };
}
