import { Star, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { formatReviewTimeAgo, useCommunityReviews } from "@/hooks/useCommunityReviews";
import { useAutoPlaces } from "@/hooks/useAutoPlaces";
import SmartImage from "@/components/SmartImage";
import QuirkyMarquee from "@/components/QuirkyMarquee";

const curatedFoods = [
  {
    name: "Raipur Kitchen",
    category: "Fine Dining",
    description: "Great for a polished dinner card, with reliable food, nice ambience, and a premium city-dining feel.",
    image: "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1400",
    price: "Rs 700 - Rs 1800",
    tags: ["Premium", "Dinner", "City Dining"],
    rating: 4.9,
    location: "Raipur",
  },
  {
    name: "Cafe Oriza",
    category: "Cafe",
    description: "A solid modern cafe pick for casual meals, date nights, and a slightly upscale vibe.",
    image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1400",
    price: "Rs 400 - Rs 1200",
    tags: ["Cafe", "Date Night", "Modern"],
    rating: 4.9,
    location: "Raipur",
  },
  {
    name: "Nukkad, The Teafe",
    category: "Tea Cafe",
    description: "One of the safer local hangout-style picks for chai, snacks, and relaxed evening plans.",
    image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1400",
    price: "Rs 150 - Rs 500",
    tags: ["Chai", "Snacks", "Evening"],
    rating: 4.6,
    location: "Raipur",
  },
  {
    name: "Naivedya Sweets and Namkeen",
    category: "Vegetarian",
    description: "A dependable vegetarian favorite for snacks, sweets, and everyday family outings.",
    image: "https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=1400",
    price: "Rs 120 - Rs 600",
    tags: ["Vegetarian", "Sweets", "Family"],
    rating: 4.4,
    location: "Raipur",
  },
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
    image: "/hero-bg.png",
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
  {
    name: "Bajrang Bhog Dhaba",
    category: "North Indian",
    description: "Popular family dhaba for paneer gravies, tandoori roti, and quick dinner service.",
    image: "/places/Traditional.png",
    price: "₹180 - ₹350",
    tags: ["Dinner", "Family", "North Indian"],
    rating: 4.4,
    location: "Tatibandh",
  },
  {
    name: "Marine Drive Kulfi Stall",
    category: "Dessert",
    description: "Late-evening kulfi and falooda stop near the promenade with steady local crowd.",
    image: "/places/marine_drive.jpg",
    price: "₹40 - ₹120",
    tags: ["Dessert", "Night Snack", "Budget"],
    rating: 4.3,
    location: "Telibandha Lake",
  },
  {
    name: "Station Road Tandoori Point",
    category: "North Indian",
    description: "Late-night tandoori rolls and kebab platters with fast takeaway service.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80",
    price: "Rs 180 - Rs 420",
    tags: ["Dinner", "Tandoor", "Late Night"],
    rating: 4.4,
    location: "Station Road",
  },
  {
    name: "Pandri Family Bhoj",
    category: "Local Cuisine",
    description: "Comfort-style thali and seasonal sabzi menu with generous portions.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
    price: "Rs 140 - Rs 300",
    tags: ["Thali", "Family", "Local"],
    rating: 4.2,
    location: "Pandri",
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
        <div className="absolute inset-0 -z-10 hero-atmo" />
        <div className="container mx-auto grid max-w-6xl items-end gap-8 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="hero-copy-panel max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Food Guide</p>
            <h1 className="mt-2 text-4xl font-bold md:text-5xl">Food and culinary highlights</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Discover local favorites, trusted spots, and classic combinations that define Raipur's food culture.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {source === "osm" ? "Live food places source: OpenStreetMap" : "Showing curated food list"}
              {isLoading ? " • Syncing latest places..." : ""}
            </p>
            <div className="mt-6 grid gap-3 border-t border-border/70 pt-4 text-sm text-muted-foreground sm:grid-cols-3">
              <p>Street snacks and thali staples.</p>
              <p>Shortlist built for casual city eating.</p>
              <p>Good for breakfast runs and evening stops.</p>
            </div>
          </div>

          <article className="card-tint overflow-hidden shadow-xl">
            <SmartImage src="/places/nukkad.jpg" alt="Raipur food lane" className="h-44 w-full object-cover" />
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Featured right now</p>
              <p className="mt-2 text-xl font-semibold">Nukkad lane evening trail</p>
              <p className="mt-2 text-sm text-muted-foreground">Start with chai, then snack-hop nearby stalls in a 45-minute food walk.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="px-4 pb-8">
        <div className="container mx-auto max-w-6xl">
          <QuirkyMarquee
            variant={3}
            palette="amber"
            items={[
              "Chana samosa trail",
              "Poha before 9 AM",
              "Irani chai breaks",
              "Kulfi after sunset",
              "Budget bites under Rs 200",
            ]}
          />
        </div>
      </section>

      <section ref={sectionRef} className="scroll-reveal px-4 pb-14">
        <div className="container mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
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
              <div className="mt-3 border-t border-border/70 pt-3 text-xs text-muted-foreground">
                Community-picked spot • Recently checked
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-7xl">
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
                    {review.visitType && <span className="border border-border/70 bg-muted px-2 py-1">Visit: {review.visitType}</span>}
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

export default Food;
