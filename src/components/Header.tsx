
import { Search, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <MapPin className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold text-primary">Raipur.life</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search places in Raipur..."
              className="w-[300px] pl-10"
            />
          </div>
          
          <Button variant="outline" size="sm" className="hidden md:flex items-center space-x-2">
            <Heart className="h-4 w-4" />
            <span>Favorites</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
