'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-white/10 text-white border border-white/20',
        cancha: 'bg-cancha-500/20 text-cancha-300 border border-cancha-500/30',
        oro: 'bg-oro-500/20 text-oro-300 border border-oro-500/30',
        rojo: 'bg-rojo-500/20 text-rojo-300 border border-rojo-500/30',
        worldcup: 'bg-gradient-to-r from-oro-500 to-oro-600 text-negro-900 font-bold shadow-oro',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-2 text-base',
      },
      animation: {
        none: '',
        scale: 'hover:scale-110',
        rotate: 'hover:rotate-12',
        bounce: 'animate-bounce-slow',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      animation: 'none',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, animation, icon, children, ...props }, ref) => {
    const isWorldCup = variant === 'worldcup';

    // Filtrar props compatibles con motion.div
    const {
      ...motionProps
    } = props;

    return (
      <motion.div
        ref={ref}
        className={clsx(badgeVariants({ variant, size, animation, className }))}
        whileHover={isWorldCup ? { scale: 1.05, y: -2 } : {}}
        animate={isWorldCup ? {
          y: [0, -5, 0],
          rotate: [0, 5, 0],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        {...motionProps}
      >
        {icon && (
          <motion.span
            animate={isWorldCup ? { rotate: 360 } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {icon}
          </motion.span>
        )}
        {children}
      </motion.div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
