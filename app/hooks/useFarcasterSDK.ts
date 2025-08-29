'use client';

import { useEffect, useState } from 'react';

// Try different import patterns for the SDK
let MiniappSDK: any = null;

try {
  // Try the default import first
  const sdkModule = require('@farcaster/miniapp-sdk');
  MiniappSDK = sdkModule.default || sdkModule.MiniappSDK || sdkModule;
  console.log('SDK module loaded:', sdkModule);
  console.log('MiniappSDK constructor:', MiniappSDK);
} catch (error) {
  console.error('Error loading SDK module:', error);
}

export function useFarcasterSDK() {
  const [sdk, setSdk] = useState<any>(null);
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
        
        // Check if SDK is available
        if (!MiniappSDK) {
          throw new Error('MiniappSDK constructor not available');
        }
        
        console.log('MiniappSDK constructor found:', MiniappSDK);
        
        // Initialize the Farcaster Miniapp SDK
        const farcasterSDK = new MiniappSDK();
        console.log('SDK instance created:', farcasterSDK);
        
        // Set the SDK instance
        setSdk(farcasterSDK);

        // Wait a bit to ensure SDK is fully initialized
        await new Promise(resolve => setTimeout(resolve, 100));

        // Check if actions.ready exists
        if (!farcasterSDK.actions || typeof farcasterSDK.actions.ready !== 'function') {
          console.warn('SDK actions.ready not found, checking alternative methods...');
          
          // Try alternative methods
          if (farcasterSDK.ready && typeof farcasterSDK.ready === 'function') {
            console.log('Using farcasterSDK.ready() instead');
            await farcasterSDK.ready();
          } else if (farcasterSDK.init && typeof farcasterSDK.init === 'function') {
            console.log('Using farcasterSDK.init() instead');
            await farcasterSDK.init();
          } else {
            console.warn('No ready method found, setting ready manually');
            setIsReady(true);
            return;
          }
        } else {
          // Call ready() to indicate the app is ready
          console.log('Calling sdk.actions.ready()...');
          await farcasterSDK.actions.ready();
          console.log('sdk.actions.ready() completed successfully');
        }
        
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
        console.log('Manually calling ready...');
        
        // Try different ready methods
        if (sdk.actions && typeof sdk.actions.ready === 'function') {
          await sdk.actions.ready();
        } else if (sdk.ready && typeof sdk.ready === 'function') {
          await sdk.ready();
        } else if (sdk.init && typeof sdk.init === 'function') {
          await sdk.init();
        } else {
          console.warn('No ready method available');
          setIsReady(true); // Set ready manually
          return;
        }
        
        setIsReady(true);
        setError(null);
        console.log('Manual ready call completed successfully');
      } catch (error) {
        console.error('Error calling ready:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      }
    } else {
      console.warn('SDK not available for manual ready call');
    }
  };

  // Force ready call if we're in Farcaster environment and not ready
  useEffect(() => {
    if (isFarcasterEnv && !isReady && sdk) {
      const timer = setTimeout(() => {
        console.log('Forcing ready call in Farcaster environment...');
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
