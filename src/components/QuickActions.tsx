
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Camera, Coffee, Utensils, ShoppingBag, Calendar } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const QuickActions = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  const actions = [
    {
      icon: MapPin,
      title: "Find Places",
      description: "Discover top-rated spots",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Camera,
      title: "Share Photos",
      description: "Show off your finds",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: Coffee,
      title: "Rate Cafes",
      description: "Help others find great coffee",
      color: "from-amber-500 to-yellow-500",
    },
    {
      icon: Utensils,
      title: "Food Reviews",
      description: "Share your food adventures",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: ShoppingBag,
      title: "Shopping Tips",
      description: "Best deals and stores",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Calendar,
      title: "Events",
      description: "What's happening in town",
      color: "from-indigo-500 to-blue-500",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-muted/30 scroll-reveal">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Quick Actions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Jump right into exploring or contributing to the community
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card 
                key={index} 
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20"
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
