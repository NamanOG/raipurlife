
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Phone } from "lucide-react";

const featuredPlaces = [
  {
    id: 1,
    name: "Pandri Lake Restaurant",
    category: "Food & Dining",
    rating: 4.5,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Authentic Chhattisgarhi cuisine with lake view dining experience",
    location: "Pandri, Raipur",
    timing: "11:00 AM - 11:00 PM",
    price: "₹₹",
    tags: ["Lake View", "Traditional", "Family Friendly"]
  },
  {
    id: 2,
    name: "Mahant Ghasidas Memorial Museum",
    category: "Tourism",
    rating: 4.3,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Rich collection of ancient artifacts and tribal art",
    location: "Civil Lines, Raipur",
    timing: "10:00 AM - 5:00 PM",
    price: "₹",
    tags: ["Museum", "History", "Educational"]
  },
  {
    id: 3,
    name: "City Center Mall",
    category: "Shopping",
    rating: 4.2,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Premier shopping destination with international brands",
    location: "Pandri, Raipur",
    timing: "10:00 AM - 10:00 PM",
    price: "₹₹₹",
    tags: ["Shopping", "Food Court", "Entertainment"]
  },
  {
    id: 4,
    name: "Café Coffee Day",
    category: "Cafés",
    rating: 4.1,
    reviews: 445,
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Perfect spot for coffee lovers and casual meetings",
    location: "Multiple Locations",
    timing: "7:00 AM - 11:00 PM",
    price: "₹₹",
    tags: ["Coffee", "WiFi", "Study Spot"]
  },
  {
    id: 5,
    name: "Telibandha Talab",
    category: "Nature",
    rating: 4.4,
    reviews: 321,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Serene lake perfect for evening walks and boating",
    location: "Telibandha, Raipur",
    timing: "5:00 AM - 8:00 PM",
    price: "Free",
    tags: ["Lake", "Boating", "Evening Walk"]
  },
  {
    id: 6,
    name: "Nandan Cinema",
    category: "Entertainment",
    rating: 4.0,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1489599849642-6260efb55b15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Modern multiplex with latest movies and comfortable seating",
    location: "Shankar Nagar, Raipur",
    timing: "9:00 AM - 12:00 AM",
    price: "₹₹",
    tags: ["Movies", "Multiplex", "Snacks"]
  }
];

const FeaturedPlaces = () => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Places
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hand-picked recommendations from locals and visitors who know Raipur best
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPlaces.map((place, index) => (
            <Card 
              key={place.id} 
              className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={place.image} 
                  alt={place.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-black">
                    {place.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 rounded-full px-2 py-1 flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium text-black">{place.rating}</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {place.name}
                </h4>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {place.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {place.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {place.timing}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {place.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-primary">{place.price}</span>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{place.rating}</span>
                    <span>({place.reviews})</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlaces;
