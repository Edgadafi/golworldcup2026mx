'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WorldCupBadge } from './layout/WorldCupBadge';
import { MexicanFlag } from './animations/MexicanFlag';
import { StatsCard } from './dashboard/StatsCard';
import { TransferForm } from './transfer/TransferForm';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { CelebrationEffect } from './animations/CelebrationEffect';
import { FloatingMoney } from './animations/FloatingMoney';
import { PaseRapidoModal } from './quick-actions/PaseRapidoModal';
import { PaseGrupalModal } from './quick-actions/PaseGrupalModal';
import { MercadoPrediccionesModal } from './quick-actions/MercadoPrediccionesModal';
import { useFarcasterSDK } from '../hooks/useFarcasterSDK';

// Datos mock para las estadísticas
const mockStats = [
  {
    title: 'Pa$es Completados',
    value: '127',
    icon: '⚽',
    subtitle: 'Transferencias exitosas',
    trend: 'up' as const,
    pulse: true
  },
  {
    title: 'Efectividad',
    value: '98%',
    icon: '🎯',
    subtitle: 'Tasa de éxito',
    trend: 'up' as const
  },
  {
    title: 'Velocidad',
    value: '2.3s',
    icon: '🚀',
    subtitle: 'Tiempo promedio',
    trend: 'down' as const
  },
  {
    title: 'Saldo',
    value: '$15,420 MXN',
    icon: '💰',
    subtitle: 'Disponible',
    trend: 'neutral' as const
  }
];

// Datos mock para actividad reciente
const mockTransactions = [
  { id: 1, type: 'success', user: '@chicharito', amount: '$500', message: '¡GOL! 🎉', time: '2 min' },
  { id: 2, type: 'pending', user: '@vibora', amount: '$1,200', message: 'Para la birria', time: '5 min' },
  { id: 3, type: 'success', user: '@tata', amount: '$800', message: '¡Pa$e a gol!', time: '12 min' },
  { id: 4, type: 'success', user: '@pulga', amount: '$300', message: 'Propina', time: '18 min' }
];

