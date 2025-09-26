import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users } from "lucide-react";

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

interface PropertyCardProps {
  property: Property;
  onBook: (property: Property) => void;
}

const PropertyCard = ({ property, onBook }: PropertyCardProps) => {
  return (
    <Card className="group overflow-hidden border-0 bg-gradient-to-br from-card to-muted/20 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          {property.verified && (
            <Badge variant="default" className="bg-success text-success-foreground">
              ✓ Verified
            </Badge>
          )}
        </div>
        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            KES {property.price.toLocaleString()}/month
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-foreground line-clamp-1">
          {property.title}
        </h3>
        
        <div className="flex items-center text-muted-foreground text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{property.bedrooms} BR</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{property.availability}</span>
          </div>
        </div>

        <div className="mt-3 text-sm text-muted-foreground">
          <span className="font-medium">Landlord:</span> {property.landlord}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onBook(property)}
          className="w-full"
          variant="hero"
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;