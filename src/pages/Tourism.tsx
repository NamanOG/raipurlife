import { useScrollReveal } from "@/hooks/useScrollReveal";
import { MapPin, Camera, Clock, Star, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const places = [
  {
    name: "Swami Vivekananda Sarovar",
    category: "Nature",
    description: "A beautiful lake perfect for evening strolls and boating with panoramic sunset views.",
    image: "/wildlife.jpg",
    rating: 4.7,
    location: "Central Raipur",
    hours: "5:00 AM - 9:00 PM"
  },
  {
    name: "Mahant Ghasidas Museum",
    category: "Culture",
    description: "Showcasing Chhattisgarh's rich tribal heritage and history with fascinating artifacts.",
    image: "/Traditional.png",
    rating: 4.5,
    location: "Gandhi Chowk",
    hours: "10:00 AM - 5:30 PM (Closed Mondays)"
  },
  {
    name: "Purkhouti Muktangan",
    category: "Culture",
    description: "Open-air museum displaying tribal life and traditions of Chhattisgarh's indigenous communities.",
    image: "/Modern.png",
    rating: 4.6,
    location: "Naya Raipur",
    hours: "9:00 AM - 6:00 PM"
  },
  {
    name: "Magneto The Mall",
    category: "Shopping",
    description: "Premier shopping destination with branded stores, entertainment zones, and fine dining options.",
    image: "/urban.png",
    rating: 4.3,
    location: "GE Road",
    hours: "11:00 AM - 10:00 PM"
  },
];

const Tourism = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-blue-950/10 to-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full h-80 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: "url('/wildlife.jpg')"
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">Explore Raipur</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">Discover the hidden gems and top attractions of Chhattisgarh's capital city</p>
        </div>
      </section>
      
      {/* Main Content */}
      <section ref={sectionRef} className="py-16 px-4 scroll-reveal">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-10 w-1.5 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
            <h2 className="text-3xl font-bold">Must-Visit Destinations</h2>
          </div>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
            From serene natural spots to cultural landmarks, Raipur offers diverse experiences for every traveler. 
            Explore these handpicked attractions to make the most of your visit.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {places.map((place, idx) => (
              <div 
                key={idx} 
                className="group rounded-xl overflow-hidden hover-lift border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={place.image} 
                    alt={place.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-white font-medium">{place.rating}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 pt-8">
                    <span className="inline-block mb-2 px-3 py-1 rounded-full bg-secondary/80 text-white text-xs font-semibold">
                      {place.category}
                    </span>
                    <h3 className="text-xl font-bold text-white">{place.name}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">{place.description}</p>
                  
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm">{place.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm">{place.hours}</span>
                    </div>
                  </div>
                  
                  <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors">
                    <span>View Details</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Map Section */}
          <div className="mt-16 p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4 text-primary">Find Your Way Around</h3>
                <p className="text-muted-foreground mb-6">
                  Navigate Raipur with ease using our interactive map. Discover attractions, restaurants,
                  and accommodations to plan your perfect itinerary.
                </p>
                <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
                  <MapPin className="h-4 w-4" />
                  <span>Open Interactive Map</span>
                </button>
              </div>
              <div className="flex-1 rounded-xl overflow-hidden h-64 w-full border border-white/10">
                <div className="w-full h-full bg-[#101624] flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-primary/40" />
                  <span className="text-lg text-white/40">Map View</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Tourism;
