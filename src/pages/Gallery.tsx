import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { Camera, Grid3X3, X, Filter, Share2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Gallery categories
const categories = [
  "All",
  "Architecture",
  "Nature",
  "Culture",
  "Food",
  "Festivals",
  "Landmarks"
];

// Gallery image data
const galleryImages = [
  {
    id: 1,
    src: "/wildlife.jpg",
    title: "Vivekananda Sarovar",
    category: "Nature",
    description: "The beautiful lake at sunset with boats"
  },
  {
    id: 2,
    src: "/Modern.png",
    title: "City Center",
    category: "Architecture",
    description: "Modern buildings in downtown Raipur"
  },
  {
    id: 3,
    src: "/Traditional.png",
    title: "Traditional Festival",
    category: "Culture",
    description: "Local celebrations showcasing Chhattisgarhi traditions"
  },
  {
    id: 4,
    src: "/urban.png",
    title: "Urban Park",
    category: "Nature",
    description: "Green spaces in the heart of the city"
  },
  {
    id: 5,
    src: "/hero-bg.png",
    title: "Night Market",
    category: "Culture",
    description: "Vibrant street vendors and local cuisine"
  },
  {
    id: 6,
    src: "/wildlife.jpg",
    title: "Landmark Monument",
    category: "Landmarks",
    description: "Historical structure representing Raipur's heritage"
  },
  {
    id: 7,
    src: "/Modern.png",
    title: "Local Cuisine",
    category: "Food",
    description: "Traditional Chhattisgarhi dishes"
  },
  {
    id: 8,
    src: "/Traditional.png",
    title: "Dussehra Celebration",
    category: "Festivals",
    description: "Annual festival with elaborate decorations"
  },
  {
    id: 9,
    src: "/urban.png",
    title: "Contemporary Art Museum",
    category: "Architecture",
    description: "Modern exhibition space for local artists"
  },
  {
    id: 10,
    src: "/hero-bg.png",
    title: "Heritage Street",
    category: "Architecture",
    description: "Colonial-era buildings preserved in the old city"
  },
  {
    id: 11,
    src: "/wildlife.jpg",
    title: "Wildlife Sanctuary",
    category: "Nature",
    description: "Protected area near Raipur with diverse flora and fauna"
  },
  {
    id: 12,
    src: "/Modern.png",
    title: "Technology Hub",
    category: "Architecture",
    description: "Innovation center showcasing Raipur's growing tech scene"
  }
];

const Gallery = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  
  // Filter images based on active category
  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-purple-950/5 to-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full h-64 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: "url('/hero-bg.png')"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/70"></div>
        
        <div className="relative z-10 text-center px-4">
          <span className="inline-block px-4 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-semibold mb-4">
            Visual Journey
          </span>
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">Raipur Gallery</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Explore the beauty and diversity of Chhattisgarh's vibrant capital through captivating images
          </p>
        </div>
      </section>
      
      {/* Filter Categories */}
      <section className="sticky top-16 z-40 bg-black/50 backdrop-blur-xl border-y border-white/10 py-4 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 overflow-x-auto py-1 hide-scrollbar">
              {categories.map((category, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                    category === activeCategory 
                      ? 'bg-secondary text-white' 
                      : 'bg-white/10 hover:bg-white/20 text-white/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <button className="hidden md:flex items-center gap-1 p-2 rounded-lg bg-white/10 hover:bg-white/20">
              <Filter className="h-4 w-4 text-white/80" />
              <span className="text-sm text-white/80">More Filters</span>
            </button>
          </div>
        </div>
      </section>
      
      {/* Main Gallery */}
      <section ref={sectionRef} className="py-16 px-4 scroll-reveal">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((img, idx) => (
              <div 
                key={img.id} 
                className="group relative overflow-hidden rounded-xl shadow-lg hover-lift cursor-pointer"
                onClick={() => setSelectedImage(img)}
              >
                <div 
                  className="w-full h-72 bg-cover bg-center bg-no-repeat"
                  style={{ 
                    backgroundImage: `url(${img.src})`,
                    backgroundColor: "#121a2a"  
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">{img.title}</h3>
                        <p className="text-sm text-white/80">{img.category}</p>
                      </div>
                      <button className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Share2 className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Category badge */}
                <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-xs font-medium text-white">
                  {img.category}
                </div>
              </div>
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="flex justify-center mt-12">
            <button className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/5 transition-colors flex items-center gap-2">
              <Grid3X3 className="h-4 w-4 text-secondary" />
              <span>Load More Images</span>
            </button>
          </div>
        </div>
      </section>
      
      {/* Photography Tips Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-secondary/5 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <Camera className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Photography Tips for Raipur</h3>
                <p className="text-muted-foreground mb-6">
                  Capture the best images of our city with these professional tips from local photographers
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-lg font-semibold text-secondary mb-2">Best Lighting</h4>
                    <p className="text-sm text-muted-foreground">
                      Visit major landmarks during golden hour (1 hour after sunrise or before sunset) for warm, dramatic lighting.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-lg font-semibold text-secondary mb-2">Local Events</h4>
                    <p className="text-sm text-muted-foreground">
                      Cultural festivals offer vibrant colors and authentic moments, especially during Dussehra and Diwali celebrations.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-lg font-semibold text-secondary mb-2">Hidden Spots</h4>
                    <p className="text-sm text-muted-foreground">
                      Explore the old city's narrow lanes and markets for authentic glimpses of daily life beyond tourist attractions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative max-w-5xl w-full rounded-xl overflow-hidden">
            <button 
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-5 w-5 text-white" />
            </button>
            
            <div className="relative">
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title} 
                className="w-full h-auto rounded-t-xl"
              />
            </div>
            
            <div className="bg-black/80 backdrop-blur-sm p-6 rounded-b-xl">
              <h2 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h2>
              <p className="text-white/80 mb-4">{selectedImage.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm">
                  {selectedImage.category}
                </span>
                
                <div className="flex gap-3">
                  <button className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Share2 className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Gallery;
