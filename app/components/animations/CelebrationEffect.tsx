'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  delay: number;
}

interface CelebrationEffectProps {
  isActive: boolean;
  onComplete?: () => void;
}

const CelebrationEffect: React.FC<CelebrationEffectProps> = ({ isActive, onComplete }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (isActive) {
      // Generar 20 partículas con movimiento aleatorio
      const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: Math.random() * 8 + 4,
        delay: Math.random() * 0.5,
      }));
      
      setParticles(newParticles);

      // Limpiar después de 3 segundos
      const timer = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Partículas doradas flotantes */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-gradient-to-r from-oro-400 to-oro-600 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={{ 
              scale: 0, 
              opacity: 0,
              x: 0,
              y: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              x: particle.vx * 50,
              y: particle.vy * 50,
            }}
            transition={{
              duration: 3,
              delay: particle.delay,
              ease: 'easeOut',
            }}
            exit={{ scale: 0, opacity: 0 }}
          />
        ))}
      </AnimatePresence>

      {/* Mensaje ¡GOOOOOL! */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, rotate: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 1.5, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 3,
          ease: 'easeInOut',
        }}
      >
        <div className="text-8xl font-black text-gradient-celebracion drop-shadow-2xl">
          ¡GOOOOOL!
        </div>
      </motion.div>

      {/* Ondas expansivas concéntricas */}
      {[0, 1, 2].map((wave) => (
        <motion.div
          key={wave}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-oro-400 rounded-full"
          initial={{ scale: 0, opacity: 1 }}
          animate={{
            scale: [0, 3],
            opacity: [1, 0],
          }}
          transition={{
            duration: 3,
            delay: wave * 0.3,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Efecto de brillo central */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-oro-400/20 to-transparent rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 2],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          ease: 'easeOut',
        }}
      />
    </div>
  );
};

export { CelebrationEffect };
