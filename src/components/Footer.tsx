
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold text-primary">Raipur.life</h3>
            </div>
            <p className="text-muted-foreground">
              Your trusted guide to discovering the best places, food, and experiences in Raipur, Chhattisgarh.
            </p>
            <div className="flex space-x-3">
              <Button size="sm" variant="outline" className="p-2">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="p-2">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="p-2">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Food & Dining</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Tourism</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Shopping</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Entertainment</a>
            </div>
          </div>
          
          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Popular Categories</h4>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Restaurants</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Cafés</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Parks</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Museums</a>
            </div>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>hello@raipur.life</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-start space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Raipur, Chhattisgarh, India</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Raipur.life. Made with ❤️ for the people of Raipur.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
