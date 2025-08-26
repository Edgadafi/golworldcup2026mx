'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface Prediction {
  id: string;
  sport: string;
  match: string;
  prediction: string;
  odds: number;
  price: number;
  available: number;
  total: number;
  creator: string;
  accuracy: number;
  followers: number;
  status: 'active' | 'won' | 'lost';
  deadline: string;
}

interface MercadoPrediccionesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuy: (predictionId: string, price: number) => void;
  onSell: (predictionId: string, price: number) => void;
}

export function MercadoPrediccionesModal({ isOpen, onClose, onBuy, onSell }: MercadoPrediccionesModalProps) {
  const [activeTab, setActiveTab] = useState<'Mercado' | 'Mis Predicciones'>('Mercado');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Predicciones del mercado
  const marketPredictions: Prediction[] = [
    {
      id: '1',
      sport: '⚽ Fútbol',
      match: 'PSG vs Manchester City',
      prediction: 'Victoria Local',
      odds: 2.8,
      price: 25,
      available: 89,
      total: 100,
      creator: '@ProPredictor',
      accuracy: 89,
      followers: 456,
      status: 'active',
      deadline: '2024-12-20'
    },
    {
      id: '2',
      sport: '⚽ Fútbol',
      match: 'Liverpool vs Arsenal',
      prediction: 'Más de 2.5 goles',
      odds: 3.1,
      price: 35,
      available: 67,
      total: 150,
      creator: '@FootballGuru',
      accuracy: 92,
      followers: 1200,
      status: 'active',
      deadline: '2024-12-22'
    },
    {
      id: '3',
      sport: '⚽ Fútbol',
      match: 'Barcelona vs Real Madrid',
      prediction: 'Empate',
      odds: 2.5,
      price: 20,
      available: 45,
      total: 80,
      creator: '@LaLigaExpert',
      accuracy: 87,
      followers: 890,
      status: 'active',
      deadline: '2024-12-25'
    }
  ];

  // Mis predicciones en venta
  const myPredictions: Prediction[] = [
    {
      id: '4',
      sport: '⚽ Fútbol',
      match: 'Real Madrid vs Bayern Munich',
      prediction: 'Victoria Visitante',
      odds: 2.5,
      price: 30,
      available: 77,
      total: 100,
      creator: 'Tú',
      accuracy: 85,
      followers: 0,
      status: 'active',
      deadline: '2024-12-28'
    }
  ];

  const filteredPredictions = (activeTab === 'Mercado' ? marketPredictions : myPredictions).filter(pred => 
    pred.match.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pred.creator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBuy = (predictionId: string, price: number) => {
    onBuy(predictionId, price);
  };

  const handleSell = (predictionId: string, price: number) => {
    onSell(predictionId, price);
  };



  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="p-8 bg-white border-0 shadow-2xl rounded-2xl overflow-hidden relative">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-red-50 to-amber-50" />
              
              {/* Header */}
              <div className="relative z-10 flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Mercado de Predicciones
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <span className="text-lg font-semibold text-gray-600">✕</span>
                </button>
              </div>

              {/* Tabs */}
              <div className="relative z-10 mb-6">
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
                  {['Mercado', 'Mis Predicciones'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                        activeTab === tab
                          ? 'bg-white text-orange-600 shadow-md'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative z-10 mb-6">
                <div className="relative">
                  <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar predicciones..."
                    className="pl-10 text-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                  </span>
                </div>
              </div>

              {/* Market Stats */}
              <div className="relative z-10 mb-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 text-center">
                    <div className="text-2xl font-bold text-green-600">24</div>
                    <div className="text-sm text-green-700">Predicciones Activas</div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200 text-center">
                    <div className="text-2xl font-bold text-blue-600">$12.5K</div>
                    <div className="text-sm text-blue-700">Volumen Total</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200 text-center">
                    <div className="text-2xl font-bold text-purple-600">89%</div>
                    <div className="text-sm text-purple-700">Tasa de Éxito</div>
                  </div>
                </div>
              </div>

              {/* Predictions List */}
              <div className="relative z-10 space-y-4 max-h-96 overflow-y-auto">
                {filteredPredictions.map((prediction) => (
                  <div
                    key={prediction.id}
                    className="bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-orange-200 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg">{prediction.sport}</span>
                          <span className="text-sm bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                            {prediction.odds}
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          {prediction.match}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {prediction.prediction}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>💰 ${prediction.price}</span>
                          <span>👤 {prediction.creator}</span>
                          <span>📅 {prediction.deadline}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button
                        onClick={() => handleBuy(prediction.id, prediction.price)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                      >
                        🟢 Comprar
                      </Button>
                      <Button
                        onClick={() => handleSell(prediction.id, prediction.price)}
                        className="flex-1 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                      >
                        🔴 Retirar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
