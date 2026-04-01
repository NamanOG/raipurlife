import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { formatReviewTimeAgo, useCommunityReviews } from "@/hooks/useCommunityReviews";
import { useAutoPlaces } from "@/hooks/useAutoPlaces";
import SmartImage from "@/components/SmartImage";
import { Star } from "lucide-react";
import QuirkyMarquee from "@/components/QuirkyMarquee";

const curatedMarkets = [
  {
    name: "Gol Bazaar",
    category: "Local Market",
    description: "A classic local market pick for busy streets, variety, and that proper old-city shopping feel.",
    image: "https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg?auto=compress&cs=tinysrgb&w=1400",
    location: "Gol Bazaar, Raipur",
    rating: 4.0,
  },
  {
    name: "Danganiya Bazaar",
    category: "Everyday Bazaar",
    description: "Good local-market option if you want a crowded everyday bazaar vibe instead of a mall experience.",
    image: "https://images.pexels.com/photos/346734/pexels-photo-346734.jpeg?auto=compress&cs=tinysrgb&w=1400",
    location: "Danganiya, Raipur",
    rating: 3.8,
  },
  {
    name: "Katora Talab Market",
    category: "Neighborhood Market",
    description: "Nice market-style card for neighborhood shopping, casual browsing, and a more local city experience.",
    image: "https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=1400",
    location: "Katora Talab, Raipur",
    rating: 3.8,
  },
  {
    name: "Pandri Market",
    category: "Market",
    description: "Raipur's biggest shopping belt for clothes, accessories, and local finds.",
    image: "/places/morning_raipur.jpg",
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
    name: "Gol Bazar (Classic Strip)",
    category: "Traditional Market",
    description: "Dense old-city market known for fabrics, pooja items, utensils, and festive shopping.",
    image: "/places/Traditional.png",
    location: "Gol Bazar, Raipur",
    rating: 4.3,
  },
  {
    name: "Shastri Market",
    category: "Budget Bazaar",
    description: "Good place for affordable clothing and accessory bundles with active bargaining culture.",
    image: "/places/dudhadhari.png",
    location: "Shastri Chowk",
    rating: 4.1,
  },
  {
    name: "Devendra Nagar Retail Street",
    category: "Lifestyle Street",
    description: "Cluster of fashion, footwear, and cafe stops ideal for evening shopping rounds.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80",
    location: "Devendra Nagar",
    rating: 4.2,
  },
  {
    name: "City Handloom Outlet",
    category: "Ethnic",
    description: "Reliable store for handloom sarees, kurtas, and gifting sets inspired by Chhattisgarh craft.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1400&q=80",
    location: "Civil Lines",
    rating: 4.3,
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
        <div className="absolute inset-0 -z-10 bg-[url('/places/morning_raipur.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/90 to-background/75" />
        <div className="absolute inset-0 -z-10 hero-atmo" />
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
            <div className="mt-6 grid gap-3 border-t border-border/70 pt-4 text-sm text-muted-foreground sm:grid-cols-3">
              <p>Best for mixed street and mall shopping.</p>
              <p>Most routes work well in the evening.</p>
              <p>Pair market runs with a food stop nearby.</p>
            </div>
          </div>

          <article className="card-tint overflow-hidden shadow-xl">
            <SmartImage src="/places/morning_raipur.jpg" alt="Raipur shopping district" className="h-44 w-full object-cover" />
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Shopping spotlight</p>
              <p className="mt-2 text-xl font-semibold">Pandri to mall route</p>
              <p className="mt-2 text-sm text-muted-foreground">Do local market picks first, then finish with branded stores and dinner stop.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="px-4 pb-8">
        <div className="container mx-auto max-w-6xl">
          <QuirkyMarquee
            variant={2}
            palette="slate"
            items={[
              "Pandri bargain loops",
              "Gol Bazar textile lanes",
              "Mall + market combo route",
              "Evening shopping runs",
              "Festive season essentials",
            ]}
            reverse
          />
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
              <div className="mt-4 flex items-start justify-between gap-3">
                <h2 className="text-2xl font-semibold">{market.name}</h2>
                <div className="inline-flex items-center gap-1 text-sm font-semibold">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {market.rating.toFixed(1)}
                </div>
              </div>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-secondary">{market.category}</p>
              <p className="mt-2 text-sm text-muted-foreground">{market.location}</p>
              <p className="mt-3 text-muted-foreground">{market.description}</p>
              <div className="mt-4 border-t border-border/70 pt-3 text-xs text-muted-foreground">
                <p>
                  {market.reviewsCount?.toLocaleString("en-IN")} reviews • {market.reviewerName} • {market.reviewTimeAgo}
                </p>
              </div>
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
                    {review.budgetRange && <span className="border border-border/70 bg-muted px-2 py-1">{review.budgetRange}</span>}
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

export default Shopping;
