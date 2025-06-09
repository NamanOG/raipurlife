
import { Button } from "@/components/ui/button";
import { ArrowDown, MapPin, Users, Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useState } from "react";

const Hero = () => {
  const heroRef = useScrollReveal();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-0 parallax"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Content */}
      <div 
        ref={heroRef}
        className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto scroll-reveal"
      >
        <div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse">
              Raipur
            </span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Your trusted guide to the best food, places, and experiences in the heart of Chhattisgarh
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300 shadow-2xl glass"
            >
              Explore Places
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-black px-8 py-3 transform hover:scale-105 transition-all duration-300 glass"
            >
              Share Your Review
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 glass rounded-lg p-4 transform hover:scale-105 transition-all duration-300">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold">200+ Places</span>
            </div>
            <div className="flex items-center justify-center space-x-2 glass rounded-lg p-4 transform hover:scale-105 transition-all duration-300">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold">5K+ Visitors</span>
            </div>
            <div className="flex items-center justify-center space-x-2 glass rounded-lg p-4 transform hover:scale-105 transition-all duration-300">
              <Star className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold">Trusted Reviews</span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-white" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
