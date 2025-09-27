import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet, Menu, X, LogOut } from "lucide-react";
import { useWalletOperations } from "@/hooks/useWalletOperations";
import { formatAddress } from "@/contexts/WalletContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { wallet, isProcessing, connectWallet, disconnectWallet } = useWalletOperations();
  
  const walletConnected = wallet.connected;
  const walletAddress = wallet.account?.address;

  const navItems = [
    { href: "/", label: "Properties" },
    { href: "/bookings", label: "My Bookings" },
    { href: "/verify", label: "Verify Receipt" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">K</span>
            </div>
            <span className="font-bold text-xl text-foreground">KejaYangu</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Wallet Connection */}
          <div className="hidden md:flex items-center space-x-4">
            {walletConnected ? (
              <div className="flex items-center space-x-2">
                <div className="px-3 py-1 bg-muted rounded-lg">
                  <span className="text-sm font-mono">
                    {formatAddress(walletAddress!)}
                  </span>
                </div>
                <Button
                  onClick={disconnectWallet}
                  variant="ghost"
                  size="sm"
                  disabled={isProcessing}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={connectWallet}
                variant="outline"
                size="sm"
                disabled={isProcessing}
                className="flex items-center space-x-2"
              >
                <Wallet className="h-4 w-4" />
                <span>
                  {isProcessing ? "Connecting..." : "Connect Wallet"}
                </span>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {walletConnected ? (
                <div className="flex flex-col space-y-2">
                  <div className="px-3 py-1 bg-muted rounded-lg">
                    <span className="text-sm font-mono">
                      {formatAddress(walletAddress!)}
                    </span>
                  </div>
                  <Button
                    onClick={disconnectWallet}
                    variant="ghost"
                    size="sm"
                    disabled={isProcessing}
                    className="flex items-center space-x-2 w-fit"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Disconnect</span>
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={connectWallet}
                  variant="outline"
                  size="sm"
                  disabled={isProcessing}
                  className="flex items-center space-x-2 w-fit"
                >
                  <Wallet className="h-4 w-4" />
                  <span>
                    {isProcessing ? "Connecting..." : "Connect Wallet"}
                  </span>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;