// Cálculo de días al Mundial 2026
const getDaysToWorldCup = () => {
  const worldCupDate = new Date('2026-06-11');
  const today = new Date();
  const diffTime = worldCupDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

export default function HomePageClient() {
  // Initialize Farcaster SDK
  const { sdk, isReady, callReady } = useFarcasterSDK();
  
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [daysToWorldCup, setDaysToWorldCup] = useState(getDaysToWorldCup());
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Estados para las funcionalidades rápidas
  const [isPaseRapidoOpen, setIsPaseRapidoOpen] = useState(false);
  const [isPaseGrupalOpen, setIsPaseGrupalOpen] = useState(false);
  const [isMercadoOpen, setIsMercadoOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setDaysToWorldCup(getDaysToWorldCup());
    }, 60000); // Actualizar cada minuto

    return () => clearInterval(timer);
  }, []);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'Pa$e Rápido':
        setIsPaseRapidoOpen(true);
        break;
      case 'Pa$e Grupal':
        setIsPaseGrupalOpen(true);
        break;
      case 'Propina':
        break;
      case 'Mercado':
        setIsMercadoOpen(true);
        break;
      default:
        console.log(`Acción rápida: ${action}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Optimizado para móvil */}
      <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-4 shadow-lg">
        <div className="w-full">
          {/* Logo y título centrado */}
          <div className="flex flex-col items-center mb-4">
            <motion.h1 
              className="text-3xl font-bold text-white text-center mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Pa$e a Gol ⚽
            </motion.h1>
            
            {/* Contador de días al Mundial */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm text-yellow-200">
                🏆 Mundial 2026 en {daysToWorldCup} días
              </p>
            </motion.div>
          </div>

          {/* World Cup Badge centrado */}
          <div className="flex justify-center">
            <WorldCupBadge />
          </div>
        </div>
      </header>

      {/* Contenido principal - Optimizado para móvil */}
      <main className="w-full px-4 py-6">
        {/* Sección de Estadísticas */}
        <section className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              🏆 Tu Desempeño
            </h2>
            <p className="text-gray-600 text-sm">Estadísticas de transferencias</p>
          </motion.div>

          <div className="grid grid-cols-2 gap-3">
            {mockStats.map((stat, index) => (
              <StatsCard
                key={stat.title}
                {...stat}
                delay={index}
              />
            ))}
          </div>
        </section>

        {/* Acciones Rápidas - Optimizado para móvil */}
        <section className="mb-8">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-2xl font-bold text-gray-800 mb-6 text-center"
          >
            🚀 Acciones Rápidas
          </motion.h3>

          <div className="grid grid-cols-2 gap-4">
            {[
              { 
                icon: '🚀', 
                title: 'Pa$e Rápido', 
                description: 'Transferencia instantánea',
                bgColor: 'bg-green-500',
                hoverColor: 'bg-green-600'
              },
              { 
                icon: '👥', 
                title: 'Pa$e Grupal', 
                description: 'Enviar a múltiples',
                bgColor: 'bg-blue-500',
                hoverColor: 'bg-blue-600'
              },
              { 
                icon: '🎁', 
                title: 'Propina', 
                description: 'Dar propina',
                bgColor: 'bg-purple-500',
                hoverColor: 'bg-purple-600'
              },
              { 
                icon: '📊', 
                title: 'Mercado', 
                description: 'Predicciones',
                bgColor: 'bg-orange-500',
                hoverColor: 'bg-orange-600'
              }
            ].map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-full"
              >
                <Card 
                  className="p-4 text-center cursor-pointer transition-all duration-200 bg-white border-2 border-gray-200 shadow-md active:shadow-lg"
                  onClick={() => handleQuickAction(action.title)}
                >
                  {/* Icon with solid background */}
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${action.bgColor} flex items-center justify-center shadow-sm`}>
                    <span className="text-xl text-white">{action.icon}</span>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 mb-1">
                      {action.title}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {action.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Actividad Reciente - Optimizado para móvil */}
        <section className="mb-8">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-xl font-bold text-gray-800 mb-4 text-center"
          >
            📊 Actividad Reciente
          </motion.h3>

          <Card className="p-4 bg-white border border-gray-200">
            <div className="space-y-3">
              {mockTransactions.slice(0, 3).map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {transaction.type === 'success' ? '✅' : '⏳'}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {transaction.user}
                      </p>
                      <p className="text-xs text-gray-600">{transaction.message}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600 text-sm">{transaction.amount}</p>
                    <p className="text-xs text-gray-500">{transaction.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </section>
      </main>

      {/* FAB - Floating Action Button - Optimizado para móvil */}
      <motion.div
        className="fixed bottom-4 right-4 z-40"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          damping: 15, 
          stiffness: 200,
          delay: 1 
        }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => setIsTransferModalOpen(true)}
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg active:shadow-xl transition-all duration-200"
        >
          <span className="text-xl">📤</span>
        </Button>
      </motion.div>

      {/* Modal TransferForm */}
      <TransferForm
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
      />

      {/* Modales de Funcionalidades Rápidas */}
      <PaseRapidoModal
        isOpen={isPaseRapidoOpen}
        onClose={() => setIsPaseRapidoOpen(false)}
        onSuccess={(amount, recipient) => {
          console.log(`Pa$e rápido enviado: $${amount} a ${recipient}`);
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 3000);
        }}
      />

      <PaseGrupalModal
        isOpen={isPaseGrupalOpen}
        onClose={() => setIsPaseGrupalOpen(false)}
        onSuccess={(amount, users) => {
          console.log(`Pa$e grupal enviado: $${amount} a ${users.length} usuarios`);
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 3000);
        }}
      />

      <MercadoPrediccionesModal
        isOpen={isMercadoOpen}
        onClose={() => setIsMercadoOpen(false)}
        onBuy={(predictionId) => {
          console.log(`Predicción comprada: ${predictionId}`);
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 3000);
        }}
        onSell={(predictionId) => {
          console.log(`Predicción retirada: ${predictionId}`);
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 3000);
        }}
      />

      {/* Celebration Effect Global */}
      <AnimatePresence>
        {showCelebration && (
          <CelebrationEffect isActive={showCelebration} />
        )}
      </AnimatePresence>

      {/* Floating Money Effect Global */}
      <AnimatePresence>
        {showCelebration && (
          <FloatingMoney amount={500} isVisible={showCelebration} />
        )}
      </AnimatePresence>
    </div>
  );
}