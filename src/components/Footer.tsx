
import { MapPin, Facebook, Twitter, Instagram, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Footer = () => {
  const footerRef = useScrollReveal();

  return (
    <footer ref={footerRef} className="bg-card border-t scroll-reveal">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Raipur.life
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Your trusted community-driven guide to discovering the best places, food, and experiences in Raipur, Chhattisgarh.
            </p>
            <div className="flex space-x-3">
              <Button size="sm" variant="outline" className="p-2 glass hover:scale-110 transition-transform duration-300">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="p-2 glass hover:scale-110 transition-transform duration-300">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="p-2 glass hover:scale-110 transition-transform duration-300">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="p-2 glass hover:scale-110 transition-transform duration-300">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Explore</h4>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform">Food & Dining</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform">Tourism</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform">Shopping</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform">Entertainment</a>
            </div>
          </div>
          
          {/* Community */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Community</h4>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform">Share Reviews</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform">Submit Places</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform">Guidelines</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform">About</a>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 space-y-3">
          <p className="text-center text-muted-foreground bg-gradient-to-r from-muted-foreground to-primary bg-clip-text text-transparent">
            Made with ❤️ by the community, for the community.
          </p>
          <p className="text-center text-sm text-muted-foreground">
            Developed by{" "}
            <a 
              href="https://github.com/NamanOG" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-primary hover:text-accent transition-colors duration-300 hover:underline"
            >
              Naman
            </a>
          </p>
          <p className="text-center text-xs text-muted-foreground">
            &copy; 2024 Raipur.life. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
