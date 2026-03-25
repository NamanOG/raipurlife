import { useState } from "react";
import { Camera, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const galleryImages = [
  { id: 1, src: "/places/sarovar.jpg", title: "Vivekananda Sarovar", category: "Nature" },
  { id: 2, src: "/places/zora.jpg", title: "City Center", category: "Architecture" },
  { id: 3, src: "/places/Traditional.png", title: "Traditional Festival", category: "Culture" },
  { id: 4, src: "/places/urban.png", title: "Urban Park", category: "Nature" },
  { id: 5, src: "/hero-bg.png", title: "Night Market", category: "Culture" },
  { id: 6, src: "/places/museum.jpeg", title: "Landmark Monument", category: "Landmark" },
  { id: 7, src: "/places/nukkad.jpg", title: "Local Cuisine", category: "Food" },
  { id: 8, src: "/places/Traditional.png", title: "Dussehra Celebration", category: "Festival" },
];

const Gallery = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden px-4 py-16">
        <div className="absolute inset-0 -z-10 bg-[url('/places/zora.jpg')] bg-cover bg-center opacity-18" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/92 to-background/78" />
        <div className="absolute inset-0 -z-10 grid-fabric opacity-35" />
        <div className="container mx-auto grid max-w-6xl items-end gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hero-copy-panel max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
              <Camera className="h-3.5 w-3.5" />
              Visual archive
            </div>
            <h1 className="text-4xl font-bold md:text-5xl">Raipur gallery</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">A quick visual pass through the city, its spaces, and its cultural moments.</p>
          </div>

          <article className="card-tint overflow-hidden shadow-xl">
            <img src="/places/marine_drive.jpg" alt="Marine Drive evening frame" className="h-44 w-full object-cover" />
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Featured frame</p>
              <p className="mt-2 text-xl font-semibold">Marine Drive twilight</p>
              <p className="mt-2 text-sm text-muted-foreground">Best photo window: post-sunset blue hour with city lights and silhouettes.</p>
            </div>
          </article>
        </div>
      </section>

      <section ref={sectionRef} className="scroll-reveal px-4 pb-14">
        <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className={`group relative overflow-hidden border border-border bg-card/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${idx % 3 === 0 ? "lg:col-span-2" : ""}`}
            >
              <img src={img.src} alt={img.title} className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-85" />
              <div className="absolute bottom-0 left-0 p-4 text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">{img.category}</p>
                <p className="mt-1 text-lg font-semibold text-white">{img.title}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {selectedImage && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/88 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl border border-white/25 bg-black shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center bg-black/70 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </button>
            <img src={selectedImage.src} alt={selectedImage.title} className="max-h-[80vh] w-full object-contain" />
            <div className="p-4 text-white">
              <p className="text-xs uppercase tracking-[0.16em] text-white/75">{selectedImage.category}</p>
              <p className="mt-1 text-xl font-semibold">{selectedImage.title}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
