
import { Button } from "@/components/ui/button";
import { ArrowDown, MapPin, Users, Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useState } from "react";

const Hero = () => {
  const heroRef = useScrollReveal<HTMLDivElement>();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax - Using Raipur cityscape */}
      <div 
        className="absolute inset-0 z-0 parallax"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80" />
      </div>
      
      {/* Organic floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-8 w-3 h-3 bg-primary/80 rounded-full animate-pulse" />
        <div className="absolute top-32 right-16 w-2 h-2 bg-accent/70 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }} />
        <div className="absolute bottom-40 left-1/5 w-2.5 h-2.5 bg-secondary/60 rounded-full animate-pulse" style={{ animationDelay: '1.6s' }} />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-primary/50 rounded-full animate-pulse" style={{ animationDelay: '2.2s' }} />
      </div>
      
      {/* Main Content */}
      <div 
        ref={heroRef}
        className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto scroll-reveal"
      >
        <div className="space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Explore{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Raipur
            </span>
            <br />
            <span className="text-3xl md:text-5xl lg:text-6xl font-medium text-gray-100">
              Like a Local
            </span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
            Discover authentic experiences, hidden gems, and local favorites in the heart of Chhattisgarh. 
            Your community-driven guide to the real Raipur.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white px-10 py-4 text-lg transform hover:scale-105 transition-all duration-300 shadow-xl glass border border-white/20"
            >
              Start Exploring
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white/80 text-white hover:bg-white/10 hover:border-white px-10 py-4 text-lg transform hover:scale-105 transition-all duration-300 glass backdrop-blur-sm"
            >
              Add Your Spot
            </Button>
          </div>
          
          {/* Community Stats with organic layout */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto pt-8">
            <div className="flex items-center justify-center space-x-3 glass rounded-xl p-5 transform hover:scale-105 transition-all duration-300 bg-white/5 backdrop-blur-md border border-white/10">
              <MapPin className="h-6 w-6 text-primary" />
              <div className="text-left">
                <div className="text-xl font-bold">150+</div>
                <div className="text-sm text-gray-300">Places</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 glass rounded-xl p-5 transform hover:scale-105 transition-all duration-300 bg-white/5 backdrop-blur-md border border-white/10 sm:mt-4">
              <Users className="h-6 w-6 text-primary" />
              <div className="text-left">
                <div className="text-xl font-bold">2.5K+</div>
                <div className="text-sm text-gray-300">Contributors</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 glass rounded-xl p-5 transform hover:scale-105 transition-all duration-300 bg-white/5 backdrop-blur-md border border-white/10">
              <Star className="h-6 w-6 text-primary" />
              <div className="text-left">
                <div className="text-xl font-bold">Real</div>
                <div className="text-sm text-gray-300">Reviews</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-7 w-7 text-white/80" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
