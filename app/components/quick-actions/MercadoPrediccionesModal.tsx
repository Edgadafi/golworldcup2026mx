'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface Prediction {
  id: string;
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
}

interface MercadoPrediccionesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuy: (predictionId: string, price: number) => void;
  onSell: (predictionId: string, price: number) => void;
}

export function MercadoPrediccionesModal({ isOpen, onClose, onBuy, onSell }: MercadoPrediccionesModalProps) {
  const [activeTab, setActiveTab] = useState<'market' | 'my-predictions'>('market');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Predicciones del mercado
  const marketPredictions: Prediction[] = [
    {
      id: '1',
      match: 'PSG vs Manchester City',
      prediction: 'Victoria Local',
      odds: 2.8,
      price: 25,
      available: 89,
      total: 100,
      creator: '@ProPredictor',
      accuracy: 89,
      followers: 456,
      status: 'active'
    },
    {
      id: '2',
      match: 'Liverpool vs Arsenal',
      prediction: 'Más de 2.5 goles',
      odds: 3.1,
      price: 35,
      available: 67,
      total: 150,
      creator: '@FootballGuru',
      accuracy: 92,
      followers: 1200,
      status: 'active'
    },
    {
      id: '3',
      match: 'Barcelona vs Real Madrid',
      prediction: 'Empate',
      odds: 2.5,
      price: 20,
      available: 45,
      total: 80,
      creator: '@LaLigaExpert',
      accuracy: 87,
      followers: 890,
      status: 'active'
    }
  ];

  // Mis predicciones en venta
  const myPredictions: Prediction[] = [
    {
      id: '4',
      match: 'Real Madrid vs Bayern Munich',
      prediction: 'Victoria Visitante',
      odds: 2.5,
      price: 30,
      available: 77,
      total: 100,
      creator: 'Tú',
      accuracy: 85,
      followers: 0,
      status: 'active'
    }
  ];

  const filteredPredictions = marketPredictions.filter(pred => 
    pred.match.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pred.creator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBuy = (predictionId: string, price: number) => {
    onBuy(predictionId, price);
  };

  const handleSell = (predictionId: string, price: number) => {
    onSell(predictionId, price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won': return 'bg-green-100 text-green-800 border-green-200';
      case 'lost': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'won': return 'Ganada';
      case 'lost': return 'Perdida';
      default: return 'En juego';
    }
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
            <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  📊 Mercado de Predicciones
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Estadísticas del Mercado */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                  <div className="text-2xl font-bold text-blue-600">1,247</div>
                  <div className="text-sm text-gray-600">Predicciones Activas</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                  <div className="text-2xl font-bold text-green-600">$45,680</div>
                  <div className="text-sm text-gray-600">Pool Total</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                  <div className="text-2xl font-bold text-purple-600">68%</div>
                  <div className="text-sm text-gray-600">Tasa de Éxito</div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('market')}
                  className={`flex-1 py-2 px-4 rounded-md transition-all ${
                    activeTab === 'market'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  🏪 Mercado
                </button>
                <button
                  onClick={() => setActiveTab('my-predictions')}
                  className={`flex-1 py-2 px-4 rounded-md transition-all ${
                    activeTab === 'my-predictions'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  📈 Mis Predicciones
                </button>
              </div>

              {/* Búsqueda */}
              <div className="mb-6">
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="🔍 Buscar predicciones o creadores..."
                  className="text-lg"
                />
              </div>

              {/* Contenido de los Tabs */}
              {activeTab === 'market' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">🔥 Predicciones Populares</h3>
                  
                  <div className="space-y-4">
                    {filteredPredictions.map((prediction) => (
                      <div key={prediction.id} className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-bold text-gray-800">{prediction.match}</h4>
                            <p className="text-gray-600">{prediction.prediction}</p>
                          </div>
                          <div className="text-right">
                            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                              {prediction.odds}x
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div className="text-center">
                            <div className="text-sm text-gray-600">Creador</div>
                            <div className="font-semibold">{prediction.creator}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-600">Precisión</div>
                            <div className="font-semibold text-green-600">{prediction.accuracy}%</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-600">Seguidores</div>
                            <div className="font-semibold">{prediction.followers}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-600">Disponibles</div>
                            <div className="font-semibold">{prediction.available}/{prediction.total}</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-center">
                            <div className="text-sm text-gray-600">Precio</div>
                            <div className="text-xl font-bold text-green-600">${prediction.price}</div>
                          </div>
                          <Button
                            onClick={() => handleBuy(prediction.id, prediction.price)}
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
                          >
                            💰 Comprar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'my-predictions' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">💰 Mis Predicciones en Venta</h3>
                  
                  <div className="space-y-4">
                    {myPredictions.map((prediction) => (
                      <div key={prediction.id} className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-bold text-gray-800">{prediction.match}</h4>
                            <p className="text-gray-600">{prediction.prediction}</p>
                          </div>
                          <div className="text-right">
                            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
                              {prediction.odds}x
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div className="text-center">
                            <div className="text-sm text-gray-600">Estado</div>
                            <div className={`px-2 py-1 rounded-full text-xs font-bold border ${getStatusColor(prediction.status)}`}>
                              {getStatusText(prediction.status)}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-600">Vendidas</div>
                            <div className="font-semibold text-green-600">{prediction.total - prediction.available}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-600">Disponibles</div>
                            <div className="font-semibold">{prediction.available}/{prediction.total}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-600">Ganancias</div>
                            <div className="font-semibold text-green-600">${(prediction.total - prediction.available) * prediction.price}</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-center">
                            <div className="text-sm text-gray-600">Precio</div>
                            <div className="text-xl font-bold text-green-600">${prediction.price}</div>
                          </div>
                          <Button
                            onClick={() => handleSell(prediction.id, prediction.price)}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
                          >
                            ❌ Retirar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
