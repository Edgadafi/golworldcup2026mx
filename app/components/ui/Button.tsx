'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 btn-hover-effect',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-cancha-500 to-cancha-600 text-white shadow-cancha hover:shadow-lg hover:shadow-cancha/50',
        secondary: 'bg-gradient-to-r from-oro-500 to-oro-600 text-negro-900 shadow-oro hover:shadow-lg hover:shadow-oro/50',
        danger: 'bg-gradient-to-r from-rojo-500 to-rojo-600 text-white shadow-rojo hover:shadow-lg hover:shadow-rojo/50',
        ghost: 'bg-transparent text-white hover:bg-white/10 border border-white/20',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-4 text-base',
        lg: 'h-14 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  icon?: React.ReactNode;
  celebrationEffect?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, icon, celebrationEffect, children, ...props }, ref) => {
    const [isCelebrating, setIsCelebrating] = useState(false);

    // Filtrar props compatibles con motion.button
    const {
      ...motionProps
    } = props;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (celebrationEffect && !isCelebrating) {
        setIsCelebrating(true);
        setTimeout(() => setIsCelebrating(false), 3000);
      }
      motionProps.onClick?.(e);
    };

    const getIcon = () => {
      if (isLoading) return <Loader2 className="animate-spin" />;
      if (icon) return icon;
      return null;
    };

    return (
      <motion.button
        className={clsx(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...motionProps}
      >
        <AnimatePresence mode="wait">
          {isCelebrating && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              exit={{ scale: 0, rotate: 720 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-2xl">🎉</div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div
          className="flex items-center gap-2"
          animate={isCelebrating ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {getIcon()}
          <span className={isCelebrating ? 'opacity-0' : 'opacity-100'}>
            {children}
          </span>
        </motion.div>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
