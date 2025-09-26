import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, MapPin, User, CreditCard, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  bedrooms: number;
  availability: string;
  landlord: string;
  verified: boolean;
}

interface BookingModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete: (receipt: any) => void;
}

const BookingModal = ({ property, isOpen, onClose, onBookingComplete }: BookingModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    tenantName: "",
    tenantEmail: "",
    tenantPhone: "",
  });
  const { toast } = useToast();

  if (!property) return null;

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const simulateSuiMinting = async () => {
    // Simulate NFT minting on Sui blockchain
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const receiptId = `receipt_${Date.now()}`;
    const mockTxHash = `0x${Math.random().toString(16).substr(2, 32)}`;
    
    return {
      id: receiptId,
      nftObjectId: `0x${Math.random().toString(16).substr(2, 40)}`,
      propertyId: property.id,
      tenant: bookingData.tenantEmail,
      landlord: property.landlord,
      amount: property.price,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      transactionHash: mockTxHash,
      timestamp: new Date().toISOString(),
      verified: true,
    };
  };

  const handleBooking = async () => {
    if (!bookingData.checkIn || !bookingData.checkOut || !bookingData.tenantName || !bookingData.tenantEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      toast({
        title: "Processing Payment",
        description: "Simulating Sui wallet transaction...",
      });

      // Simulate payment delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Minting NFT Receipt",
        description: "Creating tamper-proof receipt on Sui blockchain...",
      });

      // Simulate NFT minting
      const receipt = await simulateSuiMinting();

      toast({
        title: "Booking Confirmed! 🎉",
        description: "Your NFT receipt has been minted successfully.",
        variant: "default",
      });

      onBookingComplete(receipt);
      onClose();
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Secure Booking with NFT Receipt
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Details */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{property.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <User className="h-4 w-4 mr-1" />
                    {property.landlord}
                  </div>
                  <Badge variant="outline" className="mt-2">
                    KES {property.price.toLocaleString()}/month
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="checkIn">Check-in Date</Label>
                <Input
                  id="checkIn"
                  type="date"
                  value={bookingData.checkIn}
                  onChange={(e) => handleInputChange("checkIn", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="checkOut">Check-out Date</Label>
                <Input
                  id="checkOut"
                  type="date"
                  value={bookingData.checkOut}
                  onChange={(e) => handleInputChange("checkOut", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="tenantName">Full Name *</Label>
              <Input
                id="tenantName"
                type="text"
                placeholder="Enter your full name"
                value={bookingData.tenantName}
                onChange={(e) => handleInputChange("tenantName", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="tenantEmail">Email Address *</Label>
              <Input
                id="tenantEmail"
                type="email"
                placeholder="Enter your email"
                value={bookingData.tenantEmail}
                onChange={(e) => handleInputChange("tenantEmail", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="tenantPhone">Phone Number</Label>
              <Input
                id="tenantPhone"
                type="tel"
                placeholder="+254 7XX XXX XXX"
                value={bookingData.tenantPhone}
                onChange={(e) => handleInputChange("tenantPhone", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Security Features */}
          <Card className="bg-success-light border-success/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Shield className="h-4 w-4 text-success" />
                Blockchain Security Features
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                <span>Tamper-proof NFT receipt minted on Sui blockchain</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                <span>Instant verification via QR code</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                <span>No more fake or disputed receipts</span>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleBooking}
              className="flex-1"
              variant="hero"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Secure Booking
                </div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;