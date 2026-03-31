import { useState } from "react";
import { Camera, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SmartImage from "@/components/SmartImage";

const galleryImages = [
  { id: 1, src: "/places/sarovar.jpg", title: "Vivekananda Sarovar", category: "Nature", note: "City lake edge and the Vivekananda statue." },
  { id: 2, src: "/places/purkhauti.jpg", title: "Purkhouti Muktangan", category: "Culture", note: "Outdoor heritage installations and sculptural forms." },
  { id: 3, src: "/places/museum.jpeg", title: "Mahant Ghasidas Museum", category: "Museum", note: "Artifact rooms and archival displays from the region." },
  { id: 4, src: "/places/dudhadhari.png", title: "Dudhadhari Math", category: "Heritage", note: "Temple complex with a quieter historic atmosphere." },
  { id: 5, src: "/places/zora.jpg", title: "Zora Mall", category: "Retail", note: "Contemporary shopping frontage in Raipur." },
  { id: 6, src: "/places/morning_raipur.jpg", title: "Raipur Streetscape", category: "City Retail", note: "City frontage and boulevard atmosphere around newer commercial stretches." },
  { id: 7, src: "/places/marine_drive.jpg", title: "Marine Drive", category: "Evening Walk", note: "Waterfront signage and blue-hour city light reflections." },
  { id: 8, src: "/places/morning_raipur.jpg", title: "City Procession", category: "Culture", note: "Public gathering atmosphere and everyday civic movement in Raipur." },
];

const Gallery = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden px-4 py-16">
        <div className="absolute inset-0 -z-10 bg-[url('/places/marine_drive.jpg')] bg-cover bg-center opacity-18" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/92 to-background/78" />
        <div className="absolute inset-0 -z-10 grid-fabric opacity-35" />
        <div className="container mx-auto grid max-w-6xl items-end gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hero-copy-panel max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 border border-border bg-card px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
              <Camera className="h-3.5 w-3.5" />
              Visual archive
            </div>
            <h1 className="text-4xl font-bold md:text-5xl">Raipur gallery</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">A quick visual pass through the city, its spaces, and its cultural moments.</p>
            <div className="mt-6 grid gap-3 border-t border-border/70 pt-4 text-sm text-muted-foreground sm:grid-cols-3">
              <p>Landmarks, markets, and evening scenes.</p>
              <p>Built from stable local launch assets.</p>
              <p>Deliberately small, not a noisy photo wall.</p>
            </div>
          </div>

          <article className="card-tint overflow-hidden shadow-xl">
            <SmartImage src="/places/marine_drive.jpg" alt="Marine Drive evening frame" className="h-52 w-full object-cover" />
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Featured frame</p>
              <p className="mt-2 text-xl font-semibold">Marine Drive twilight</p>
              <p className="mt-2 text-sm text-muted-foreground">Best photo window: post-sunset blue hour with city lights and silhouettes.</p>
            </div>
          </article>
        </div>
      </section>

      <section ref={sectionRef} className="scroll-reveal px-4 pb-14">
        <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
          {galleryImages.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className={`group relative overflow-hidden border border-border bg-card/80 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                idx === 0 ? "lg:col-span-6 lg:row-span-2" : idx === 1 || idx === 2 ? "lg:col-span-3" : "lg:col-span-3"
              }`}
            >
              <SmartImage
                src={img.src}
                alt={img.title}
                fallbackQuery={img.title}
                className={`${idx === 0 ? "h-[32rem]" : "h-64"} w-full object-cover transition-transform duration-500 group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/18 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 max-w-[28rem] p-4 text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">{img.category}</p>
                <p className="mt-1 text-lg font-semibold text-white">{img.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/78">{img.note}</p>
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
            <SmartImage src={selectedImage.src} alt={selectedImage.title} className="max-h-[80vh] w-full object-contain" />
            <div className="p-4 text-white">
              <p className="text-xs uppercase tracking-[0.16em] text-white/75">{selectedImage.category}</p>
              <p className="mt-1 text-xl font-semibold">{selectedImage.title}</p>
              <p className="mt-2 text-sm text-white/78">{selectedImage.note}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
