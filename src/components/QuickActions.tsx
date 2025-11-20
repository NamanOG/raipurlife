
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Camera, Coffee, Utensils, ShoppingBag, Calendar } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const QuickActions = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  const actions = [
    {
      icon: MapPin,
      title: "Explore Raipur",
      description: "Find hidden gems in the city",
      color: "from-primary to-primary/80",
    },
    {
      icon: Camera,
      title: "Share Moments",
      description: "Capture your Raipur stories",
      color: "from-secondary to-secondary/80",
    },
    {
      icon: Coffee,
      title: "Best Chai Spots",
      description: "Local tea and snack places",
      color: "from-accent to-accent/80",
    },
    {
      icon: Utensils,
      title: "Local Food",
      description: "Authentic Chhattisgarhi cuisine",
      color: "from-primary to-secondary",
    },
    {
      icon: ShoppingBag,
      title: "Markets",
      description: "Traditional and modern shopping",
      color: "from-secondary to-accent",
    },
    {
      icon: Calendar,
      title: "City Events",
      description: "Festivals and local happenings",
      color: "from-accent to-primary",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-muted/30 scroll-reveal">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Quick Actions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to explore Raipur at your fingertips
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card 
                key={index} 
                className="group cursor-pointer hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-2 glass border border-primary/20 hover:border-primary/40"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
