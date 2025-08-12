'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface PropinaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number, recipient: string, category: string, message: string) => void;
}

export function PropinaModal({ isOpen, onClose, onSuccess }: PropinaModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [category, setCategory] = useState<string>('restaurante');
  const [message, setMessage] = useState<string>('');

  const tipOptions = [
    { amount: 50, label: 'Básica', emoji: '💝' },
    { amount: 100, label: 'Generosa', emoji: '🎁' },
    { amount: 200, label: 'Premium', emoji: '💎' },
    { amount: 500, label: 'VIP', emoji: '👑' },
  ];

  const categories = [
    { value: 'restaurante', label: '🍽️ Restaurante', emoji: '🍽️' },
    { value: 'delivery', label: '🛵 Delivery', emoji: '🛵' },
    { value: 'taxi', label: '🚗 Taxi', emoji: '🚗' },
    { value: 'servicio', label: '🔧 Servicio', emoji: '🔧' },
    { value: 'entretenimiento', label: '🎭 Entretenimiento', emoji: '🎭' },
    { value: 'otro', label: '💼 Otro', emoji: '💼' },
  ];

  const handleTipSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(0);
  };

  const handleSubmit = () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    
    if (!recipient.trim()) {
      alert('Por favor ingresa el destinatario');
      return;
    }
    
    if (!amount || amount <= 0) {
      alert('Por favor selecciona una propina válida');
      return;
    }

    onSuccess(amount, recipient, category, message);
    handleClose();
  };

  const handleClose = () => {
    setSelectedAmount(0);
    setCustomAmount('');
    setRecipient('');
    setCategory('restaurante');
    setMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="p-8 bg-white border-0 shadow-2xl rounded-2xl overflow-hidden relative">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50" />
              
              {/* Header */}
              <div className="relative z-10 flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🎁</span>
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Propina
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <span className="text-lg font-semibold text-gray-600">✕</span>
                </button>
              </div>

              {/* Form */}
              <div className="relative z-10 space-y-6">
                {/* Destinatario */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      👤
                    </span>
                    Destinatario
                  </label>
                  <Input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="@usuario"
                    className="text-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                  />
                </div>

                {/* Categoría */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                      🏷️
                    </span>
                    Categoría
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {tipOptions.map((category) => (
                      <button
                        key={category.amount}
                        onClick={() => handleTipSelect(category.amount)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center space-x-2 ${
                          selectedAmount === category.amount
                            ? 'border-purple-500 bg-purple-500 text-white shadow-lg shadow-purple-200'
                            : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-700'
                        }`}
                      >
                        <span className="text-lg">{category.emoji}</span>
                        <span className="font-medium">{category.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Monto de Propina */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      💰
                    </span>
                    Monto de Propina
                  </label>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {tipOptions.map((amount) => (
                      <button
                        key={amount.amount}
                        onClick={() => handleTipSelect(amount.amount)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 font-semibold ${
                          selectedAmount === amount.amount
                            ? 'border-green-500 bg-green-500 text-white shadow-lg shadow-green-200'
                            : 'border-gray-200 hover:border-green-300 hover:bg-green-50 text-gray-700'
                        }`}
                      >
                        ${amount.amount}
                      </button>
                    ))}
                  </div>
                  <Input
                    type="number"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    placeholder="Monto personalizado"
                    className="text-lg border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                  />
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center mr-3">
                      💬
                    </span>
                    Mensaje (opcional)
                  </label>
                  <Input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="¡Gracias por tu servicio!"
                    className="text-lg border-2 border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all duration-200"
                  />
                </div>

                {/* Botón de Envío */}
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="text-xl mr-2">🎁</span>
                  ¡Enviar Propina!
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
