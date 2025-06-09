
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const LocalStories = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  const stories = [
    {
      name: "Priya Sharma",
      story: "Found the most amazing street food near Telibandha! The chole bhature there is absolutely divine. Been going there for 3 years now.",
      rating: 5,
      category: "Food",
      time: "2 weeks ago"
    },
    {
      name: "Rajesh Kumar",
      story: "Marine Drive has become my evening walk spot. The sunset views are breathtaking, and there's always a nice breeze.",
      rating: 5,
      category: "Tourism",
      time: "1 month ago"
    },
    {
      name: "Anita Patel",
      story: "City Center Mall is great for family shopping. Good variety of stores and the food court has excellent options for kids.",
      rating: 4,
      category: "Shopping",
      time: "3 days ago"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-background scroll-reveal">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Stories from Locals
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real experiences shared by people who know Raipur best
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stories.map((story, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 bg-card/80 backdrop-blur-sm border-border/50"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <Quote className="h-8 w-8 text-primary/30 flex-shrink-0 mr-3" />
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-foreground/90 leading-relaxed mb-4 italic">
                      "{story.story}"
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-foreground">{story.name}</p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                        {story.category}
                      </span>
                      <span>{story.time}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocalStories;
