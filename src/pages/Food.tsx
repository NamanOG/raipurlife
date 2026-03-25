import { Search, Star, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { formatReviewTimeAgo, useCommunityReviews } from "@/hooks/useCommunityReviews";
import { useAutoPlaces } from "@/hooks/useAutoPlaces";
import SmartImage from "@/components/SmartImage";

const curatedFoods = [
  {
    name: "Chana Samosa",
    category: "Street Food",
    description: "A Raipur street classic with spicy chana on crispy samosa.",
    image: "/places/nukkad.jpg",
    price: "₹30 - ₹50",
    tags: ["Street Food", "Snack", "Vegetarian"],
    rating: 4.8,
    location: "Jaistambh Chowk",
  },
  {
    name: "Poha Jalebi",
    category: "Breakfast",
    description: "A popular breakfast combo balancing sweet and savory flavors.",
    image: "/places/Traditional.png",
    price: "₹40 - ₹60",
    tags: ["Breakfast", "Sweet and Savory", "Vegetarian"],
    rating: 4.7,
    location: "Sadar Bazaar",
  },
  {
    name: "Chhattisgarhi Thali",
    category: "Local Cuisine",
    description: "Traditional platter with fara, chousela, dubki kadhi, and more.",
    image: "/hero-bg.png",
    price: "₹120 - ₹200",
    tags: ["Main Course", "Local Cuisine", "Vegetarian"],
    rating: 4.6,
    location: "Various Restaurants",
  },
  {
    name: "Nukkad Chai",
    category: "Cafe",
    description: "Famous tea spot with Irani chai and quick local bites.",
    image: "/places/nukkad.jpg",
    price: "₹10 - ₹30",
    tags: ["Beverage", "Tea", "Snacks"],
    rating: 4.5,
    location: "Station Road",
  },
];

const Food = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  const { getReviewsByCategory } = useCommunityReviews();
  const communityFoodReviews = getReviewsByCategory("food");
  const { places: foods, isLoading, source } = useAutoPlaces("food", curatedFoods);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden px-4 py-20">
        <div className="absolute inset-0 -z-10 bg-[url('/places/nukkad.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/90 to-background/74" />
        <div className="container mx-auto grid max-w-6xl items-end gap-8 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="hero-copy-panel max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Food Guide</p>
            <h1 className="mt-2 text-4xl font-bold md:text-5xl">Food and culinary highlights</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Discover local favorites, trusted spots, and classic combinations that define Raipur's food culture.
            </p>
            <div className="mt-6 flex h-12 items-center gap-3 rounded-xl border border-border bg-card px-4 text-muted-foreground">
              <Search className="h-4 w-4" />
              Search dishes, restaurants, and local specialties...
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {source === "osm" ? "Live food places source: OpenStreetMap" : "Showing curated food list"}
              {isLoading ? " • Syncing latest places..." : ""}
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-border/70 bg-card/75 px-3 py-1.5 text-muted-foreground">Street icons</span>
              <span className="rounded-full border border-border/70 bg-card/75 px-3 py-1.5 text-muted-foreground">Family spots</span>
              <span className="rounded-full border border-border/70 bg-card/75 px-3 py-1.5 text-muted-foreground">Late-night bites</span>
            </div>
          </div>

          <article className="card-tint overflow-hidden shadow-xl">
            <img src="/places/nukkad.jpg" alt="Raipur food lane" className="h-44 w-full object-cover" />
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Featured right now</p>
              <p className="mt-2 text-xl font-semibold">Nukkad lane evening trail</p>
              <p className="mt-2 text-sm text-muted-foreground">Start with chai, then snack-hop nearby stalls in a 45-minute food walk.</p>
            </div>
          </article>
        </div>
      </section>

      <section ref={sectionRef} className="scroll-reveal px-4 pb-14">
        <div className="container mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          {foods.map((food) => (
            <article key={food.name} className="border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover-lift">
              <SmartImage
                src={food.image}
                alt={food.name}
                fallbackQuery={food.name}
                className="mb-4 h-44 w-full rounded-xl object-cover"
              />
              <div className="mb-2 flex items-start justify-between gap-3">
                <h2 className="text-2xl font-semibold">{food.name}</h2>
                <span className="text-sm font-semibold text-primary">{food.price}</span>
              </div>
              <p className="text-sm text-muted-foreground">{food.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(food.tags || ["Local Spot", "Community Listed"]).map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 border border-border bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{food.location}</span>
                <span className="flex items-center gap-1 font-semibold">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {food.rating}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold">Community Food Suggestions</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {communityFoodReviews.length === 0 && (
              <div className="glass border border-border/70 p-5 text-sm text-muted-foreground md:col-span-2">
                No approved food suggestions yet. New entries appear after moderation.
              </div>
            )}
            {communityFoodReviews.slice(0, 4).map((review) => (
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

export default Food;
