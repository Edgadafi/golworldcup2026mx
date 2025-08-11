'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PulseEffectProps {
  children: React.ReactNode;
  color?: 'cancha' | 'oro' | 'rojo' | 'white';
  isActive?: boolean;
  className?: string;
}

const PulseEffect: React.FC<PulseEffectProps> = ({
  children,
  color = 'cancha',
  isActive = false,
  className = '',
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'cancha':
        return 'shadow-cancha';
      case 'oro':
        return 'shadow-oro';
      case 'rojo':
        return 'shadow-rojo';
      case 'white':
        return 'shadow-white/20';
      default:
        return 'shadow-cancha';
    }
  };

  const getPulseColor = () => {
    switch (color) {
      case 'cancha':
        return 'rgba(0, 168, 84, 0.3)';
      case 'oro':
        return 'rgba(255, 215, 0, 0.4)';
      case 'rojo':
        return 'rgba(231, 76, 60, 0.3)';
      case 'white':
        return 'rgba(255, 255, 255, 0.2)';
      default:
        return 'rgba(0, 168, 84, 0.3)';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {children}
      
      {/* Efecto de pulso */}
      {isActive && (
        <motion.div
          className={`absolute inset-0 rounded-full ${getColorClasses()}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            boxShadow: `0 0 0 0 ${getPulseColor()}`,
          }}
        />
      )}
      
      {/* Efecto de pulso secundario */}
      {isActive && (
        <motion.div
          className={`absolute inset-0 rounded-full ${getColorClasses()}`}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          style={{
            boxShadow: `0 0 0 0 ${getPulseColor()}`,
          }}
        />
      )}
      
      {/* Efecto de pulso terciario */}
      {isActive && (
        <motion.div
          className={`absolute inset-0 rounded-full ${getColorClasses()}`}
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.2, 0, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          style={{
            boxShadow: `0 0 0 0 ${getPulseColor()}`,
          }}
        />
      )}
    </div>
  );
};

export { PulseEffect };
