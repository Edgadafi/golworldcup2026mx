'use client';

import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Avatar, Name } from '@coinbase/onchainkit/identity';

type Props = {
  className?: string;
  disconnectedLabel?: string;
};

export default function ConnectWalletButton({ className, disconnectedLabel }: Props) {
  const baseClasses =
    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm ring-1 ring-black/10 dark:ring-white/15";
  const defaultGradient = "bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700";

  return (
    <ConnectWallet
      disconnectedLabel={disconnectedLabel ?? 'Conectar wallet'}
      className={className ? `${baseClasses} ${className}` : `${baseClasses} ${defaultGradient}`}
    >
      <Avatar className="h-5 w-5" />
      <Name className="hidden sm:inline" />
    </ConnectWallet>
  );
}


