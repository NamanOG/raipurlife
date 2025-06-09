
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, User, Clock, MessageSquare, ExternalLink } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const communityReviews = [
  {
    id: 1,
    user: "Rahul S.",
    rating: 5,
    place: "Nukkad Chai",
    category: "Food & Dining",
    review: "Amazing chai and snacks! Perfect for evening hangouts with friends. The ambiance is cozy and prices are very reasonable.",
    time: "2 days ago",
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    user: "Priya M.",
    rating: 4,
    place: "Jungle Safari, Barnawapara",
    category: "Tourism",
    review: "Great wildlife experience! Saw deer, peacocks, and many birds. Guide was knowledgeable. Best to visit early morning.",
    time: "1 week ago",
    image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    user: "Amit K.",
    rating: 5,
    place: "Magneto The Mall",
    category: "Shopping",
    review: "Best shopping experience in Raipur! Good variety of brands, excellent food court, and great parking facility.",
    time: "3 days ago",
    image: "https://images.unsplash.com/photo-1555529902-5261145633bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    user: "Sneha T.",
    rating: 4,
    place: "Buddha Talab",
    category: "Nature",
    review: "Peaceful place for morning walks and meditation. Well-maintained park area. Perfect for photography enthusiasts.",
    time: "5 days ago",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }
];

const CommunityReviews = () => {
  const sectionRef = useScrollReveal();

  return (
    <section ref={sectionRef} className="py-16 px-4 scroll-reveal">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Community Reviews
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Real experiences from locals and visitors. Share your own recommendations!
          </p>
          
          <Button 
            className="bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-300"
            onClick={() => window.open('https://www.appsheet.com/start/93f7c023-4304-4236-9db1-dd92f32f0644?platform=desktop', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Submit Your Review
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {communityReviews.map((review, index) => (
            <Card 
              key={review.id} 
              className="group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden glass transform hover:scale-[1.02]"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative">
                <img 
                  src={review.image} 
                  alt={review.place}
                  className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-black">
                    {review.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 rounded-full px-2 py-1 flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium text-black">{review.rating}</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{review.user}</h4>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{review.time}</span>
                    </div>
                  </div>
                </div>
                
                <h5 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {review.place}
                </h5>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  "{review.review}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    <span>Review</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="glass transform hover:scale-105 transition-all duration-300"
            onClick={() => window.open('https://www.appsheet.com/start/93f7c023-4304-4236-9db1-dd92f32f0644?platform=desktop', '_blank')}
          >
            View All Reviews
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommunityReviews;
