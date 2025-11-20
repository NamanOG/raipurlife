// Events Page v1.0
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Calendar, MapPin, Clock, Users, CalendarDays, Star, ChevronRight, Filter, Search } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const categories = ["All", "Cultural", "Festivals", "Food", "Music", "Arts", "Sports", "Community"];

const events = [
  {
    id: 1,
    name: "Raipur Carnival",
    category: "Festivals",
    date: "October 15-17, 2025",
    time: "10:00 AM - 10:00 PM",
    location: "Central Parade Ground, Raipur",
    description: "A vibrant city-wide festival with parades, music, and food stalls celebrating the diversity of Chhattisgarhi culture.",
    image: "/hero-bg.png",
    attendees: 5000,
    featured: true,
    rating: 4.8
  },
  {
    id: 2,
    name: "Chhattisgarh Foundation Day",
    category: "Cultural",
    date: "November 1, 2025",
    time: "9:00 AM - 8:00 PM",
    location: "Raipur Municipal Ground",
    description: "Celebrations marking the formation of Chhattisgarh state with cultural performances, exhibitions, and official ceremonies.",
    image: "/Traditional.png",
    attendees: 10000,
    featured: true,
    rating: 4.7
  },
  {
    id: 3,
    name: "Food Festival of Chhattisgarh",
    category: "Food",
    date: "December 10-12, 2025",
    time: "12:00 PM - 10:00 PM",
    location: "Science College Ground",
    description: "Experience the diverse flavors of Chhattisgarhi cuisine with over 100 food stalls featuring traditional and fusion dishes.",
    image: "/Modern.png",
    attendees: 3500,
    featured: false,
    rating: 4.5
  },
  {
    id: 4,
    name: "Raipur Music Festival",
    category: "Music",
    date: "September 25-26, 2025",
    time: "6:00 PM - 11:00 PM",
    location: "Indoor Stadium, Raipur",
    description: "A two-day music extravaganza featuring classical, folk, and contemporary artists from across India.",
    image: "/urban.png",
    attendees: 2800,
    featured: false,
    rating: 4.6
  },
  {
    id: 5,
    name: "Tribal Art Exhibition",
    category: "Arts",
    date: "August 5-15, 2025",
    time: "11:00 AM - 7:00 PM",
    location: "Mahant Ghasidas Museum",
    description: "Showcasing the rich artistic heritage of Chhattisgarh's tribal communities with live demonstrations by master craftspeople.",
    image: "/wildlife.jpg",
    attendees: 1500,
    featured: false,
    rating: 4.4
  },
  {
    id: 6,
    name: "Rajyotsava Cricket Tournament",
    category: "Sports",
    date: "November 5-20, 2025",
    time: "Various timings",
    location: "International Cricket Stadium",
    description: "Annual cricket tournament bringing together teams from all districts of Chhattisgarh to compete for the state trophy.",
    image: "/hero-bg.png",
    attendees: 8000,
    featured: true,
    rating: 4.3
  },
  {
    id: 7,
    name: "Dussehra Celebration",
    category: "Cultural",
    date: "October 22, 2025",
    time: "6:00 PM - 9:00 PM",
    location: "Various locations across Raipur",
    description: "Traditional celebration of good over evil with elaborate Ravana effigies and cultural performances throughout the city.",
    image: "/Traditional.png",
    attendees: 15000,
    featured: true,
    rating: 4.9
  },
  {
    id: 8,
    name: "Community Clean-up Drive",
    category: "Community",
    date: "July 12, 2025",
    time: "7:00 AM - 12:00 PM",
    location: "Starting from Telibandha Lake",
    description: "Join fellow citizens in a city-wide clean-up initiative to beautify public spaces and promote environmental awareness.",
    image: "/wildlife.jpg",
    attendees: 600,
    featured: false,
    rating: 4.2
  }
];

const featuredEvents = events.filter(event => event.featured);

