'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WorldCupBadge } from './components/layout/WorldCupBadge';
import { MexicanFlag } from './components/animations/MexicanFlag';
import { StatsCard } from './components/dashboard/StatsCard';
import { TransferForm } from './components/transfer/TransferForm';
import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';
import { CelebrationEffect } from './components/animations/CelebrationEffect';
import { FloatingMoney } from './components/animations/FloatingMoney';
import { PaseRapidoModal } from './components/quick-actions/PaseRapidoModal';
import { PaseGrupalModal } from './components/quick-actions/PaseGrupalModal';
import { PropinaModal } from './components/quick-actions/PropinaModal';
import { MercadoPrediccionesModal } from './components/quick-actions/MercadoPrediccionesModal';

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

export default function HomePage() {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [daysToWorldCup, setDaysToWorldCup] = useState(getDaysToWorldCup());
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Estados para las funcionalidades rápidas
  const [isPaseRapidoOpen, setIsPaseRapidoOpen] = useState(false);
  const [isPaseGrupalOpen, setIsPaseGrupalOpen] = useState(false);
  const [isPropinaOpen, setIsPropinaOpen] = useState(false);
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
        setIsPropinaOpen(true);
        break;
      case 'Mercado':
        setIsMercadoOpen(true);
        break;
      default:
        console.log(`Acción rápida: ${action}`);
    }
  };

  // Función para manejar el éxito de transferencia (se puede usar en el futuro)
  const handleTransferSuccess = () => {
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            {/* Logo y título */}
            <div className="flex items-center space-x-4">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                Pa$e a Gol
              </motion.h1>
              
              {/* Emoji ⚽ rotativo */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="text-4xl"
              >
                ⚽
              </motion.div>
            </div>

            {/* Controles de sonido y bandera */}
            <div className="flex items-center space-x-4">
              <div className="text-sm text-center">
                <p className="font-semibold">Sonido</p>
                <p className="text-yellow-200">🔊 ON</p>
              </div>
              <MexicanFlag />
            </div>
          </div>

          {/* World Cup Badge */}
          <div className="flex justify-center">
            <WorldCupBadge />
          </div>

          {/* Contador de días al Mundial */}
          <motion.div 
            className="text-center mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-lg text-yellow-200">
              🏆 Mundial 2026 en {daysToWorldCup} días
            </p>
          </motion.div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Sección de Estadísticas */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              🏆 Tu Desempeño en la Cancha
            </h2>
            <p className="text-gray-600">Estadísticas de tus transferencias</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockStats.map((stat, index) => (
              <StatsCard
                key={stat.title}
                {...stat}
                delay={index}
              />
            ))}
          </div>
        </section>

        {/* Acciones Rápidas */}
        <section className="mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-2xl font-bold text-gray-800 mb-6 text-center"
          >
            🚀 Acciones Rápidas
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🚀', title: 'Pa$e Rápido', description: 'Transferencia instantánea' },
              { icon: '👥', title: 'Pa$e Grupal', description: 'Enviar a múltiples usuarios' },
              { icon: '🎁', title: 'Propina', description: 'Dar propina fácilmente' },
              { icon: '📊', title: 'Mercado', description: 'Predicciones deportivas' }
            ].map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  className="p-6 text-center cursor-pointer hover:shadow-lg transition-all duration-300 bg-white border-2 border-green-200 hover:border-green-400"
                  onClick={() => handleQuickAction(action.title)}
                >
                  <div className="text-4xl mb-4">{action.icon}</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{action.title}</h4>
                  <p className="text-gray-600">{action.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Actividad Reciente */}
        <section className="mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-2xl font-bold text-gray-800 mb-6 text-center"
          >
            📊 Actividad Reciente
          </motion.h3>

          <Card className="p-6 bg-white">
            <div className="space-y-4">
              {mockTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {transaction.type === 'success' ? '✅' : '⏳'}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-800">
                        ¡GOL! Pa$e a {transaction.user}
                      </p>
                      <p className="text-sm text-gray-600">{transaction.message}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{transaction.amount}</p>
                    <p className="text-xs text-gray-500">{transaction.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </section>
      </main>

      {/* FAB - Floating Action Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          damping: 15, 
          stiffness: 200,
          delay: 1 
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => setIsTransferModalOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <span className="text-2xl">📤</span>
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
        onSuccess={(amount, recipient, concept) => {
          console.log(`Pa$e rápido enviado: $${amount} a ${recipient}`);
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 3000);
        }}
      />

      <PaseGrupalModal
        isOpen={isPaseGrupalOpen}
        onClose={() => setIsPaseGrupalOpen(false)}
        onSuccess={(amount, users, concept) => {
          console.log(`Pa$e grupal enviado: $${amount} a ${users.length} usuarios`);
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 3000);
        }}
      />

      <PropinaModal
        isOpen={isPropinaOpen}
        onClose={() => setIsPropinaOpen(false)}
        onSuccess={(amount, recipient, category, message) => {
          console.log(`Propina enviada: $${amount} a ${recipient} por ${category}`);
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 3000);
        }}
      />

      <MercadoPrediccionesModal
        isOpen={isMercadoOpen}
        onClose={() => setIsMercadoOpen(false)}
        onBuy={(predictionId, price) => {
          console.log(`Predicción comprada: ${predictionId} por $${price}`);
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 3000);
        }}
        onSell={(predictionId, price) => {
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
