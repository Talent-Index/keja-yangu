import React, { createContext, useContext, ReactNode } from 'react';
import {
  WalletProvider as SuiWalletProvider,
  useWallet,
  WalletContextState,
} from '@mysten/wallet-adapter-react';
import { SuiWallet } from '@mysten/wallet-adapter-sui-wallet';

// Configure available wallets
const wallets = [
  new SuiWallet(),
];

interface WalletProviderProps {
  children: ReactNode;
}

// Create the wallet context
const WalletContext = createContext<WalletContextState | null>(null);

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  return (
    <SuiWalletProvider wallets={wallets} autoConnect>
      {children}
    </SuiWalletProvider>
  );
};

// Custom hook to use wallet context
export const useWalletContext = () => {
  return useWallet();
};

// Helper functions for wallet operations
export const formatAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const isWalletConnected = (wallet: WalletContextState) => {
  return wallet.connected && wallet.account?.address;
};