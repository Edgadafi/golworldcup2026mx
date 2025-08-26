'use client';

import { useEffect, useState } from 'react';
import { MiniappSDK } from '@farcaster/miniapp-sdk';

export function useFarcasterSDK() {
  const [sdk, setSdk] = useState<MiniappSDK | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        // Initialize the Farcaster Miniapp SDK
        const farcasterSDK = new MiniappSDK();
        
        // Set the SDK instance
        setSdk(farcasterSDK);

        // Call ready() to indicate the app is ready
        // This resolves the "InSplash screen: Ready not called" error
        await farcasterSDK.actions.ready();
        
        setIsReady(true);
        console.log('Farcaster SDK initialized and ready');
      } catch (error) {
        console.error('Error initializing Farcaster SDK:', error);
        setIsReady(false);
      }
    };

    // Only initialize if we're in a Farcaster environment
    if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
      initializeSDK();
    } else {
      // For local development, just set ready
      setIsReady(true);
    }

    return () => {
      // Cleanup if needed
      if (sdk) {
        // Any cleanup logic here
      }
    };
  }, []);

  return {
    sdk,
    isReady,
    // Helper function to call ready() manually if needed
    callReady: async () => {
      if (sdk) {
        try {
          await sdk.actions.ready();
          setIsReady(true);
        } catch (error) {
          console.error('Error calling ready():', error);
        }
      }
    }
  };
}
