'use client';

import Link from 'next/link';
import ConnectWalletButton from './ConnectWalletButton';

export default function Navbar() {
  return (
    <nav className="relative z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20">
            <span className="text-2xl">⚡</span>
          </div>
          <div>
            <h1 className="text-xl font-black">Pa$e A Gol</h1>
            <p className="text-xs text-white/80">CDMX • Mundial 2026</p>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="#features" className="hover:text-orange-300 transition-colors">Features</Link>
          <Link href="/merchants" className="hover:text-orange-300 transition-colors">Merchants</Link>
          <Link href="#about" className="hover:text-orange-300 transition-colors">Mundial 2026</Link>
          <ConnectWalletButton className="bg-white text-black px-4 py-2 rounded-xl font-medium" disconnectedLabel="Conectar" />
        </div>
      </div>
    </nav>
  );
}




