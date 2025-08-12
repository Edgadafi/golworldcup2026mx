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
            <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  👥 Pa$e Grupal
                </h2>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Columna Izquierda - Selección de Usuarios */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">👥 Seleccionar Destinatarios</h3>
                  
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {availableUsers.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => handleUserToggle(user)}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedUsers.find(u => u.id === user.id)
                            ? 'border-green-500 bg-green-100'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{user.avatar}</div>
                          <div>
                            <div className="font-semibold text-gray-800">{user.name}</div>
                            <div className="text-sm text-gray-600">{user.username}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Resumen de Usuarios Seleccionados */}
                  {selectedUsers.length > 0 && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">Usuarios Seleccionados:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedUsers.map((user) => (
                          <span
                            key={user.id}
                            className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-sm flex items-center gap-1"
                          >
                            {user.avatar} {user.name}
                            <button
                              onClick={() => handleUserToggle(user)}
                              className="text-green-600 hover:text-green-800"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Columna Derecha - Configuración */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">💰 Configuración del Pa$e</h3>
                  
                  {/* Montos Rápidos */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      💰 Monto por Usuario
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
                  <div className="mb-4">
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
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      💬 Concepto (opcional)
                    </label>
                    <Input
                      type="text"
                      value={concept}
                      onChange={(e) => setConcept(e.target.value)}
                      placeholder="Pa$e grupal para el equipo"
                      className="text-lg"
                    />
                  </div>

                  {/* Total */}
                  {selectedUsers.length > 0 && (customAmount || selectedAmount) && (
                    <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-center">
                        <h4 className="font-bold text-blue-800 text-lg">Total del Pa$e Grupal</h4>
                        <div className="text-2xl font-bold text-blue-600">${getTotalAmount().toFixed(2)}</div>
                        <p className="text-blue-600 text-sm">
                          {customAmount || selectedAmount} × {selectedUsers.length} persona{selectedUsers.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Botón de Envío */}
                  <Button
                    onClick={handleSubmit}
                    disabled={selectedUsers.length === 0 || (!customAmount && !selectedAmount)}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                  >
                    🚀 ¡Pa$e Grupal!
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
