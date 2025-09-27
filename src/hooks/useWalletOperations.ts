import { useState } from 'react';
import { useWalletContext } from '@/contexts/WalletContext';
import { toast } from '@/hooks/use-toast';

interface BookingTransaction {
  propertyId: string;
  amount: number;
  dates: {
    checkIn: string;
    checkOut: string;
  };
  landlordAddress: string;
}

export const useWalletOperations = () => {
  const { wallet, account, connected, wallets, connectWallet, disconnectWallet } = useWalletContext();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConnectWallet = async () => {
    try {
      setIsProcessing(true);
      if (!connected && wallets.length > 0) {
        // Connect to the first available wallet
        await connectWallet({ wallet: wallets[0] });
        toast({
          title: "Wallet Connected",
          description: "Successfully connected to your Sui wallet",
        });
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDisconnectWallet = async () => {
    try {
      setIsProcessing(true);
      await disconnectWallet();
      toast({
        title: "Wallet Disconnected",
        description: "Successfully disconnected from wallet",
      });
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      toast({
        title: "Disconnection Failed",
        description: "Failed to disconnect wallet.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const createBookingTransaction = async (booking: BookingTransaction) => {
    if (!connected || !account) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to continue",
        variant: "destructive",
      });
      return null;
    }

    try {
      setIsProcessing(true);
      
      // Simulate NFT minting transaction
      const mockTransaction = {
        digest: `0x${Math.random().toString(16).substr(2, 9).padStart(64, '0')}`,
        effects: {
          created: [{
            objectId: `0x${Math.random().toString(16).substr(2, 9).padStart(64, '0')}`,
            owner: { AddressOwner: account.address }
          }]
        }
      };

      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const receipt = {
        id: mockTransaction.effects.created[0].objectId,
        transactionDigest: mockTransaction.digest,
        propertyId: booking.propertyId,
        tenant: account.address,
        landlord: booking.landlordAddress,
        amount: booking.amount,
        checkIn: booking.dates.checkIn,
        checkOut: booking.dates.checkOut,
        timestamp: new Date().toISOString(),
        status: 'confirmed'
      };

      toast({
        title: "Booking Confirmed",
        description: "Your NFT receipt has been minted successfully!",
      });

      return receipt;
    } catch (error) {
      console.error('Transaction failed:', error);
      toast({
        title: "Transaction Failed",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    wallet: {
      connected,
      account: account,
    },
    isProcessing,
    connectWallet: handleConnectWallet,
    disconnectWallet: handleDisconnectWallet,
    createBookingTransaction,
  };
};