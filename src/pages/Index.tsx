import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Shield, Home, Users, CheckCircle } from "lucide-react";
import Navbar from "@/components/ui/navbar";
import PropertyCard from "@/components/PropertyCard";
import BookingModal from "@/components/BookingModal";
import ReceiptModal from "@/components/ReceiptModal";
import { useToast } from "@/hooks/use-toast";

// Mock property data
const mockProperties = [
  {
    id: "1",
    title: "Modern 2BR Apartment in Kilimani",
    location: "Kilimani, Nairobi",
    price: 65000,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    bedrooms: 2,
    availability: "Available Now",
    landlord: "Sarah Wanjiku",
    verified: true,
  },
  {
    id: "2", 
    title: "Spacious 3BR House in Karen",
    location: "Karen, Nairobi",
    price: 120000,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    bedrooms: 3,
    availability: "Available Jan 15",
    landlord: "John Mwangi",
    verified: true,
  },
  {
    id: "3",
    title: "Cozy 1BR Studio in Westlands",
    location: "Westlands, Nairobi", 
    price: 45000,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    bedrooms: 1,
    availability: "Available Now",
    landlord: "Grace Njeri",
    verified: true,
  },
  {
    id: "4",
    title: "Family 4BR Villa in Lavington",
    location: "Lavington, Nairobi",
    price: 180000,
    image: "https://images.unsplash.com/photo-1605276373954-0c4a0dac5cc0?w=800&h=600&fit=crop",
    bedrooms: 4,
    availability: "Available Feb 1",
    landlord: "Peter Kiprotich",
    verified: false,
  },
  {
    id: "5",
    title: "Modern 2BR Penthouse in Upperhill",
    location: "Upperhill, Nairobi",
    price: 95000,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    bedrooms: 2,
    availability: "Available Now",
    landlord: "Mary Achieng",
    verified: true,
  },
  {
    id: "6",
    title: "Affordable 1BR Apartment in South B",
    location: "South B, Nairobi",
    price: 35000,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
    bedrooms: 1,
    availability: "Available Now",
    landlord: "David Kimani",
    verified: true,
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState(null);
  const { toast } = useToast();

  const filteredProperties = mockProperties.filter(
    property =>
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookProperty = (property) => {
    setSelectedProperty(property);
    setIsBookingModalOpen(true);
  };

  const handleBookingComplete = (receipt) => {
    setCurrentReceipt(receipt);
    setIsReceiptModalOpen(true);
    setIsBookingModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-glow to-primary py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Secure Rentals with
              <span className="block text-primary-glow">Blockchain Receipts</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              KejaYangu eliminates fake receipts and rental disputes through tamper-proof NFT receipts on Sui blockchain. Book with confidence.
            </p>
            
            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge className="bg-white/20 text-primary-foreground border-white/30 px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                Tamper-Proof Receipts
              </Badge>
              <Badge className="bg-white/20 text-primary-foreground border-white/30 px-4 py-2">
                <CheckCircle className="h-4 w-4 mr-2" />
                Instant Verification
              </Badge>
              <Badge className="bg-white/20 text-primary-foreground border-white/30 px-4 py-2">
                <Users className="h-4 w-4 mr-2" />
                Trusted by 1000+ Users
              </Badge>
            </div>

            {/* Search bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search properties in Nairobi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg bg-white/95 backdrop-blur-sm border-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 bg-gradient-to-br from-card to-accent/20">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">1,200+</div>
                <div className="text-muted-foreground">Verified Properties</div>
              </CardContent>
            </Card>
            <Card className="text-center border-0 bg-gradient-to-br from-card to-success-light">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-success mb-2">Zero</div>
                <div className="text-muted-foreground">Fake Receipts</div>
              </CardContent>
            </Card>
            <Card className="text-center border-0 bg-gradient-to-br from-card to-warning-light">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-warning mb-2">98%</div>
                <div className="text-muted-foreground">Dispute-Free Bookings</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Find Your Perfect Keja
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse verified properties with blockchain-secured booking process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onBook={handleBookProperty}
              />
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No properties found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How KejaYangu Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple, secure, and transparent rental process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Browse & Select",
                description: "Find verified properties and select your preferred dates",
                icon: Search,
              },
              {
                step: "2", 
                title: "Secure Booking",
                description: "Pay securely through Sui wallet integration",
                icon: Shield,
              },
              {
                step: "3",
                title: "NFT Receipt",
                description: "Get tamper-proof receipt minted on Sui blockchain",
                icon: CheckCircle,
              },
              {
                step: "4",
                title: "Easy Verification",
                description: "Landlord scans QR code for instant verification",
                icon: Users,
              },
            ].map((item, index) => (
              <Card key={index} className="text-center border-0 bg-gradient-to-br from-card to-primary/5 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {item.step}
                  </div>
                  <item.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modals */}
      <BookingModal
        property={selectedProperty}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingComplete={handleBookingComplete}
      />

      <ReceiptModal
        receipt={currentReceipt}
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
      />
    </div>
  );
};

export default Index;
