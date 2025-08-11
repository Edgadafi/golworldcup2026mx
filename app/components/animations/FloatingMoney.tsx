'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingMoneyProps {
  amount: number;
  currency?: string;
  isVisible: boolean;
  onComplete?: () => void;
  className?: string;
}

const FloatingMoney: React.FC<FloatingMoneyProps> = ({
  amount,
  currency = 'MXN',
  isVisible,
  onComplete,
  className = '',
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible && !isAnimating) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        onComplete?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, isAnimating, onComplete]);

  if (!isVisible) return null;

  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          className={`fixed z-50 pointer-events-none ${className}`}
          initial={{
            opacity: 0,
            scale: 0.5,
            y: 0,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1.2, 1, 0.8],
            y: -50,
          }}
          exit={{
            opacity: 0,
            scale: 0,
            y: -100,
          }}
          transition={{
            duration: 2,
            ease: 'easeOut',
          }}
        >
          <div className="text-2xl font-black text-gradient-money drop-shadow-lg">
            +{formatAmount(amount)}
          </div>
          
          {/* Efecto de partículas de dinero */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-cancha-400 to-oro-400 rounded-full"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                }}
                animate={{
                  x: (Math.cos((i * 60) * Math.PI / 180) * 30),
                  y: (Math.sin((i * 60) * Math.PI / 180) * 30),
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
          
          {/* Efecto de brillo */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-oro-400/30 to-transparent rounded-full blur-sm"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 2, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 2,
              ease: 'easeOut',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { FloatingMoney };
