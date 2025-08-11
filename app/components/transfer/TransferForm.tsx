'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { SoccerBallLoader } from '../animations/SoccerBallLoader';
import { CelebrationEffect } from '../animations/CelebrationEffect';
import { FloatingMoney } from '../animations/FloatingMoney';
import { useCelebration } from '../../hooks/useCelebration';

interface TransferFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TransferData {
  amount: string;
  recipient: string;
  message: string;
}

export function TransferForm({ isOpen, onClose }: TransferFormProps) {
  const [formData, setFormData] = useState<TransferData>({
    amount: '',
    recipient: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<TransferData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { playKickSound, playGolSound, triggerCelebration } = useCelebration();

  const validateField = (name: keyof TransferData, value: string) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'amount':
        if (!value) {
          newErrors.amount = 'El monto es requerido';
        } else if (isNaN(Number(value)) || Number(value) <= 0) {
          newErrors.amount = 'Ingresa un monto válido';
        } else {
          delete newErrors.amount;
        }
        break;
      case 'recipient':
        if (!value) {
          newErrors.recipient = 'El destinatario es requerido';
        } else if (!value.startsWith('@')) {
          newErrors.recipient = 'El usuario debe empezar con @';
        } else {
          delete newErrors.recipient;
        }
        break;
      case 'message':
        if (value.length > 100) {
          newErrors.message = 'El mensaje no puede exceder 100 caracteres';
        } else {
          delete newErrors.message;
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name: keyof TransferData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateField('amount', formData.amount) || 
        !validateField('recipient', formData.recipient)) {
      return;
    }

    setIsLoading(true);
    playKickSound();

    // Simular envío de transferencia
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    playGolSound();
    triggerCelebration();
    setIsSuccess(true);

    // Reset form después de éxito
    setTimeout(() => {
      setFormData({ amount: '', recipient: '', message: '' });
      setErrors({});
      setIsSuccess(false);
      onClose();
    }, 3000);
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md"
          >
            <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  ⚽ Pa$e a Gol
                </h2>
                <button
                  onClick={handleClose}
                  disabled={isLoading}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
                >
                  ✕
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    💰 Monto (MXN)
                  </label>
                  <Input
                    type="text"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    placeholder="0.00"
                    error={errors.amount || ''}
                    disabled={isLoading}
                    className="text-lg"
                  />
                  {errors.amount && (
                    <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    👤 Destinatario
                  </label>
                  <Input
                    type="text"
                    value={formData.recipient}
                    onChange={(e) => handleInputChange('recipient', e.target.value)}
                    placeholder="@usuario"
                    error={errors.recipient || ''}
                    disabled={isLoading}
                  />
                  {errors.recipient && (
                    <p className="text-red-500 text-sm mt-1">{errors.recipient}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    💬 Mensaje (opcional)
                  </label>
                  <Input
                    type="text"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="¡GOL! 🎉"
                    error={errors.message || ''}
                    disabled={isLoading}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                  <p className="text-gray-500 text-xs mt-1">
                    {formData.message.length}/100
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || Object.keys(errors).length > 0}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <SoccerBallLoader size="sm" />
                      <span>Enviando Pa$e...</span>
                    </div>
                  ) : (
                    '🚀 ¡Pa$e a Gol!'
                  )}
                </Button>
              </form>

              {/* Success State */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center bg-green-500/90 rounded-lg"
                  >
                    <div className="text-center text-white">
                      <div className="text-6xl mb-4">🎉</div>
                      <h3 className="text-2xl font-bold mb-2">¡GOL!</h3>
                      <p className="text-lg">Pa$e enviado exitosamente</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Celebration Effect */}
              {isSuccess && <CelebrationEffect isActive={isSuccess} />}
              
              {/* Floating Money Effect */}
              {isSuccess && <FloatingMoney amount={parseFloat(formData.amount) || 0} isVisible={isSuccess} />}
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
