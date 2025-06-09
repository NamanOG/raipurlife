
import { Card, CardContent } from "@/components/ui/card";
import { 
  UtensilsCrossed, 
  Camera, 
  ShoppingBag, 
  Coffee,
  TreePine,
  Building,
  Music,
  Gamepad2
} from "lucide-react";

const categories = [
  {
    id: "food",
    title: "Food & Dining",
    description: "Best restaurants, street food, and local cuisines",
    icon: UtensilsCrossed,
    color: "from-orange-500 to-red-500",
    count: 45
  },
  {
    id: "tourism",
    title: "Tourism & Sightseeing",
    description: "Historic places, temples, and must-visit attractions",
    icon: Camera,
    color: "from-blue-500 to-cyan-500",
    count: 32
  },
  {
    id: "shopping",
    title: "Shopping & Malls",
    description: "Markets, malls, and shopping destinations",
    icon: ShoppingBag,
    color: "from-purple-500 to-pink-500",
    count: 28
  },
  {
    id: "cafes",
    title: "Cafés & Hangouts",
    description: "Cozy cafés, bars, and hangout spots",
    icon: Coffee,
    color: "from-amber-500 to-orange-500",
    count: 38
  },
  {
    id: "nature",
    title: "Parks & Nature",
    description: "Gardens, parks, and natural attractions",
    icon: TreePine,
    color: "from-green-500 to-emerald-500",
    count: 22
  },
  {
    id: "culture",
    title: "Culture & Arts",
    description: "Museums, galleries, and cultural centers",
    icon: Building,
    color: "from-indigo-500 to-purple-500",
    count: 15
  },
  {
    id: "entertainment",
    title: "Entertainment",
    description: "Cinemas, clubs, and entertainment venues",
    icon: Music,
    color: "from-pink-500 to-rose-500",
    count: 25
  },
  {
    id: "sports",
    title: "Sports & Recreation",
    description: "Sports complexes, gyms, and recreational activities",
    icon: Gamepad2,
    color: "from-teal-500 to-green-500",
    count: 18
  }
];

const Categories = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Explore by Category
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the best places in Raipur organized by what you're looking for
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id} 
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.title}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {category.description}
                  </p>
                  
                  <div className="text-xs font-medium text-primary">
                    {category.count} places
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
