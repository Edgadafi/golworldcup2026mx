"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [userCount, setUserCount] = useState(127);
  const [mounted, setMounted] = useState(false);
  const [amount, setAmount] = useState(25);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const fee = amount * 0.02;
  const savings = amount * 0.15 - fee;
  const total = amount + fee;

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsConnecting(false);
  };

  const handleSendDemo = async () => {
    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSending(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen text-white overflow-x-hidden" 
         style={{ 
           background: 'linear-gradient(135deg, #00C851 0%, #FF6B35 30%, #1DA1F2 70%, #6C5CE7 100%)' 
         }}>
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <h1 className="text-xl font-black">FlashSend</h1>
              <p className="text-xs text-white/80">CDMX • Mundial 2026</p>
            </div>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="hover:text-orange-300 transition-colors">Features</a>
            <a href="#merchants" className="hover:text-orange-300 transition-colors">Merchants</a>
            <a href="#about" className="hover:text-orange-300 transition-colors">Mundial 2026</a>
          </div>
        </div>
      </nav>

      <section className="relative px-6 py-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full text-sm backdrop-blur-md border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>Live en Ciudad de México</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-black leading-tight">
                Paga como{' '}
                <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                  local
                </span>
                <br />
                vive como{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  turista
                </span>
              </h1>
              <p className="text-xl text-white/80 max-w-lg">
                Envía dinero instantáneamente a cualquier usuario de Farcaster. 
                Ahorra hasta 15% en comisiones. Lista para el Mundial 2026.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleConnectWallet}
                disabled={isConnecting}
                className="bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl disabled:opacity-50"
                style={{ boxShadow: '0 0 30px rgba(255, 107, 53, 0.3)' }}
              >
                {isConnecting ? '🔗 Conectando...' : '🚀 Empezar Ahora'}
              </button>
              <button className="border-2 border-white/30 px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all">
                📱 Ver Demo
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-black">{userCount}</div>
                <div className="text-sm text-white/70">Usuarios Activos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black">$12.5K</div>
                <div className="text-sm text-white/70">Enviado Hoy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black">47</div>
                <div className="text-sm text-white/70">Merchants</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto w-80 h-[600px] bg-black rounded-[2.5rem] p-2 animate-bounce" 
                 style={{ animationDuration: '3s', animationIterationCount: 'infinite' }}>
              <div className="w-full h-full rounded-[2rem] p-6 overflow-hidden"
                   style={{ 
                     background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #be185d 100%)' 
                   }}>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <span className="text-lg">⚡</span>
                    </div>
                    <div>
                      <div className="font-bold">FlashSend</div>
                      <div className="text-xs text-white/70">Polanco, CDMX</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">$847.50</div>
                    <div className="text-xs text-green-400">+$23 today</div>
                  </div>
                </div>

                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 mb-6">
                  <h3 className="font-bold mb-4">Envío Rápido</h3>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="@username" 
                      className="w-full bg-white/10 rounded-xl px-4 py-3 border border-white/20 focus:border-orange-400 outline-none transition-colors"
                    />
                    <input 
                      type="text" 
                      placeholder="$25.00 USD" 
                      className="w-full bg-white/10 rounded-xl px-4 py-3 border border-white/20 focus:border-orange-400 outline-none transition-colors"
                    />
                    <button className="w-full py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                            style={{ background: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)' }}>
                      Enviar Ahora ⚡
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-white/70">Actividad Reciente</h4>
                  <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-sm">🌮</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">Tacos El Parnita</div>
                      <div className="text-xs text-white/70">$12.50 • Roma Norte</div>
                    </div>
                    <div className="text-green-400 font-semibold">-$0.25</div>
                  </div>
                  <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-sm">🚗</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">Uber Split</div>
                      <div className="text-xs text-white/70">$8.75 • 3 personas</div>
                    </div>
                    <div className="text-blue-400 font-semibold">-$0.18</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="absolute -bottom-20 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-bounce" style={{ animationDelay: '-1s' }}></div>
          </div>
        </div>
      </section>

      <section id="features" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">¿Por qué FlashSend?</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              La única app que necesitas para pagos en CDMX. Crypto-native, social-first, Mundial 2026 ready.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                   style={{ background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)' }}>
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Instant Send</h3>
              <p className="text-white/70 mb-6">
                Envía dinero con solo el @username de Farcaster. Sin números de cuenta, sin apps bancarias.
              </p>
              <div className="text-green-400 font-semibold">Ahorra hasta 15% en fees</div>
            </div>
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                   style={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' }}>
                <span className="text-2xl">🏪</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Crypto Merchants</h3>
              <p className="text-white/70 mb-6">
                Directorio curado de negocios crypto-friendly en Polanco, Roma Norte y Centro.
              </p>
              <div className="text-purple-400 font-semibold">47 merchants y creciendo</div>
            </div>
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                   style={{ background: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)' }}>
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Group Splits</h3>
              <p className="text-white/70 mb-6">
                Divide gastos automáticamente y cobra a cada persona con presión social.
              </p>
              <div className="text-orange-400 font-semibold">Perfect para grupos</div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-black mb-4">Prueba FlashSend Ahora</h2>
              <p className="text-white/80">Simula un envío a cualquier usuario de Farcaster</p>
            </div>
            <div className="max-w-md mx-auto space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Enviar a:</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="@username" 
                    className="w-full bg-white/10 rounded-xl px-4 py-3 pl-12 border border-white/20 focus:border-orange-400 outline-none transition-all"
                  />
                  <span className="absolute left-4 top-3 text-white/50">@</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Cantidad:</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white/10 rounded-xl px-4 py-3 pl-12 border border-white/20 focus:border-orange-400 outline-none transition-all"
                  />
                  <span className="absolute left-4 top-3 text-white/50">$</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Mensaje (opcional):</label>
                <input 
                  type="text" 
                  placeholder="Tacos en Roma Norte 🌮" 
                  className="w-full bg-white/10 rounded-xl px-4 py-3 border border-white/20 focus:border-orange-400 outline-none transition-all"
                />
              </div>
              <div className="bg-black/20 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Envío:</span>
                  <span>${amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Fee FlashSend (2%):</span>
                  <span>${fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-green-400">
                  <span>Ahorras vs bancos:</span>
                  <span>${savings.toFixed(2)}</span>
                </div>
                <hr className="border-white/20" />
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button 
                onClick={handleSendDemo}
                disabled={isSending}
                className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:shadow-xl disabled:opacity-50"
                style={{ 
                  background: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
                  boxShadow: '0 0 30px rgba(255, 107, 53, 0.3)'
                }}
              >
                {isSending ? '⏳ Procesando...' : 
                 isSending === false && mounted ? '✅ Enviado!' : 
                 '🚀 Enviar con FlashSend'}
              </button>
              <div className="text-center text-xs text-white/50">
                Powered by Base • Built on Farcaster • Mundial 2026 Ready
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="px-6 py-20 bg-black/30">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-16">
            <div className="inline-flex items-center space-x-2 bg-green-500/20 text-green-400 px-6 py-3 rounded-full text-lg font-bold mb-6">
              <span>⚽</span>
              <span>Mundial FIFA 2026</span>
            </div>
            <h2 className="text-5xl font-black mb-6">CDMX se Prepara</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              FlashSend está construyendo la infraestructura de pagos crypto que hará de Ciudad de México 
              la capital más tech-forward del Mundial 2026. Únete a la revolución.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '2026', label: 'Mundial FIFA' },
              { number: '3M+', label: 'Turistas Esperados' },
              { number: '$2B', label: 'Impacto Económico' },
              { number: '1st', label: 'Ciudad Crypto-Ready' }
            ].map((stat, index) => (
              <div key={index} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl font-black mb-2">{stat.number}</div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-6 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <h3 className="text-xl font-black">FlashSend CDMX</h3>
              <p className="text-xs text-white/60">Built for Mundial 2026</p>
            </div>
          </div>
          <p className="text-white/50 text-sm">
            Made with ❤️ for crypto tourism • Powered by Base & Farcaster
          </p>
        </div>
      </footer>
    </div>
  );
}
