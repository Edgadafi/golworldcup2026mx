'use client';

import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { PulseEffect } from '../animations/PulseEffect';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  pulse?: boolean;
  delay?: number;
}

export function StatsCard({ 
  title, 
  value, 
  icon, 
  subtitle, 
  trend = 'neutral', 
  pulse = false,
  delay = 0 
}: StatsCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return '↗️';
      case 'down':
        return '↘️';
      default:
        return '→';
    }
  };

  const CardContent = (
    <Card className="p-6 bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-l-4 border-green-500">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-3xl">{icon}</span>
            <div>
              <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-gray-500">{subtitle}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-baseline space-x-2">
            <p className="text-3xl font-bold text-gray-900">
              {value}
            </p>
            {trend !== 'neutral' && (
              <span className={`text-sm font-medium ${getTrendColor()}`}>
                {getTrendIcon()}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        type: "spring", 
        damping: 20, 
        stiffness: 100,
        delay: delay * 0.1 
      }}
      className="relative"
    >
      {pulse ? (
        <PulseEffect>
          {CardContent}
        </PulseEffect>
      ) : (
        CardContent
      )}
    </motion.div>
  );
}
