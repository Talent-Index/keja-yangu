import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Search, QrCode, Calendar, MapPin, User, CreditCard, Shield, ArrowLeft } from "lucide-react";
import Navbar from "@/components/ui/navbar";
import { useToast } from "@/hooks/use-toast";

const Verify = () => {
  const { receiptId } = useParams();
  const [manualReceiptId, setManualReceiptId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    if (receiptId) {
      verifyReceipt(receiptId);
    }
  }, [receiptId]);

  const verifyReceipt = async (id) => {
    setIsLoading(true);
    try {
      // Simulate blockchain verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock receipt data (in real app, this would come from Sui blockchain)
      const mockReceipt = {
        id: id,
        nftObjectId: `0x${Math.random().toString(16).substr(2, 40)}`,
        propertyId: "prop_123",
        propertyTitle: "Modern 2BR Apartment in Kilimani",
        propertyLocation: "Kilimani, Nairobi",
        tenant: "john.doe@email.com",
        tenantName: "John Doe",
        landlord: "Sarah Wanjiku",
        amount: 65000,
        checkIn: "2024-01-15",
        checkOut: "2024-02-15",
        transactionHash: `0x${Math.random().toString(16).substr(2, 32)}`,
        timestamp: new Date().toISOString(),
        verified: true,
        status: "active" // active, expired, cancelled
      };

      // Simulate some validation logic
      const isValid = id.startsWith("receipt_") && Math.random() > 0.1; // 90% success rate
      
      if (isValid) {
        setVerificationResult({
          ...mockReceipt,
          valid: true,
          message: "Valid booking receipt verified on Sui blockchain"
        });
      } else {
        setVerificationResult({
          valid: false,
          message: "Receipt not found or invalid",
          error: "This receipt ID does not exist on the blockchain or has been tampered with"
        });
      }
    } catch (error) {
      setVerificationResult({
        valid: false,
        message: "Verification failed",
        error: "Unable to connect to Sui blockchain. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualVerification = () => {
    if (!manualReceiptId.trim()) {
      toast({
        title: "Missing Receipt ID",
        description: "Please enter a receipt ID to verify",
        variant: "destructive",
      });
      return;
    }
    verifyReceipt(manualReceiptId.trim());
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isExpired = (checkOutDate) => {
    return new Date(checkOutDate) < new Date();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Properties
              </Button>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              Receipt Verification
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Verify rental receipts instantly using our blockchain verification system
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          {/* Manual Verification */}
          {!receiptId && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Enter Receipt ID
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="receiptId">Receipt ID</Label>
                  <Input
                    id="receiptId"
                    type="text"
                    placeholder="receipt_1234567890"
                    value={manualReceiptId}
                    onChange={(e) => setManualReceiptId(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Enter the receipt ID from the tenant's NFT receipt
                  </p>
                </div>
                <Button
                  onClick={handleManualVerification}
                  disabled={isLoading}
                  className="w-full"
                  variant="hero"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      Verifying on Sui Blockchain...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      Verify Receipt
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Loading State */}
          {isLoading && (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">Verifying Receipt</h3>
                <p className="text-muted-foreground">
                  Checking Sui blockchain for receipt authenticity...
                </p>
              </CardContent>
            </Card>
          )}

          {/* Verification Result */}
          {verificationResult && !isLoading && (
            <Card className={`border-2 ${
              verificationResult.valid 
                ? 'border-success bg-success-light/20' 
                : 'border-destructive bg-destructive/5'
            }`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {verificationResult.valid ? (
                    <CheckCircle className="h-6 w-6 text-success" />
                  ) : (
                    <XCircle className="h-6 w-6 text-destructive" />
                  )}
                  <span className={verificationResult.valid ? 'text-success' : 'text-destructive'}>
                    {verificationResult.message}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {verificationResult.valid ? (
                  <div className="space-y-6">
                    {/* Status Badges */}
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="bg-success text-success-foreground">
                        ✓ Blockchain Verified
                      </Badge>
                      {verificationResult.status === 'active' && (
                        <Badge variant="outline" className="bg-primary text-primary-foreground">
                          Active Booking
                        </Badge>
                      )}
                      {isExpired(verificationResult.checkOut) && (
                        <Badge variant="outline" className="bg-muted">
                          Booking Expired
                        </Badge>
                      )}
                    </div>

                    {/* Property Details */}
                    <div className="bg-background/50 rounded-lg p-4 space-y-3">
                      <h3 className="font-semibold text-lg">{verificationResult.propertyTitle}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{verificationResult.propertyLocation}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">KES {verificationResult.amount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-medium text-muted-foreground">TENANT DETAILS</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{verificationResult.tenantName}</p>
                              <p className="text-sm text-muted-foreground">{verificationResult.tenant}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-muted-foreground">BOOKING PERIOD</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Check-in</p>
                              <p className="font-medium">{formatDate(verificationResult.checkIn)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Check-out</p>
                              <p className="font-medium">{formatDate(verificationResult.checkOut)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Blockchain Details */}
                    <div className="border-t pt-4 space-y-2">
                      <h4 className="font-medium text-muted-foreground text-sm">BLOCKCHAIN DETAILS</h4>
                      <div className="text-xs space-y-1 text-muted-foreground">
                        <p><span className="font-medium">NFT Object ID:</span> {verificationResult.nftObjectId}</p>
                        <p><span className="font-medium">Transaction:</span> {verificationResult.transactionHash}</p>
                        <p><span className="font-medium">Timestamp:</span> {new Date(verificationResult.timestamp).toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Landlord Info */}
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-sm">
                        <span className="font-medium">Landlord:</span> {verificationResult.landlord}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        This receipt is cryptographically signed and cannot be forged or tampered with.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                    <p className="text-destructive font-medium mb-2">{verificationResult.error}</p>
                    <p className="text-sm text-muted-foreground">
                      Please ask the tenant to provide the correct receipt ID or QR code.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Info Card */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">How Verification Works</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Each booking receipt is minted as an NFT on Sui blockchain</li>
                    <li>• NFT contains encrypted booking details that cannot be forged</li>
                    <li>• Verification checks the blockchain directly for authenticity</li>
                    <li>• QR codes provide instant access to verification page</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Verify;