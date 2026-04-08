import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, MessageSquare, Star, User } from "lucide-react";
import { formatReviewTimeAgo, useCommunityReviews } from "@/hooks/useCommunityReviews";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ReviewCategory } from "@/types/community";
import SmartImage from "@/components/SmartImage";

const categoryLabel: Record<ReviewCategory, string> = {
  food: "Food",
  events: "Events",
  shopping: "Shopping",
  tourism: "Tourism",
};

const CommunityReviews = () => {
  const sectionRef = useScrollReveal();
  const { latestReviews } = useCommunityReviews();

  return (
    <section ref={sectionRef} className="scroll-reveal px-4 py-16">
      <div className="container mx-auto">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Community Lens</p>
            <h3 className="mt-2 text-3xl font-bold md:text-4xl">Recent reviews from locals and visitors</h3>
            <p className="mt-3 text-muted-foreground">Your feedback powers this city guide. Add your own recommendations and tips.</p>
          </div>
          <Button asChild className="h-11 rounded-xl border border-foreground bg-foreground px-5 text-background hover:bg-foreground/90">
            <Link to="/add-review">Submit your review</Link>
          </Button>
        </div>

        <div className="divide-y divide-border border border-border">
          {latestReviews.slice(0, 4).map((review) => (
            <article key={review.id} className="grid gap-4 p-5 transition-colors duration-300 hover:bg-muted/30 md:grid-cols-[220px_1fr] md:items-start">
              <div className="relative self-start overflow-hidden border border-border/70">
                <SmartImage
                  src={review.image || "/hero-bg.png"}
                  alt={review.place}
                  fallbackQuery={review.place}
                  className="h-auto max-h-[24rem] w-full bg-muted/20 object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute left-4 top-4">
                  <Badge className="rounded-xl border border-white/30 bg-black/50 text-white">{categoryLabel[review.category]}</Badge>
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center border border-border bg-muted">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-none">{review.authorName}</p>
                      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatReviewTimeAgo(review.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {review.rating.toFixed(1)}
                  </div>
                </div>

                <h5 className="text-lg font-semibold">{review.place}</h5>
                {review.address && (
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {review.address}
                  </p>
                )}
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">"{review.message}"</p>

                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {review.visitType && <span className="border border-border/70 bg-muted px-2 py-1">Visit: {review.visitType}</span>}
                  {review.budgetRange && <span className="border border-border/70 bg-muted px-2 py-1">Budget: {review.budgetRange}</span>}
                  {review.bestTimeToVisit && <span className="border border-border/70 bg-muted px-2 py-1">Best time: {review.bestTimeToVisit}</span>}
                </div>

                {review.quickTip && <p className="mt-3 text-xs text-muted-foreground">Tip: {review.quickTip}</p>}

                <div className="mt-4 flex items-center gap-2 border-t border-border/70 pt-4 text-sm text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  {review.wouldRecommend ? "Recommended by community" : "Mixed feedback"}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild className="rounded-xl border border-border bg-card text-foreground hover:bg-muted">
            <Link to="/add-review">Add your own review</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommunityReviews;
