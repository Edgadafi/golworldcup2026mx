'use client';

import { useEffect, useState } from 'react';
import { MiniappSDK } from '@farcaster/miniapp-sdk';

export function useFarcasterSDK() {
  const [sdk, setSdk] = useState<MiniappSDK | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        console.log('Initializing Farcaster Miniapp SDK...');
        
        // Initialize the Farcaster Miniapp SDK
        const farcasterSDK = new MiniappSDK();
        
        // Set the SDK instance
        setSdk(farcasterSDK);
        console.log('SDK instance created');

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
      }
    };

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

  return {
    sdk,
    isReady,
    error,
    // Helper function to call ready() manually if needed
    callReady: async () => {
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
    }
  };
}
