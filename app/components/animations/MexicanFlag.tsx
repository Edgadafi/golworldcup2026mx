'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MexicanFlagProps {
  animated?: boolean;
  className?: string;
}

const MexicanFlag: React.FC<MexicanFlagProps> = ({ 
  animated = false, 
  className = '' 
}) => {
  return (
    <motion.div
      className={`flex h-2 w-full rounded-full overflow-hidden ${className}`}
      animate={animated ? {
        scale: [1, 1.05, 1],
      } : {}}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Franja verde */}
      <motion.div
        className="flex-1 bg-[#006847]"
        initial={animated ? { scaleX: 0 } : {}}
        animate={animated ? { scaleX: 1 } : {}}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
      />
      
      {/* Franja blanca */}
      <motion.div
        className="flex-1 bg-white"
        initial={animated ? { scaleX: 0 } : {}}
        animate={animated ? { scaleX: 1 } : {}}
        transition={{
          duration: 0.5,
          delay: 0.1,
          ease: 'easeOut',
        }}
      />
      
      {/* Franja roja */}
      <motion.div
        className="flex-1 bg-[#CE1126]"
        initial={animated ? { scaleX: 0 } : {}}
        animate={animated ? { scaleX: 1 } : {}}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: 'easeOut',
        }}
      />
    </motion.div>
  );
};

export { MexicanFlag };
