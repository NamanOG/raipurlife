
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const featuredPlaces = [
  {
    id: 1,
    name: "Swami Vivekananda Sarovar",
    category: "Nature",
    rating: 4.5,
    reviews: 1234,
    image: "https://images.unsplash.com/photo-1564769662454-4b09e3f0bb9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Beautiful artificial lake with boating facilities and scenic walkways, perfect for evening strolls",
    location: "Kota, Raipur",
    timing: "5:00 AM - 9:00 PM",
    price: "Free",
    tags: ["Lake", "Boating", "Picnic Spot", "Evening Walk"]
  },
  {
    id: 2,
    name: "Mahant Ghasidas Memorial Museum",
    category: "Tourism",
    rating: 4.3,
    reviews: 856,
    image: "https://images.unsplash.com/photo-1594736797933-d0201ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Renowned museum showcasing Chhattisgarh's rich tribal culture, ancient sculptures, and archaeological artifacts",
    location: "Civil Lines, Raipur",
    timing: "10:00 AM - 5:00 PM (Closed Monday)",
    price: "₹",
    tags: ["Museum", "History", "Tribal Art", "Educational"]
  },
  {
    id: 3,
    name: "Purkhouti Muktangan",
    category: "Tourism",
    rating: 4.4,
    reviews: 967,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Open-air museum displaying tribal life, culture, and traditions of Chhattisgarh with authentic huts and artifacts",
    location: "Naya Raipur",
    timing: "9:00 AM - 6:00 PM",
    price: "₹₹",
    tags: ["Cultural", "Tribal Heritage", "Open Air", "Photography"]
  },
  {
    id: 4,
    name: "Guru Tegh Bahadur Gurudwara",
    category: "Religious",
    rating: 4.6,
    reviews: 534,
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Historic Sikh temple and one of the oldest gurudwaras in Chhattisgarh, known for its peaceful atmosphere",
    location: "Ganj, Raipur",
    timing: "4:00 AM - 10:00 PM",
    price: "Free",
    tags: ["Religious", "Historic", "Peaceful", "Langar"]
  },
  {
    id: 5,
    name: "Magneto The Mall",
    category: "Shopping",
    rating: 4.2,
    reviews: 1523,
    image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Premier shopping destination in Raipur with branded stores, food court, and entertainment options",
    location: "G.E. Road, Raipur",
    timing: "10:00 AM - 10:00 PM",
    price: "₹₹₹",
    tags: ["Shopping", "Food Court", "Brands", "Entertainment"]
  },
  {
    id: 6,
    name: "Dudhadhari Math Temple",
    category: "Religious",
    rating: 4.4,
    reviews: 789,
    image: "https://images.unsplash.com/photo-1605289982774-9a6fef564df8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Ancient Hindu temple complex known for its beautiful architecture and spiritual significance",
    location: "Arang Road, Raipur",
    timing: "5:00 AM - 8:00 PM",
    price: "Free",
    tags: ["Temple", "Architecture", "Spiritual", "Ancient"]
  }
];

const FeaturedPlaces = () => {
  const sectionRef = useScrollReveal();

  return (
  <section ref={sectionRef} className="py-16 px-4 bg-muted/30 scroll-reveal">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Places
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hand-picked recommendations from locals and visitors. Discover the best spots in Raipur!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPlaces.map((place, index) => (
            <Card 
              key={place.id} 
              className="group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 overflow-hidden glass transform hover:scale-[1.02]"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={place.image} 
                  alt={place.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-black">
                    {place.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 rounded-full px-2 py-1 flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium text-black">{place.rating}</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  {place.name}
                </h4>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                  {place.description}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    {place.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    {place.timing}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {place.tags.map((tag) => (
                    <Badge key={tag} className="text-xs glass">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-primary text-lg">{place.price}</span>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{place.rating}</span>
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
