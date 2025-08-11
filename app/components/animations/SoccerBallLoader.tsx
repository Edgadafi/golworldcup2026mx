'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SoccerBallLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SoccerBallLoader: React.FC<SoccerBallLoaderProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const strokeWidth = {
    sm: 1,
    md: 2,
    lg: 3,
  };

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {/* Balón hexagonal con patrón de fútbol */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hexágono exterior */}
        <polygon
          points="50,5 85,27.5 85,72.5 50,95 15,72.5 15,27.5"
          fill="#000000"
          stroke="#FFFFFF"
          strokeWidth={strokeWidth[size]}
        />
        
        {/* Líneas internas del balón */}
        <path
          d="M 50,5 L 50,95 M 15,27.5 L 85,72.5 M 15,72.5 L 85,27.5"
          stroke="#FFFFFF"
          strokeWidth={strokeWidth[size]}
          strokeLinecap="round"
        />
        
        {/* Puntos de conexión */}
        <circle cx="50" cy="5" r="3" fill="#FFFFFF" />
        <circle cx="85" cy="27.5" r="3" fill="#FFFFFF" />
        <circle cx="85" cy="72.5" r="3" fill="#FFFFFF" />
        <circle cx="50" cy="95" r="3" fill="#FFFFFF" />
        <circle cx="15" cy="27.5" r="3" fill="#FFFFFF" />
        <circle cx="15" cy="72.5" r="3" fill="#FFFFFF" />
        <circle cx="50" cy="50" r="3" fill="#FFFFFF" />
        
        {/* Hexágonos internos más pequeños */}
        <polygon
          points="50,20 65,30 65,70 50,80 35,70 35,30"
          fill="#000000"
          stroke="#FFFFFF"
          strokeWidth={strokeWidth[size] * 0.5}
        />
        
        {/* Líneas internas adicionales */}
        <path
          d="M 35,30 L 65,70 M 35,70 L 65,30"
          stroke="#FFFFFF"
          strokeWidth={strokeWidth[size] * 0.5}
          strokeLinecap="round"
        />
      </svg>
      
      {/* Efecto de brillo */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
};

export { SoccerBallLoader };
