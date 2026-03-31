import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SmartImage from "@/components/SmartImage";

const featuredPlaces = [
  {
    id: 1,
    name: "Swami Vivekananda Sarovar",
    category: "Nature",
    rating: 4.5,
    reviews: 1234,
    image: "/places/sarovar.jpg",
    description: "Beautiful artificial lake with boating facilities and scenic walkways, perfect for evening strolls",
    location: "Kota, Raipur",
    timing: "5:00 AM - 9:00 PM",
    price: "Free",
    tags: ["Lake", "Boating", "Picnic Spot", "Evening Walk"],
  },
  {
    id: 2,
    name: "Mahant Ghasidas Memorial Museum",
    category: "Tourism",
    rating: 4.3,
    reviews: 856,
    image: "/places/museum.jpeg",
    description: "Renowned museum showcasing Chhattisgarh's rich tribal culture, ancient sculptures, and archaeological artifacts",
    location: "Civil Lines, Raipur",
    timing: "10:00 AM - 5:00 PM (Closed Monday)",
    price: "₹",
    tags: ["Museum", "History", "Tribal Art", "Educational"],
  },
  {
    id: 3,
    name: "Purkhouti Muktangan",
    category: "Tourism",
    rating: 4.4,
    reviews: 967,
    image: "/places/purkhauti.jpg",
    description: "Open-air museum displaying tribal life, culture, and traditions of Chhattisgarh with authentic huts and artifacts",
    location: "Naya Raipur",
    timing: "9:00 AM - 6:00 PM",
    price: "₹₹",
    tags: ["Cultural", "Tribal Heritage", "Open Air", "Photography"],
  },
  {
    id: 4,
    name: "Guru Tegh Bahadur Gurudwara",
    category: "Religious",
    rating: 4.6,
    reviews: 534,
    image: "/places/dudhadhari.png",
    description: "Historic Sikh temple and one of the oldest gurudwaras in Chhattisgarh, known for its peaceful atmosphere",
    location: "Ganj, Raipur",
    timing: "4:00 AM - 10:00 PM",
    price: "Free",
    tags: ["Religious", "Historic", "Peaceful", "Langar"],
  },
  {
    id: 5,
    name: "Magneto The Mall",
    category: "Shopping",
    rating: 4.2,
    reviews: 1523,
    image: "/places/urban.png",
    description: "Premier shopping destination in Raipur with branded stores, food court, and entertainment options",
    location: "G.E. Road, Raipur",
    timing: "10:00 AM - 10:00 PM",
    price: "₹₹₹",
    tags: ["Shopping", "Food Court", "Brands", "Entertainment"],
  },
  {
    id: 6,
    name: "Dudhadhari Math Temple",
    category: "Religious",
    rating: 4.4,
    reviews: 789,
    image: "/places/dudhadhari.png",
    description: "Ancient Hindu temple complex known for its beautiful architecture and spiritual significance",
    location: "Arang Road, Raipur",
    timing: "5:00 AM - 8:00 PM",
    price: "Free",
    tags: ["Temple", "Architecture", "Spiritual", "Ancient"],
  },
];

const FeaturedPlaces = () => {
  const sectionRef = useScrollReveal();
  const leadPlace = featuredPlaces[0];
  const compactPlaces = featuredPlaces.slice(1, 6);

  return (
    <section ref={sectionRef} className="scroll-reveal px-4 py-16">
      <div className="container mx-auto">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Popular Picks</p>
          <h3 className="mt-2 text-3xl font-bold md:text-4xl">Featured places in and around Raipur</h3>
          <p className="mt-3 text-muted-foreground">Handpicked recommendations from residents and repeat travelers who know the city best.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="group overflow-hidden border-border/70 bg-card shadow-sm">
            <div className="relative overflow-hidden">
              <SmartImage
                src={leadPlace.image}
                alt={leadPlace.name}
                fallbackQuery={leadPlace.name}
                className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <Badge className="rounded-xl border border-white/30 bg-black/45 text-white">Lead pick</Badge>
                <Badge className="rounded-xl border border-white/30 bg-black/45 text-white">{leadPlace.category}</Badge>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="mb-2 flex items-start justify-between gap-3">
                <h4 className="text-2xl font-semibold leading-tight">{leadPlace.name}</h4>
                <span className="text-sm font-semibold text-primary">{leadPlace.price}</span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{leadPlace.description}</p>
              <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />{leadPlace.location}</p>
                <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />{leadPlace.timing}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {leadPlace.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} className="rounded-xl border border-border bg-muted text-muted-foreground hover:bg-muted">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="divide-y divide-border border border-border">
            {compactPlaces.map((place) => (
              <article key={place.id} className="grid gap-3 p-4 transition-colors duration-300 hover:bg-muted/30 sm:grid-cols-[120px_1fr]">
                <SmartImage
                  src={place.image}
                  alt={place.name}
                  fallbackQuery={place.name}
                  className="h-24 w-full border border-border/70 object-cover"
                />
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-base font-semibold leading-tight">{place.name}</h4>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold"><Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" /> {place.rating}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{place.location}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{place.description}</p>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{place.reviews.toLocaleString()} reviews</span>
                    <span className="text-muted-foreground">{place.price}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlaces;
