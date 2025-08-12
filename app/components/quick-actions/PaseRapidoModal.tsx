'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface PaseRapidoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number, recipient: string, concept: string) => void;
}

export function PaseRapidoModal({ isOpen, onClose, onSuccess }: PaseRapidoModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [concept, setConcept] = useState<string>('');

  const quickAmounts = [50, 100, 200, 500];

  const handleAmountSelect = (amount: number) => {
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
      alert('Por favor selecciona un monto válido');
      return;
    }

    onSuccess(amount, recipient, concept);
    handleClose();
  };

  const handleClose = () => {
    setSelectedAmount(0);
    setCustomAmount('');
    setRecipient('');
    setConcept('');
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
                  ⚡ Pa$e Rápido
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
                    placeholder="@usuario"
                    className="text-lg"
                  />
                </div>

                {/* Montos Rápidos */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    💰 Monto Rápido
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {quickAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => handleAmountSelect(amount)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedAmount === amount
                            ? 'border-green-500 bg-green-100 text-green-700'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        ${amount}
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

                {/* Concepto */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    💬 Concepto (opcional)
                  </label>
                  <Input
                    type="text"
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    placeholder="Transferencia instantánea"
                    className="text-lg"
                  />
                </div>

                {/* Botón de Envío */}
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  🚀 ¡Pa$e Rápido!
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
