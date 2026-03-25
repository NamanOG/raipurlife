import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCommunityReviews } from "@/hooks/useCommunityReviews";
import SmartImage from "@/components/SmartImage";

const Moderation = () => {
  const requiredCode = import.meta.env.VITE_MODERATOR_CODE;
  const [accessCode, setAccessCode] = useState("");
  const [unlocked, setUnlocked] = useState(!requiredCode);
  const [busyId, setBusyId] = useState<string | null>(null);
  const { pendingReviews, approveReview, rejectReview } = useCommunityReviews();

  const onApprove = async (reviewId: string) => {
    setBusyId(reviewId);
    await approveReview(reviewId);
    setBusyId(null);
  };

  const onReject = async (reviewId: string) => {
    setBusyId(reviewId);
    await rejectReview(reviewId);
    setBusyId(null);
  };

  const onUnlock = () => {
    if (!requiredCode || accessCode === requiredCode) {
      setUnlocked(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {!unlocked ? (
        <section className="px-4 py-16">
          <div className="container mx-auto max-w-xl glass border border-border/70 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Restricted</p>
            <h1 className="mt-2 text-3xl font-bold">Moderator access</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Enter moderator code to review pending submissions.
            </p>
            <div className="mt-5 flex gap-2">
              <input
                type="password"
                value={accessCode}
                onChange={(event) => setAccessCode(event.target.value)}
                className="h-11 flex-1 border border-border bg-background px-3 text-foreground outline-none focus:border-primary"
                placeholder="Moderator code"
              />
              <button
                onClick={onUnlock}
                className="h-11 border border-foreground bg-foreground px-5 text-xs font-semibold uppercase tracking-wide text-background"
              >
                Unlock
              </button>
            </div>
          </div>
        </section>
      ) : (
        <>
      <section className="relative overflow-hidden px-4 py-16">
        <div className="absolute inset-0 -z-10 bg-[url('/places/Traditional.png')] bg-cover bg-center opacity-18" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/95 to-background/80" />
        <div className="container mx-auto max-w-5xl">
          <div className="hero-copy-panel max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Moderator Panel</p>
            <h1 className="mt-2 text-4xl font-bold md:text-5xl">Pending reviews</h1>
            <p className="mt-4 text-muted-foreground">
              Approve or reject community submissions before they appear publicly.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-5xl space-y-4">
          {pendingReviews.length === 0 && (
            <div className="glass border border-border/70 p-6 text-muted-foreground">
              No pending reviews right now.
            </div>
          )}

          {pendingReviews.map((review) => (
            <article key={review.id} className="overflow-hidden border border-border bg-card shadow-sm">
              <div className="grid gap-4 md:grid-cols-[220px_1fr]">
                <SmartImage
                  src={review.image || "/hero-bg.png"}
                  alt={review.place}
                  fallbackQuery={review.place}
                  className="h-full min-h-40 w-full object-cover"
                />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                      {review.category}
                    </p>
                    <p className="text-xs text-muted-foreground">{review.authorName} • pending</p>
                  </div>
                  <h3 className="mt-1 text-2xl font-semibold">{review.place}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{review.message}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      onClick={() => onApprove(review.id)}
                      disabled={busyId === review.id}
                      className="h-10 border border-foreground bg-foreground px-4 text-xs font-semibold uppercase tracking-wide text-background hover:bg-foreground/90 disabled:opacity-60"
                    >
                      {busyId === review.id ? "Working..." : "Approve"}
                    </button>
                    <button
                      onClick={() => onReject(review.id)}
                      disabled={busyId === review.id}
                      className="h-10 border border-border bg-background px-4 text-xs font-semibold uppercase tracking-wide text-foreground hover:bg-muted disabled:opacity-60"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Moderation;
