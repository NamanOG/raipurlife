import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { formatReviewTimeAgo, useCommunityReviews } from "@/hooks/useCommunityReviews";
import { useAutoPlaces } from "@/hooks/useAutoPlaces";
import SmartImage from "@/components/SmartImage";

const curatedMarkets = [
  {
    name: "Pandri Market",
    category: "Market",
    description: "Raipur's biggest shopping belt for clothes, accessories, and local finds.",
    image: "/places/zora.jpg",
    location: "Pandri, Raipur",
    rating: 4.5,
  },
  {
    name: "Ambuja City Center Mall",
    category: "Mall",
    description: "A modern mall setup with popular brands, food court, and entertainment.",
    image: "/places/urban.png",
    location: "GE Road",
    rating: 4.4,
  },
  {
    name: "Gol Bazaar",
    category: "Bazaar",
    description: "Traditional market for spices, groceries, and household shopping.",
    image: "/hero-bg.png",
    location: "Gol Bazar, Raipur",
    rating: 4.3,
  },
  {
    name: "Zora Mall",
    category: "Mall",
    description: "Premium shopping option with brands, cafes, and family-friendly spaces.",
    image: "/places/zora.jpg",
    location: "Labhandi",
    rating: 4.2,
  },
];

const Shopping = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  const { getReviewsByCategory } = useCommunityReviews();
  const communityShoppingReviews = getReviewsByCategory("shopping");
  const { places: markets, isLoading, source } = useAutoPlaces("shopping", curatedMarkets);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="relative overflow-hidden px-4 py-20">
        <div className="absolute inset-0 -z-10 bg-[url('/places/zora.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/90 to-background/75" />
        <div className="container mx-auto grid max-w-6xl items-end gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="hero-copy-panel max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Shopping Guide</p>
            <h1 className="mt-2 text-4xl font-bold md:text-5xl">Shopping and markets in Raipur</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Compare local bazaars and modern malls to plan your next city shopping run.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {source === "osm" ? "Live shopping places source: OpenStreetMap" : "Showing curated market list"}
              {isLoading ? " • Syncing latest places..." : ""}
            </p>
          </div>

          <article className="card-tint overflow-hidden shadow-xl">
            <img src="/places/zora.jpg" alt="Raipur shopping district" className="h-44 w-full object-cover" />
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Shopping spotlight</p>
              <p className="mt-2 text-xl font-semibold">Pandri to mall route</p>
              <p className="mt-2 text-sm text-muted-foreground">Do local market picks first, then finish with branded stores and dinner stop.</p>
            </div>
          </article>
        </div>
      </section>

      <section ref={sectionRef} className="scroll-reveal px-4 pb-14">
        <div className="container mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          {markets.map((market) => (
            <article key={market.name} className="glass border border-border/70 p-4 hover-lift">
              <SmartImage
                src={market.image}
                alt={market.name}
                fallbackQuery={market.name}
                className="h-44 w-full rounded-xl object-cover"
              />
              <h2 className="mt-4 text-2xl font-semibold">{market.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{market.location}</p>
              <p className="mt-3 text-muted-foreground">{market.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold">Community Shopping Suggestions</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {communityShoppingReviews.length === 0 && (
              <div className="glass border border-border/70 p-5 text-sm text-muted-foreground md:col-span-2">
                No approved shopping suggestions yet. New entries appear after moderation.
              </div>
            )}
            {communityShoppingReviews.slice(0, 4).map((review) => (
              <article key={review.id} className="overflow-hidden border border-border bg-card shadow-sm hover-lift">
                <SmartImage
                  src={review.image || "/hero-bg.png"}
                  alt={review.place}
                  fallbackQuery={review.place}
                  className="h-44 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{review.place}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{review.message}</p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    By {review.authorName} • {formatReviewTimeAgo(review.createdAt)}
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

export default Shopping;
