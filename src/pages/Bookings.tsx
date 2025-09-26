import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, User, QrCode, ExternalLink, Copy, Search, Home, CheckCircle } from "lucide-react";
import Navbar from "@/components/ui/navbar";
import { useToast } from "@/hooks/use-toast";
import QRCode from "react-qr-code";

// Mock bookings data
const mockBookings = [
  {
    id: "booking_001",
    receiptId: "receipt_1703028834567",
    nftObjectId: "0xa1b2c3d4e5f6789012345678901234567890abcd",
    propertyTitle: "Modern 2BR Apartment in Kilimani",
    propertyLocation: "Kilimani, Nairobi",
    propertyImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    landlord: "Sarah Wanjiku",
    amount: 65000,
    checkIn: "2024-01-15",
    checkOut: "2024-02-15",
    transactionHash: "0x7890abc123def456789012345678901234567890",
    status: "active",
    timestamp: "2024-01-01T10:30:00Z",
  },
  {
    id: "booking_002",
    receiptId: "receipt_1703028756432",
    nftObjectId: "0xb2c3d4e5f6789012345678901234567890abcde1",
    propertyTitle: "Cozy 1BR Studio in Westlands",
    propertyLocation: "Westlands, Nairobi",
    propertyImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    landlord: "Grace Njeri",
    amount: 45000,
    checkIn: "2023-12-01",
    checkOut: "2023-12-31",
    transactionHash: "0x8901bcd234ef567890123456789012345678901a",
    status: "completed",
    timestamp: "2023-11-25T14:20:00Z",
  },
  {
    id: "booking_003",
    receiptId: "receipt_1703028912345",
    nftObjectId: "0xc3d4e5f6789012345678901234567890abcdef12",
    propertyTitle: "Family 4BR Villa in Lavington",
    propertyLocation: "Lavington, Nairobi", 
    propertyImage: "https://images.unsplash.com/photo-1605276373954-0c4a0dac5cc0?w=400&h=300&fit=crop",
    landlord: "Peter Kiprotich",
    amount: 180000,
    checkIn: "2024-02-01",
    checkOut: "2024-03-01",
    transactionHash: "0x9012cde345f678901234567890123456789012ab",
    status: "upcoming",
    timestamp: "2024-01-10T16:45:00Z",
  },
];

const Bookings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [showQR, setShowQR] = useState(null);
  const { toast } = useToast();

  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = booking.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.propertyLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.landlord.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "active") return matchesSearch && booking.status === "active";
    if (selectedTab === "upcoming") return matchesSearch && booking.status === "upcoming"; 
    if (selectedTab === "completed") return matchesSearch && booking.status === "completed";
    
    return matchesSearch;
  });

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-success text-success-foreground";
      case "upcoming": return "bg-primary text-primary-foreground";
      case "completed": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isExpired = (checkOutDate) => {
    return new Date(checkOutDate) < new Date();
  };

  const verificationUrl = (receiptId) => `${window.location.origin}/verify/${receiptId}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
            <Home className="h-8 w-8 text-primary" />
            My Bookings
          </h1>
          <p className="text-xl text-muted-foreground">
            View and manage your rental bookings with blockchain receipts
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-md">
            <TabsTrigger value="all" onClick={() => setSelectedTab("all")}>All</TabsTrigger>
            <TabsTrigger value="active" onClick={() => setSelectedTab("active")}>Active</TabsTrigger>
            <TabsTrigger value="upcoming" onClick={() => setSelectedTab("upcoming")}>Upcoming</TabsTrigger>
            <TabsTrigger value="completed" onClick={() => setSelectedTab("completed")}>Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <BookingsList bookings={filteredBookings} showQR={showQR} setShowQR={setShowQR} copyToClipboard={copyToClipboard} />
          </TabsContent>
          <TabsContent value="active" className="space-y-4">
            <BookingsList bookings={filteredBookings} showQR={showQR} setShowQR={setShowQR} copyToClipboard={copyToClipboard} />
          </TabsContent>
          <TabsContent value="upcoming" className="space-y-4">
            <BookingsList bookings={filteredBookings} showQR={showQR} setShowQR={setShowQR} copyToClipboard={copyToClipboard} />
          </TabsContent>
          <TabsContent value="completed" className="space-y-4">
            <BookingsList bookings={filteredBookings} showQR={showQR} setShowQR={setShowQR} copyToClipboard={copyToClipboard} />
          </TabsContent>
        </Tabs>

        {filteredBookings.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No bookings found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? "Try adjusting your search criteria" : "You haven't made any bookings yet"}
              </p>
              {!searchQuery && (
                <Button variant="hero" asChild>
                  <a href="/">Browse Properties</a>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

const BookingsList = ({ bookings, showQR, setShowQR, copyToClipboard }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-success text-success-foreground";
      case "upcoming": return "bg-primary text-primary-foreground";
      case "completed": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const verificationUrl = (receiptId) => `${window.location.origin}/verify/${receiptId}`;

  return (
    <>
      {bookings.map((booking) => (
        <Card key={booking.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardContent className="p-0">
            <div className="md:flex">
              {/* Property Image */}
              <div className="md:w-48 h-48 md:h-auto">
                <img
                  src={booking.propertyImage}
                  alt={booking.propertyTitle}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                      <Badge variant="outline" className="bg-success-light text-success">
                        ✓ NFT Receipt
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{booking.propertyTitle}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{booking.propertyLocation}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>Landlord: {booking.landlord}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary mb-1">
                      KES {booking.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total Amount
                    </p>
                  </div>
                </div>

                {/* Receipt Details */}
                <div className="bg-muted/30 rounded-lg p-4 mb-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Receipt ID:</span>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-background px-2 py-1 rounded">{booking.receiptId}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(booking.receiptId, "Receipt ID")}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">NFT Object:</span>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-background px-2 py-1 rounded max-w-32 truncate">
                        {booking.nftObjectId}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(booking.nftObjectId, "NFT Object ID")}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(`https://suiscan.xyz/testnet/object/${booking.nftObjectId}`, '_blank')}
                        className="h-6 w-6 p-0"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowQR(showQR === booking.id ? null : booking.id)}
                    className="flex items-center gap-2"
                  >
                    <QrCode className="h-4 w-4" />
                    {showQR === booking.id ? "Hide QR" : "Show QR"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open(verificationUrl(booking.receiptId), '_blank')}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Verify Receipt
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(verificationUrl(booking.receiptId), "Verification link")}
                    className="flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Share Link
                  </Button>
                </div>

                {/* QR Code */}
                {showQR === booking.id && (
                  <div className="mt-6 p-4 bg-white rounded-lg border text-center">
                    <QRCode
                      value={verificationUrl(booking.receiptId)}
                      size={200}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Landlord verification QR code
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default Bookings;