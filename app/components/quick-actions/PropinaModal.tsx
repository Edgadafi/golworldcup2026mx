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
            <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  💝 Propina
                </h2>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Form */}
              <div className="space-y-4">
                {/* Destinatario */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    👤 Destinatario
                  </label>
                  <Input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="@usuario o nombre"
                    className="text-lg"
                  />
                </div>

                {/* Categoría */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🏷️ Categoría
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 transition-colors"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Opciones de Propina */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    💰 Opciones de Propina
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {tipOptions.map((tip) => (
                      <button
                        key={tip.amount}
                        onClick={() => handleTipSelect(tip.amount)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedAmount === tip.amount
                            ? 'border-green-500 bg-green-100 text-green-700'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">{tip.emoji}</div>
                          <div className="font-bold">${tip.amount}</div>
                          <div className="text-xs text-gray-600">{tip.label}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Monto Personalizado */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    💰 Monto Personalizado
                  </label>
                  <Input
                    type="number"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    placeholder="0.00"
                    className="text-lg"
                  />
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    💬 Mensaje (opcional)
                  </label>
                  <Input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="¡Excelente servicio!"
                    className="text-lg"
                  />
                </div>

                {/* Botón de Envío */}
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  💝 ¡Enviar Propina!
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
