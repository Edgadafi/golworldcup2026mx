'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

interface PaseGrupalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number, users: User[], concept: string) => void;
}

export function PaseGrupalModal({ isOpen, onClose, onSuccess }: PaseGrupalModalProps) {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [concept, setConcept] = useState<string>('');

  const quickAmounts = [50, 100, 200, 500];

  // Usuarios de ejemplo
  const availableUsers: User[] = [
    { id: '1', name: 'Chicharito', username: '@chicharito', avatar: '⚽' },
    { id: '2', name: 'Vibora', username: '@vibora', avatar: '🐍' },
    { id: '3', name: 'Tata', username: '@tata', avatar: '👨‍💼' },
    { id: '4', name: 'Pulga', username: '@pulga', avatar: '🦗' },
    { id: '5', name: 'Güero', username: '@guero', avatar: '👱‍♂️' },
    { id: '6', name: 'Chucky', username: '@chucky', avatar: '👻' },
  ];

  const handleUserToggle = (user: User) => {
    setSelectedUsers(prev => 
      prev.find(u => u.id === user.id)
        ? prev.filter(u => u.id !== user.id)
        : [...prev, user]
    );
  };

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
    
    if (selectedUsers.length === 0) {
      alert('Por favor selecciona al menos un destinatario');
      return;
    }
    
    if (!amount || amount <= 0) {
      alert('Por favor selecciona un monto válido');
      return;
    }

    onSuccess(amount, selectedUsers, concept);
    handleClose();
  };

  const handleClose = () => {
    setSelectedUsers([]);
    setSelectedAmount(0);
    setCustomAmount('');
    setConcept('');
    onClose();
  };

  const getTotalAmount = () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    return amount * selectedUsers.length;
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
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="p-8 bg-white border-0 shadow-2xl rounded-2xl overflow-hidden relative">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50" />
              
              {/* Header */}
              <div className="relative z-10 flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl">👥</span>
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Pa$e Grupal
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
                {/* Usuarios Seleccionados */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      👥
                    </span>
                    Usuarios Seleccionados
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {availableUsers.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => handleUserToggle(user)}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 flex items-center space-x-2 ${
                          selectedUsers.find(u => u.id === user.id)
                            ? 'border-blue-500 bg-blue-500 text-white shadow-lg shadow-blue-200'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700'
                        }`}
                      >
                        <span className="text-lg">{user.avatar}</span>
                        <span className="font-medium">{user.name}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {selectedUsers.length} usuarios seleccionados
                  </p>
                </div>

                {/* Monto por Usuario */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      💰
                    </span>
                    Monto por Usuario
                  </label>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {quickAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => handleAmountSelect(amount)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 font-semibold ${
                          selectedAmount === amount
                            ? 'border-green-500 bg-green-500 text-white shadow-lg shadow-green-200'
                            : 'border-gray-200 hover:border-green-300 hover:bg-green-50 text-gray-700'
                        }`}
                      >
                        ${amount}
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

                {/* Concepto */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      💬
                    </span>
                    Concepto (opcional)
                  </label>
                  <Input
                    type="text"
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    placeholder="Pa$e grupal"
                    className="text-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                  />
                </div>

                {/* Resumen */}
                {selectedUsers.length > 0 && (
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-blue-700">
                        Total a enviar:
                      </span>
                      <span className="text-lg font-bold text-blue-800">
                        ${(customAmount ? parseFloat(customAmount) : selectedAmount) * selectedUsers.length}
                      </span>
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      {selectedUsers.length} usuarios × ${customAmount ? parseFloat(customAmount) : selectedAmount}
                    </div>
                  </div>
                )}

                {/* Botón de Envío */}
                <Button
                  onClick={handleSubmit}
                  disabled={selectedUsers.length === 0}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:transform-none"
                >
                  <span className="text-xl mr-2">👥</span>
                  ¡Pa$e Grupal!
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