const Events = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState("upcoming"); // upcoming, past, all
  
  // Filter events based on active category
  const filteredEvents = activeCategory === "All" 
    ? events 
    : events.filter(event => event.category === activeCategory);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-purple-950/5 to-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full h-96 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: "url('/Traditional.png')"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50"></div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-semibold mb-4">
              What's Happening
            </span>
            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">Events & Festivals</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover the vibrant cultural experiences and exciting activities in Raipur
            </p>
          </div>
          
          {/* Search bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white/50" />
            </div>
            <input
              type="text"
              placeholder="Search for events, festivals, or workshops..."
              className="w-full bg-white/10 backdrop-blur-lg text-white placeholder-white/50 pl-10 pr-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>
        </div>
      </section>
      
      {/* Featured Events Carousel */}
      <section className="py-12 px-4 bg-gradient-to-r from-purple-950/10 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Events</h2>
            <a href="#all-events" className="text-sm font-medium text-purple-400 flex items-center gap-1">
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.slice(0, 3).map((event) => (
              <div 
                key={event.id}
                className="rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover-lift"
              >
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${event.image})`,
                    backgroundColor: "#121a2a"
                  }}
                >
                  <div className="h-full w-full bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-purple-400" />
                      <span className="text-sm font-medium text-white">{event.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{event.name}</h3>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{event.location}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-purple-400" />
                      <span className="text-sm">{event.attendees.toLocaleString()}+ attendees</span>
                    </div>
                    <button className="text-sm text-purple-400 font-medium">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Filter & Categories */}
      <section id="all-events" className="pt-12 pb-4 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">All Events</h2>
              <p className="text-muted-foreground">Find and join the best events in Raipur</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setViewMode("upcoming")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  viewMode === "upcoming" 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                }`}
              >
                Upcoming
              </button>
              <button 
                onClick={() => setViewMode("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  viewMode === "all" 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setViewMode("past")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  viewMode === "past" 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                }`}
              >
                Past
              </button>
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10">
                <Filter className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto py-2 mb-8 hide-scrollbar">
            {categories.map((category, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                  category === activeCategory 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white/5 hover:bg-white/10 text-muted-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Main Events Listing */}
      <section ref={sectionRef} className="pb-16 px-4 scroll-reveal">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <div 
                key={event.id}
                className="flex flex-col md:flex-row bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover-lift"
              >
                <div 
                  className="md:w-1/3 h-48 md:h-auto bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${event.image})`,
                    backgroundColor: "#121a2a"  
                  }}
                />
                
                <div className="md:w-2/3 p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium mb-2">
                        {event.category}
                      </span>
                      <h3 className="text-xl font-bold">{event.name}</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium">{event.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-purple-400" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-400" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-purple-400" />
                      <span className="text-sm truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-400" />
                      <span className="text-sm">{event.attendees.toLocaleString()}+ attendees</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium transition-colors">
                      Get Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="flex justify-center mt-12">
            <button className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/5 transition-colors">
              Load More Events
            </button>
          </div>
        </div>
      </section>
      
      {/* Community Events */}
      <section className="py-16 px-4 bg-gradient-to-b from-background to-purple-950/10">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Host Your Own Event</h3>
              <button className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium transition-colors">
                Submit Event
              </button>
            </div>
            
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Have an event, workshop, or community gathering you'd like to share? Submit your event to be featured on our platform
              and reach thousands of local residents and visitors interested in discovering what Raipur has to offer.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-lg font-semibold text-purple-400 mb-2">Community Events</h4>
                <p className="text-sm text-muted-foreground">
                  Share local gatherings, workshops, and activities to help build connections within our community.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-lg font-semibold text-purple-400 mb-2">Cultural Celebrations</h4>
                <p className="text-sm text-muted-foreground">
                  Promote cultural events that showcase Chhattisgarh's rich heritage and traditions to a wider audience.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-lg font-semibold text-purple-400 mb-2">Business Networking</h4>
                <p className="text-sm text-muted-foreground">
                  Organize professional meetups, conferences, and networking opportunities for local entrepreneurs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Events;
