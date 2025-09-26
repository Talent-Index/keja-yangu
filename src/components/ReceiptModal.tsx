import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, QrCode, Copy, ExternalLink, Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QRCode from "react-qr-code";

interface Receipt {
  id: string;
  nftObjectId: string;
  propertyId: string;
  tenant: string;
  landlord: string;
  amount: number;
  checkIn: string;
  checkOut: string;
  transactionHash: string;
  timestamp: string;
  verified: boolean;
}

interface ReceiptModalProps {
  receipt: Receipt | null;
  isOpen: boolean;
  onClose: () => void;
}

const ReceiptModal = ({ receipt, isOpen, onClose }: ReceiptModalProps) => {
  const [qrSize, setQrSize] = useState(200);
  const { toast } = useToast();

  if (!receipt) return null;

  const verificationUrl = `${window.location.origin}/verify/${receipt.id}`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const downloadQR = () => {
    const svg = document.getElementById("qr-code");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `receipt-${receipt.id}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            Booking Confirmation - NFT Receipt
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Success Message */}
          <Card className="bg-success-light border-success/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-success" />
                <div>
                  <h3 className="font-semibold text-success-foreground">Booking Confirmed!</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your tamper-proof NFT receipt has been minted on Sui blockchain
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QR Code */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <QrCode className="h-5 w-5" />
                Verification QR Code
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <QRCode
                  id="qr-code"
                  value={verificationUrl}
                  size={qrSize}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                />
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Show this QR code to your landlord for instant verification
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadQR}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(verificationUrl, "Verification link")}
                    className="flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Share Link
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Receipt Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Receipt Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">Receipt ID:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="bg-muted px-2 py-1 rounded text-xs">{receipt.id}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(receipt.id, "Receipt ID")}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <span className="font-medium text-muted-foreground">Amount:</span>
                  <p className="mt-1 font-semibold">KES {receipt.amount.toLocaleString()}</p>
                </div>

                <div>
                  <span className="font-medium text-muted-foreground">Check-in:</span>
                  <p className="mt-1">{new Date(receipt.checkIn).toLocaleDateString()}</p>
                </div>

                <div>
                  <span className="font-medium text-muted-foreground">Check-out:</span>
                  <p className="mt-1">{new Date(receipt.checkOut).toLocaleDateString()}</p>
                </div>

                <div>
                  <span className="font-medium text-muted-foreground">Tenant:</span>
                  <p className="mt-1">{receipt.tenant}</p>
                </div>

                <div>
                  <span className="font-medium text-muted-foreground">Landlord:</span>
                  <p className="mt-1">{receipt.landlord}</p>
                </div>
              </div>

              {/* Blockchain Details */}
              <div className="border-t pt-4 space-y-3">
                <h4 className="font-medium">Blockchain Information</h4>
                
                <div>
                  <span className="font-medium text-muted-foreground text-sm">NFT Object ID:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="bg-muted px-2 py-1 rounded text-xs break-all">{receipt.nftObjectId}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(receipt.nftObjectId, "NFT Object ID")}
                      className="h-6 w-6 p-0 flex-shrink-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div>
                  <span className="font-medium text-muted-foreground text-sm">Transaction Hash:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="bg-muted px-2 py-1 rounded text-xs break-all">{receipt.transactionHash}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(receipt.transactionHash, "Transaction hash")}
                      className="h-6 w-6 p-0 flex-shrink-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(`https://suiscan.xyz/testnet/tx/${receipt.transactionHash}`, '_blank')}
                      className="h-6 w-6 p-0 flex-shrink-0"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-success-light text-success">
                    ✓ Verified on Sui Blockchain
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(receipt.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Close Button */}
          <Button onClick={onClose} className="w-full" variant="hero">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptModal;