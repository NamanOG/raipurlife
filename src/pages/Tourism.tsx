import { Clock, MapPin, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { formatReviewTimeAgo, useCommunityReviews } from "@/hooks/useCommunityReviews";
import { useAutoPlaces } from "@/hooks/useAutoPlaces";
import SmartImage from "@/components/SmartImage";
import QuirkyMarquee from "@/components/QuirkyMarquee";

const curatedPlaces = [
  {
    name: "Swami Vivekananda Sarovar",
    category: "Nature",
    description: "A beautiful lake perfect for evening strolls and boating with panoramic sunset views.",
    image: "/places/sarovar.jpg",
    rating: 4.7,
    location: "Central Raipur",
    hours: "5:00 AM - 9:00 PM",
  },
  {
    name: "Mahant Ghasidas Museum",
    category: "Culture",
    description: "Showcasing Chhattisgarh's rich tribal heritage and history with fascinating artifacts.",
    image: "/places/museum.jpeg",
    rating: 4.5,
    location: "Gandhi Chowk",
    hours: "10:00 AM - 5:30 PM",
  },
  {
    name: "Purkhouti Muktangan",
    category: "Culture",
    description: "Open-air museum displaying tribal life and traditions with immersive exhibits.",
    image: "/places/purkhauti.jpg",
    rating: 4.6,
    location: "Naya Raipur",
    hours: "9:00 AM - 6:00 PM",
  },
  {
    name: "Magneto The Mall",
    category: "Shopping",
    description: "Premier destination for brands, dining, and indoor entertainment zones.",
    image: "/places/urban.png",
    rating: 4.3,
    location: "GE Road",
    hours: "11:00 AM - 10:00 PM",
  },
  {
    name: "Dudhadhari Math",
    category: "Heritage",
    description: "A historic temple complex with quiet courtyards and murals connected to Raipur's old roots.",
    image: "/places/dudhadhari.png",
    rating: 4.4,
    location: "Dudhadhari, Raipur",
    hours: "6:00 AM - 8:00 PM",
  },
  {
    name: "Telibandha Marine Drive",
    category: "Nature",
    description: "Evening promenade for walking, street bites, and city skyline reflections by the lake.",
    image: "/places/marine_drive.jpg",
    rating: 4.5,
    location: "Telibandha Lake",
    hours: "5:00 AM - 11:00 PM",
  },
  {
    name: "Nandan Van Jungle Safari",
    category: "Nature",
    description: "Green safari-style park area with lakeside sections and family walking routes.",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1400&q=80",
    rating: 4.3,
    location: "Naya Raipur",
    hours: "9:00 AM - 6:00 PM",
  },
  {
    name: "Banjari Mata Temple Circuit",
    category: "Heritage",
    description: "Popular devotional stop with active local footfall and neighborhood market lanes nearby.",
    image: "https://images.unsplash.com/photo-1594387295585-f9c3f29f4bf6?auto=format&fit=crop&w=1400&q=80",
    rating: 4.2,
    location: "Raipur Outskirts",
    hours: "6:00 AM - 9:00 PM",
  },
];

const Tourism = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  const { getReviewsByCategory } = useCommunityReviews();
  const communityTourismReviews = getReviewsByCategory("tourism");
  const { places, isLoading, source } = useAutoPlaces("tourism", curatedPlaces);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden px-4 py-20">
        <div className="absolute inset-0 -z-10 bg-[url('/places/barnawapara.jpg')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/88 to-background/68" />
        <div className="absolute inset-0 -z-10 hero-atmo" />
        <div className="container mx-auto grid max-w-6xl items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="hero-copy-panel max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Tourism</p>
            <h1 className="mt-3 text-4xl font-bold md:text-6xl">Explore Raipur destinations</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Discover cultural landmarks, lakes, and iconic places that define the city experience.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {source === "osm" ? "Live places source: OpenStreetMap" : "Showing curated places list"}
              {isLoading ? " • Syncing latest places..." : ""}
            </p>
            <div className="mt-6 grid gap-3 border-t border-border/70 pt-4 text-sm text-muted-foreground sm:grid-cols-3">
              <p>Landmarks and quieter green spaces.</p>
              <p>Works well for family routes.</p>
              <p>Best explored between October and February.</p>
            </div>
          </div>

          <article className="card-tint overflow-hidden shadow-xl">
            <SmartImage src="/places/sarovar.jpg" alt="Vivekananda Sarovar" className="h-44 w-full object-cover" />
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Featured right now</p>
              <p className="mt-2 text-xl font-semibold">Sunset Walk at Vivekananda Sarovar</p>
              <p className="mt-2 text-sm text-muted-foreground">Golden-hour boat rides, food stalls, and calm evening breeze in the city center.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="px-4 pb-8">
        <div className="container mx-auto max-w-6xl">
          <QuirkyMarquee
            variant={1}
            palette="mint"
            items={[
              "Sarovar sunset walks",
              "Museum heritage loop",
              "Dudhadhari morning visit",
              "Marine Drive nights",
              "Family route ready",
            ]}
          />
        </div>
      </section>

      <section className="px-4 pb-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-3 md:grid-cols-3">
            <article className="card-tint p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Best season</p>
              <p className="mt-1 text-lg font-semibold">Oct to Feb</p>
            </article>
            <article className="card-tint p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Ideal duration</p>
              <p className="mt-1 text-lg font-semibold">2 to 3 days</p>
            </article>
            <article className="card-tint p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Travel mode</p>
              <p className="mt-1 text-lg font-semibold">Cab + local walk trails</p>
            </article>
          </div>
        </div>
      </section>

      <section ref={sectionRef} className="scroll-reveal px-4 pb-14">
        <div className="container mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {places.map((place) => (
            <article key={place.name} className="card-tint overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover-lift">
              <SmartImage
                src={place.image}
                alt={place.name}
                fallbackQuery={place.name}
                className="h-52 w-full object-cover"
              />
              <div className="p-5">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">{place.category}</p>
                  <div className="flex items-center gap-1 text-sm font-semibold">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {place.rating}
                  </div>
                </div>
                <h2 className="text-2xl font-semibold">{place.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{place.description}</p>
                <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {place.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    {place.hours || "Check locally"}
                  </div>
                </div>
                <div className="mt-4 border-t border-border/70 pt-3 text-xs text-muted-foreground">
                  Community-picked spot • Recently checked
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold">Community Tourism Suggestions</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {communityTourismReviews.length === 0 && (
              <div className="glass border border-border/70 p-5 text-sm text-muted-foreground md:col-span-2">
                No approved tourism suggestions yet. New entries appear after moderation.
              </div>
            )}
            {communityTourismReviews.slice(0, 4).map((review) => (
              <article key={review.id} className="overflow-hidden border border-border bg-card shadow-sm hover-lift">
                <SmartImage
                  src={review.image || "/hero-bg.png"}
                  alt={review.place}
                  fallbackQuery={review.place}
                  className="h-44 w-full object-cover"
                />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold">{review.place}</h3>
                    <p className="inline-flex items-center gap-1 text-sm font-semibold">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      {review.rating.toFixed(1)}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{review.message}</p>
                  {review.address && <p className="mt-2 text-xs text-muted-foreground">Address: {review.address}</p>}
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {review.visitType && <span className="border border-border/70 bg-muted px-2 py-1">Visit: {review.visitType}</span>}
                    {review.bestTimeToVisit && <span className="border border-border/70 bg-muted px-2 py-1">Best: {review.bestTimeToVisit}</span>}
                  </div>
                  {review.quickTip && <p className="mt-2 text-xs text-muted-foreground">Tip: {review.quickTip}</p>}
                  <p className="mt-3 text-xs text-muted-foreground">
                    By {review.authorName} • {formatReviewTimeAgo(review.createdAt)} • {review.wouldRecommend ? "Recommended" : "Mixed"}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tourism;
