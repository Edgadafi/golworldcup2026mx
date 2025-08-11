"use client";

import Navbar from "../components/Navbar";

const merchants = [
  { emoji: "🌮", name: "Tacos El Parnita", area: "Roma Norte", tags: ["USDC", "Crypto Friendly"], rating: "4.9" },
  { emoji: "☕", name: "Café Blend", area: "Polanco", tags: ["Pioneer"], rating: "4.8" },
  { emoji: "🍺", name: "Bar Oriente", area: "Centro", tags: ["Happy Hour"], rating: "4.7" },
  { emoji: "🏨", name: "Hotel Boutique", area: "Roma Norte", tags: ["Turista"], rating: "4.9" },
];

export default function MerchantsPage() {
  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(135deg, #00C851 0%, #FF6B35 30%, #1DA1F2 70%, #6C5CE7 100%)' }}>
      <Navbar />
      <main className="px-6 py-16 max-w-7xl mx-auto">
        <h1 className="text-4xl font-black mb-8">Directorio de Merchants</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {merchants.map((m) => (
            <div key={m.name} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
              <div className="w-full h-32 rounded-xl mb-4 flex items-center justify-center bg-black/20">
                <span className="text-5xl">{m.emoji}</span>
              </div>
              <h3 className="text-xl font-bold">{m.name}</h3>
              <p className="text-white/70 text-sm">{m.area} • ⭐ {m.rating}</p>
              <div className="mt-3 flex gap-2 flex-wrap">
                {m.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/20">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}




