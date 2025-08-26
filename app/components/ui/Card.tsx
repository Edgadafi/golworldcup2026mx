'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: 'cancha' | 'oro' | 'rojo' | 'none';
  celebration?: boolean;
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, glow = 'none', celebration = false, children, ...props }, ref) => {
    // Filtrar props compatibles con motion.div
    const {
      ...motionProps
    } = props;

    const getGlowClass = () => {
      switch (glow) {
        case 'cancha':
          return 'shadow-cancha';
        case 'oro':
          return 'shadow-oro';
        case 'rojo':
          return 'shadow-rojo';
        default:
          return '';
      }
    };

    return (
      <motion.div
        ref={ref}
        className={clsx(
          'glass rounded-2xl p-6 transition-all duration-300',
          getGlowClass(),
          className
        )}
        whileHover={hover ? { 
          scale: 1.02, 
          y: -5,
          boxShadow: glow !== 'none' ? '0 25px 50px rgba(0, 0, 0, 0.3)' : '0 20px 40px rgba(0, 0, 0, 0.2)'
        } : {}}
        whileTap={{ scale: 0.98 }}
        animate={celebration ? {
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0],
        } : {}}
        transition={{
          duration: 0.3,
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}
        {...motionProps}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export { Card };
