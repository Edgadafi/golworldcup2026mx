'use client';

import React, { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { DollarSign, User, MessageSquare, AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: 'currency' | 'user' | 'message' | React.ReactNode;
  currency?: boolean;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, currency, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(e.target.value.length > 0);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0);
      props.onChange?.(e);
    };

    const getIcon = () => {
      if (typeof icon === 'string') {
        switch (icon) {
          case 'currency':
            return <DollarSign className="w-4 h-4 text-oro-500" />;
          case 'user':
            return <User className="w-4 h-4 text-cancha-500" />;
          case 'message':
            return <MessageSquare className="w-4 h-4 text-oro-500" />;
          default:
            return null;
        }
      }
      return icon;
    };

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-white/90">
            {label}
          </label>
        )}
        
        <div className="relative">
          <motion.div
            className={clsx(
              'relative flex items-center bg-white/10 backdrop-blur-sm border rounded-xl transition-all duration-300',
              isFocused
                ? 'border-oro-500 shadow-oro scale-105'
                : hasValue
                ? 'border-cancha-500'
                : 'border-white/20',
              error && 'border-rojo-500 shadow-rojo',
              className
            )}
            animate={{
              scale: isFocused ? 1.02 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            {getIcon() && (
              <div className="absolute left-3 text-white/60">
                {getIcon()}
              </div>
            )}
            
            <input
              ref={ref}
              className={clsx(
                'w-full bg-transparent px-4 py-3 text-white placeholder-white/50 outline-none transition-colors',
                getIcon() && 'pl-10',
                currency && 'pr-12'
              )}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              {...props}
            />
            
            {currency && (
              <div className="absolute right-3 text-white/60 font-medium">
                MXN
              </div>
            )}
          </motion.div>
          
          {error && (
            <motion.div
              className="flex items-center gap-2 mt-2 text-rojo-400 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
