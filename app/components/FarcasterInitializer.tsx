'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useFarcasterSDK } from '../hooks/useFarcasterSDK';

interface FarcasterInitializerProps {
  children: React.ReactNode;
}

export function FarcasterInitializer({ children }: FarcasterInitializerProps) {
  const { isReady, callReady } = useFarcasterSDK();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Show loading for at least 1 second to ensure smooth transition
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
        </div>
      </motion.div>
    );
  }

  // Render children when ready
  return <>{children}</>;
}
