'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface WorldCupBadgeProps {
  className?: string;
}

const WorldCupBadge: React.FC<WorldCupBadgeProps> = ({ className = '' }) => {
  return (
    <motion.div
      className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-oro-500 to-oro-600 text-negro-900 font-bold shadow-oro ${className}`}
      animate={{
        y: [0, -5, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{
        scale: 1.05,
        y: -8,
        transition: { duration: 0.2 },
      }}
    >
      {/* Emoji de fútbol rotativo */}
      <motion.span
        className="text-xl"
        animate={{ rotate: 360 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        ⚽
      </motion.span>
      
      {/* Texto del badge */}
      <span className="text-sm whitespace-nowrap">
        FIFA World Cup 2026
      </span>
      
      {/* Efecto de brillo */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  );
};

export { WorldCupBadge };
