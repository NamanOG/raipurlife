import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmartImage from "@/components/SmartImage";
import { formatReviewTimeAgo, useCommunityReviews } from "@/hooks/useCommunityReviews";
import { ContactMessage, ContactMessageStatus, CommunityReview, ReviewStatus } from "@/types/community";

const reviewViews: Array<{ key: ReviewStatus; label: string }> = [
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
];

const messageStatusOptions: ContactMessageStatus[] = [
  "new",
  "in_progress",
  "resolved",
  "closed",
];

const Moderation = () => {
  const [accessCode, setAccessCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [unlockError, setUnlockError] = useState("");
  const [panelError, setPanelError] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeView, setActiveView] = useState<ReviewStatus | "messages">("pending");
  const [pendingItems, setPendingItems] = useState<CommunityReview[]>([]);
  const [approvedItems, setApprovedItems] = useState<CommunityReview[]>([]);
  const [rejectedItems, setRejectedItems] = useState<CommunityReview[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const {
    isRemoteEnabled,
    canUseLocalFallbacks,
    unlockModeration,
    loadReviewsForModeration,
    loadContactMessages,
    approveReview,
    rejectReview,
    deleteReview,
    updateContactMessageStatus,
  } = useCommunityReviews();

  const refreshAdminData = useCallback(async (moderatorCode: string) => {
    setPanelError("");
    setIsRefreshing(true);

    const [pending, approved, rejected, messages] = await Promise.all([
      loadReviewsForModeration(moderatorCode, "pending"),
      loadReviewsForModeration(moderatorCode, "approved"),
      loadReviewsForModeration(moderatorCode, "rejected"),
      loadContactMessages(moderatorCode),
    ]);

    if (!pending || !approved || !rejected || !messages) {
      setPanelError("Admin data could not be loaded right now.");
      setIsRefreshing(false);
      return false;
    }

    setPendingItems(pending);
    setApprovedItems(approved);
    setRejectedItems(rejected);
    setContactMessages(messages);
    setIsRefreshing(false);
    return true;
  }, [loadContactMessages, loadReviewsForModeration]);

  useEffect(() => {
    if (!unlocked) {
      return;
    }

    void refreshAdminData(accessCode);
  }, [accessCode, refreshAdminData, unlocked]);

  const onUnlock = async () => {
    setUnlockError("");

    if (isRemoteEnabled && !accessCode.trim()) {
      setUnlockError("Moderator code is required.");
      return;
    }

    const ok = await unlockModeration(accessCode);
    if (!ok) {
      setUnlockError(isRemoteEnabled ? "Access denied. Please check moderator code." : "Admin tools are only available in local development fallback mode.");
      return;
    }

    setUnlocked(true);
  };

  const withBusyState = async (id: string, task: () => Promise<unknown>) => {
    setBusyId(id);
    setPanelError("");
    try {
      await task();
      await refreshAdminData(accessCode);
    } catch {
      setPanelError("Admin action could not be completed.");
    } finally {
      setBusyId(null);
    }
  };

  const reviewStats = useMemo(
    () => [
      { label: "Pending queue", value: pendingItems.length },
      { label: "Approved live", value: approvedItems.length },
      { label: "Rejected hidden", value: rejectedItems.length },
      {
        label: "Open messages",
        value: contactMessages.filter((message) => message.status !== "resolved" && message.status !== "closed").length,
      },
    ],
    [approvedItems.length, contactMessages, pendingItems.length, rejectedItems.length]
  );

  const currentReviewItems =
    activeView === "pending"
      ? pendingItems
      : activeView === "approved"
        ? approvedItems
        : activeView === "rejected"
          ? rejectedItems
          : [];

  const renderReviewActions = (review: CommunityReview) => {
    const busy = busyId === review.id;

    if (review.status === "pending") {
      return (
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => void withBusyState(review.id, () => approveReview(review.id, accessCode))}
            disabled={busy}
            className="h-10 border border-foreground bg-foreground px-4 text-xs font-semibold uppercase tracking-wide text-background hover:bg-foreground/90 disabled:opacity-60"
          >
            {busy ? "Working..." : "Approve"}
          </button>
          <button
            onClick={() => void withBusyState(review.id, () => rejectReview(review.id, accessCode))}
            disabled={busy}
            className="h-10 border border-border bg-background px-4 text-xs font-semibold uppercase tracking-wide text-foreground hover:bg-muted disabled:opacity-60"
          >
            Reject
          </button>
          <button
            onClick={() => void withBusyState(review.id, () => deleteReview(review.id, accessCode))}
            disabled={busy}
            className="h-10 border border-destructive/50 bg-destructive/10 px-4 text-xs font-semibold uppercase tracking-wide text-destructive hover:bg-destructive/15 disabled:opacity-60"
          >
            Remove
          </button>
        </div>
      );
    }

    if (review.status === "approved") {
      return (
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => void withBusyState(review.id, () => rejectReview(review.id, accessCode))}
            disabled={busy}
            className="h-10 border border-border bg-background px-4 text-xs font-semibold uppercase tracking-wide text-foreground hover:bg-muted disabled:opacity-60"
          >
            Hide from public
          </button>
          <button
            onClick={() => void withBusyState(review.id, () => deleteReview(review.id, accessCode))}
            disabled={busy}
            className="h-10 border border-destructive/50 bg-destructive/10 px-4 text-xs font-semibold uppercase tracking-wide text-destructive hover:bg-destructive/15 disabled:opacity-60"
          >
            Delete permanently
          </button>
        </div>
      );
    }

    return (
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() => void withBusyState(review.id, () => approveReview(review.id, accessCode))}
          disabled={busy}
          className="h-10 border border-foreground bg-foreground px-4 text-xs font-semibold uppercase tracking-wide text-background hover:bg-foreground/90 disabled:opacity-60"
        >
          Restore public
        </button>
        <button
          onClick={() => void withBusyState(review.id, () => deleteReview(review.id, accessCode))}
          disabled={busy}
          className="h-10 border border-destructive/50 bg-destructive/10 px-4 text-xs font-semibold uppercase tracking-wide text-destructive hover:bg-destructive/15 disabled:opacity-60"
        >
          Delete permanently
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {!unlocked ? (
        <section className="px-4 py-16">
          <div className="container mx-auto max-w-xl glass border border-border/70 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Restricted</p>
            <h1 className="mt-2 text-3xl font-bold">Admin access</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Enter the moderator code to unlock review and inbox controls.
            </p>
            <div className="mt-5 grid gap-3">
              {isRemoteEnabled ? (
                <input
                  type="password"
                  value={accessCode}
                  onChange={(event) => setAccessCode(event.target.value)}
                  className="h-11 border border-border bg-background px-3 text-foreground outline-none focus:border-primary"
                  placeholder="Moderator code"
                />
              ) : (
                <p className="border border-border/70 bg-muted/30 p-3 text-sm text-muted-foreground">
                  Supabase is not connected. In development, local fallback data can be opened without a code.
                </p>
              )}
              <button
                onClick={() => void onUnlock()}
                className="h-11 border border-foreground bg-foreground px-5 text-xs font-semibold uppercase tracking-wide text-background"
              >
                Unlock panel
              </button>
            </div>
            {unlockError && <p className="mt-3 text-sm text-destructive">{unlockError}</p>}
          </div>
        </section>
      ) : (
        <>
          <section className="relative overflow-hidden px-4 py-16">
            <div className="absolute inset-0 -z-10 bg-[url('/places/morning_raipur.jpg')] bg-cover bg-center opacity-18" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/95 to-background/80" />
            <div className="container mx-auto max-w-6xl">
              <div className="hero-copy-panel max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Admin panel</p>
                <h1 className="mt-2 text-4xl font-bold md:text-5xl">Reviews, removals, and inbox</h1>
                <p className="mt-4 text-muted-foreground">
                  This panel manages pending reviews, live content, hidden entries, and community messages from one place.
                </p>
                <div className="mt-6 grid gap-3 border-t border-border/70 pt-4 text-sm text-muted-foreground sm:grid-cols-3">
                  <p>{isRemoteEnabled ? "Supabase connected" : canUseLocalFallbacks ? "Local dev fallback active" : "Read-only mode"}</p>
                  <p>Use hide before permanent delete when possible.</p>
                  <p>Refresh after env or schema changes.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 pb-16">
            <div className="container mx-auto max-w-6xl space-y-6">
              <div className="grid gap-4 md:grid-cols-4">
                {reviewStats.map((stat) => (
                  <article key={stat.label} className="glass border border-border/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{stat.label}</p>
                    <p className="mt-3 text-3xl font-semibold">{stat.value}</p>
                  </article>
                ))}
              </div>

              <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                <div className="grid gap-2 sm:grid-cols-4">
                  {reviewViews.map((view) => (
                    <button
                      key={view.key}
                      onClick={() => setActiveView(view.key)}
                      className={`h-11 border px-4 text-sm font-semibold transition-colors ${
                        activeView === view.key
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-background text-foreground hover:bg-muted"
                      }`}
                    >
                      {view.label}
                    </button>
                  ))}
                  <button
                    onClick={() => setActiveView("messages")}
                    className={`h-11 border px-4 text-sm font-semibold transition-colors ${
                      activeView === "messages"
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    Messages
                  </button>
                </div>
                <button
                  onClick={() => void refreshAdminData(accessCode)}
                  disabled={isRefreshing}
                  className="h-11 border border-border bg-background px-4 text-xs font-semibold uppercase tracking-wide text-foreground hover:bg-muted disabled:opacity-60"
                >
                  {isRefreshing ? "Refreshing..." : "Refresh panel"}
                </button>
              </div>

              {panelError && (
                <div className="glass border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
                  {panelError}
                </div>
              )}

              {activeView === "messages" ? (
                <div className="space-y-4">
                  {contactMessages.length === 0 && (
                    <div className="glass border border-border/70 p-6 text-muted-foreground">
                      No contact messages right now.
                    </div>
                  )}

                  {contactMessages.map((message) => (
                    <article key={message.id} className="glass border border-border/70 p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{message.status.replace("_", " ")}</p>
                          <h2 className="mt-1 text-2xl font-semibold">{message.name}</h2>
                          <p className="mt-1 text-sm text-muted-foreground">{message.email} • {formatReviewTimeAgo(message.createdAt)}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {messageStatusOptions.map((status) => (
                            <button
                              key={status}
                              onClick={() =>
                                void withBusyState(message.id, () =>
                                  updateContactMessageStatus(message.id, status, accessCode)
                                )
                              }
                              disabled={busyId === message.id || message.status === status}
                              className="h-9 border border-border bg-background px-3 text-[11px] font-semibold uppercase tracking-wide text-foreground hover:bg-muted disabled:opacity-50"
                            >
                              {status.replace("_", " ")}
                            </button>
                          ))}
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground">{message.message}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {currentReviewItems.length === 0 && (
                    <div className="glass border border-border/70 p-6 text-muted-foreground">
                      No {activeView} reviews right now.
                    </div>
                  )}

                  {currentReviewItems.map((review) => (
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
                            <div className="text-right">
                              <p className="text-xs font-semibold text-foreground">{review.rating.toFixed(1)} / 5</p>
                              <p className="text-xs text-muted-foreground">
                                {review.authorName} • {formatReviewTimeAgo(review.createdAt)}
                              </p>
                            </div>
                          </div>
                          <h3 className="mt-1 text-2xl font-semibold">{review.place}</h3>
                          {review.address && <p className="mt-1 text-xs text-muted-foreground">Address: {review.address}</p>}
                          <p className="mt-3 text-sm text-muted-foreground">{review.message}</p>
                          <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                            {review.visitType && <span className="border border-border/70 bg-muted px-2 py-1">Visit: {review.visitType}</span>}
                            {review.budgetRange && <span className="border border-border/70 bg-muted px-2 py-1">{review.budgetRange}</span>}
                            {review.bestTimeToVisit && <span className="border border-border/70 bg-muted px-2 py-1">Best: {review.bestTimeToVisit}</span>}
                            <span className="border border-border/70 bg-muted px-2 py-1">{review.wouldRecommend ? "Recommend" : "Mixed"}</span>
                          </div>
                          {review.quickTip && <p className="mt-2 text-xs text-muted-foreground">Tip: {review.quickTip}</p>}
                          {renderReviewActions(review)}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Moderation;
