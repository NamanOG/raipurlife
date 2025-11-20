// Food Page v1.0
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Tag, MapPin, Star, Heart, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const foods = [
  {
    name: "Chana Samosa",
    description: "A Raipur street food classic, spicy chana topped on crispy samosas. The perfect blend of savory and spicy.",
    image: "/placeholder.svg",
    price: "₹30 - ₹50",
    tags: ["Street Food", "Snack", "Vegetarian"],
    rating: 4.8,
    location: "Jaistambh Chowk"
  },
  {
    name: "Poha Jalebi",
    description: "A popular breakfast combo, light flattened rice with sweet jalebi. A must-try Chhattisgarhi breakfast experience.",
    image: "/placeholder.svg",
    price: "₹40 - ₹60",
    tags: ["Breakfast", "Sweet & Savory", "Vegetarian"],
    rating: 4.7,
    location: "Sadar Bazaar"
  },
  {
    name: "Chhattisgarhi Thali",
    description: "Traditional thali with rice, dal, and local specialties like fara, chousela, and dubki kadhi. A complete meal experience.",
    image: "/placeholder.svg",
    price: "₹120 - ₹200",
    tags: ["Main Course", "Local Cuisine", "Vegetarian"],
    rating: 4.6,
    location: "Various Restaurants"
  },
  {
    name: "Nukkad Chai",
    description: "Famous tea stall for Irani chai and snacks. The perfect place to experience local tea culture with bun-maska and osmania biscuits.",
    image: "/placeholder.svg",
    price: "₹10 - ₹30",
    tags: ["Beverage", "Tea", "Snacks"],
    rating: 4.5,
    location: "Station Road"
  },
  {
    name: "Bafauri",
    description: "Steamed lentil dumplings seasoned with spices and herbs. A protein-rich local delicacy often served with chutney.",
    image: "/placeholder.svg",
    price: "₹40 - ₹60",
    tags: ["Snack", "Local Cuisine", "Vegetarian"],
    rating: 4.4,
    location: "Pandri Market"
  },
  {
    name: "Bhajia & Chila",
    description: "Crispy gram flour fritters and savory pancakes, popular for breakfast or evening snacks with green chutney.",
    image: "/placeholder.svg",
    price: "₹30 - ₹50",
    tags: ["Breakfast", "Snack", "Vegetarian"],
    rating: 4.3,
    location: "Gol Bazaar"
  }
];

const categories = [
  "All", "Street Food", "Local Cuisine", "Breakfast", "Desserts", "Beverages", "Fine Dining"
];

const Food = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/5 to-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full h-80 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: "url('/placeholder.svg')",
            backgroundColor: "#121a2a"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30"></div>
        <div className="relative z-10 text-center px-4">
          <span className="inline-block px-4 py-1 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4">Taste of Raipur</span>
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">Food & Culinary Delights</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">Discover authentic Chhattisgarhi cuisine and local favorites</p>
        </div>
      </section>
      
      {/* Search & Filter Section */}
      <section className="py-8 px-4 bg-white/5 backdrop-blur-sm border-y border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search for dishes, restaurants or cuisines..." 
                className="pl-10 bg-white/10 border-white/10 focus:border-accent"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto py-2 w-full md:w-auto">
              {categories.map((category, idx) => (
                <button 
                  key={idx} 
                  className={`px-4 py-1 rounded-full whitespace-nowrap text-sm font-medium ${
                    idx === 0 
                      ? 'bg-accent text-white' 
                      : 'bg-white/10 hover:bg-white/20 text-white/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section ref={sectionRef} className="py-16 px-4 scroll-reveal">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-10 w-1.5 bg-gradient-to-b from-accent to-accent/50 rounded-full"></div>
            <h2 className="text-3xl font-bold">Popular Local Delicacies</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foods.map((food, idx) => (
              <div 
                key={idx} 
                className="group rounded-xl overflow-hidden hover-lift bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                    <span className="text-xl font-semibold text-white/60">Food Image</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-white font-medium">{food.rating}</span>
                  </div>
                  <button className="absolute top-3 left-3 h-8 w-8 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white/70 hover:text-red-500 transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">{food.name}</h3>
                    <span className="text-sm font-medium text-accent">{food.price}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{food.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {food.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 text-xs font-medium">
                        <Tag className="h-3 w-3 text-accent" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      <span className="text-muted-foreground">{food.location}</span>
                    </div>
                    <button className="text-sm text-accent hover:text-accent/80 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Featured Restaurant */}
          <div className="mt-16 rounded-2xl overflow-hidden bg-gradient-to-r from-accent/20 to-primary/20 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4">Featured Restaurant</span>
                <h3 className="text-3xl font-bold mb-4 text-white">Chhattisgarh Food Trail</h3>
                <p className="text-muted-foreground mb-6">
                  Experience authentic Chhattisgarhi cuisine in a traditional setting. From fara to dubki kadhi,
                  enjoy the full spectrum of local flavors prepared with age-old recipes.
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((_, idx) => (
                      <Star key={idx} className={`h-5 w-5 ${idx < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-white/60">Based on 120+ reviews</span>
                </div>
                <button className="w-full md:w-auto px-6 py-3 bg-accent hover:bg-accent/90 text-white font-medium rounded-lg transition-colors">
                  Reserve a Table
                </button>
              </div>
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/40 to-primary/40 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-white/60">Restaurant Image</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Food Guide */}
          <div className="mt-16 p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <h3 className="text-2xl font-bold mb-6 text-white">Raipur Food Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-lg font-semibold text-accent mb-3">Best Time to Visit</h4>
                <p className="text-sm text-muted-foreground">Most local food stalls are busiest during breakfast (7-10 AM) and evening hours (4-8 PM) when items are freshly made.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-lg font-semibold text-accent mb-3">Local Etiquette</h4>
                <p className="text-sm text-muted-foreground">Traditional Chhattisgarhi meals are often eaten by hand. Street food vendors appreciate exact change for small purchases.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-lg font-semibold text-accent mb-3">Must-Try Experiences</h4>
                <p className="text-sm text-muted-foreground">Don't miss the morning tea culture at Station Road and the traditional thalis at local restaurants near Jaistambh.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Food;
