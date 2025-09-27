import React, { createContext, useContext, ReactNode } from 'react';
import { 
  createNetworkConfig, 
  SuiClientProvider, 
  WalletProvider as SuiWalletProvider,
  useCurrentWallet,
  useSignTransaction,
  useConnectWallet,
  useDisconnectWallet,
  useCurrentAccount,
  useWallets
} from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';

// Configure Sui networks
const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl('localnet') },
  testnet: { url: getFullnodeUrl('testnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
});

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  return (
    <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
      <SuiWalletProvider>
        {children}
      </SuiWalletProvider>
    </SuiClientProvider>
  );
};

// Custom hook to use wallet context with simplified interface
export const useWalletContext = () => {
  const currentWallet = useCurrentWallet();
  const currentAccount = useCurrentAccount();
  const wallets = useWallets();
  const { mutateAsync: connectWallet } = useConnectWallet();
  const { mutateAsync: disconnectWallet } = useDisconnectWallet();
  const { mutateAsync: signTransaction } = useSignTransaction();

  return {
    wallet: currentWallet,
    account: currentAccount,
    wallets,
    connected: currentWallet.isConnected,
    connectWallet,
    disconnectWallet,
    signTransaction,
  };
};

// Helper functions for wallet operations
export const formatAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const isWalletConnected = (connected: boolean) => {
  return connected;
};