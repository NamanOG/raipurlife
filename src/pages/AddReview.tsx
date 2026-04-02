import { ChangeEvent, FormEvent, useState } from "react";
import { Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuirkyMarquee from "@/components/QuirkyMarquee";
import { useCommunityReviews } from "@/hooks/useCommunityReviews";
import { ReviewCategory } from "@/types/community";

const featuredPlaceImages = [
  { src: "/places/sarovar.jpg", label: "Vivekananda Sarovar" },
  { src: "/places/marine_drive.jpg", label: "Telibandha Marine Drive" },
  { src: "/places/museum.jpeg", label: "Mahant Ghasidas Museum" },
  { src: "/places/purkhauti.jpg", label: "Purkhouti Muktangan" },
  { src: "/places/nukkad.jpg", label: "Nukkad Chai" },
  { src: "/places/zora.jpg", label: "Zora Mall" },
];

const categoryOptions: Array<{ value: ReviewCategory; label: string; nextPath: string }> = [
  { value: "food", label: "Food", nextPath: "/food" },
  { value: "events", label: "Events", nextPath: "/events" },
  { value: "shopping", label: "Shopping", nextPath: "/shopping" },
  { value: "tourism", label: "Tourism", nextPath: "/tourism" },
];

const AddReview = () => {
  const { addReview } = useCommunityReviews();

  const [category, setCategory] = useState<ReviewCategory>("food");
  const [place, setPlace] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [visitDate, setVisitDate] = useState("");
  const [visitType, setVisitType] = useState<"solo" | "friends" | "family" | "couple" | "work">("friends");
  const [budgetRange, setBudgetRange] = useState("");
  const [bestTimeToVisit, setBestTimeToVisit] = useState("");
  const [quickTip, setQuickTip] = useState("");
  const [wouldRecommend, setWouldRecommend] = useState(true);
  const [name, setName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [preview, setPreview] = useState("");

  const onImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImageFile(file);

    if (!file) {
      setPreview("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!place.trim() || !message.trim()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitError("");

    try {
      await addReview({
        place,
        address,
        category,
        message,
        visitDate,
        visitType,
        budgetRange,
        bestTimeToVisit,
        quickTip,
        wouldRecommend,
        rating,
        authorName: name,
        isAnonymous,
        imageFile,
        imageUrl,
      });

      setPlace("");
      setAddress("");
      setMessage("");
      setRating(5);
      setVisitDate("");
      setVisitType("friends");
      setBudgetRange("");
      setBestTimeToVisit("");
      setQuickTip("");
      setWouldRecommend(true);
      setName("");
      setImageFile(null);
      setImageUrl("");
      setPreview("");
      setIsAnonymous(false);
      setSubmitMessage("Submitted. Your review is now pending moderation.");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Review could not be submitted right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden px-4 py-12 lg:py-16">
        <div className="absolute inset-0 -z-10 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/85 to-background/68" />
        <div className="absolute inset-0 -z-10 grid-fabric opacity-25" />
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <aside className="min-w-0 space-y-5">
              <article className="hero-copy-panel">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Community Form</p>
                <h1 className="mt-2 text-4xl font-bold md:text-5xl">Add your own review</h1>
                <p className="mt-4 text-muted-foreground">
                  Suggest a place with address, visit context, quick tips, star rating, and optional image upload.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  New submissions go to moderation first. After approval, they appear on public pages.
                </p>
                <div className="mt-6 grid gap-3 border-t border-border/70 pt-4 text-sm text-muted-foreground sm:grid-cols-3">
                  <p>One place at a time.</p>
                  <p>Clear notes get approved faster.</p>
                  <p>Images help with verification later.</p>
                </div>
              </article>

              <article className="overflow-hidden border border-border/70 bg-card">
                <QuirkyMarquee
                  variant={1}
                  palette="amber"
                  fullBleed={false}
                  items={[
                    "Pinpoint the address",
                    "Add best visiting time",
                    "Mention realistic budget",
                    "Drop a quick local tip",
                    "Help people plan better"
                  ]}
                />
              </article>

              <article className="card-tint border border-border/70 p-6 md:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">What makes a useful review</p>
                <h2 className="mt-2 text-3xl font-bold md:text-4xl">Add details people can use instantly</h2>
                <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                  <p>Share exact area or landmark so others can locate the place quickly.</p>
                  <p>Include budget and best time to visit so families and tourists can plan better.</p>
                  <p>Mention one practical tip like parking, rush hours, must-try item, or entry timing.</p>
                  <p>Keep your note clear and honest. Helpful reviews get approved faster and stay useful.</p>
                </div>

                <div className="mt-6 overflow-hidden border border-border/70 bg-background/70">
                  <div className="featured-marquee-track">
                    {[...featuredPlaceImages, ...featuredPlaceImages].map((item, index) => (
                      <figure key={`${item.label}-${index}`} className="w-[180px] shrink-0 overflow-hidden border border-border/70 bg-card sm:w-[220px]">
                        <img src={item.src} alt={item.label} className="h-24 w-full object-cover sm:h-28" loading="lazy" />
                        <figcaption className="px-3 py-2 text-xs font-medium text-muted-foreground">{item.label}</figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </article>
            </aside>

            <form
              onSubmit={onSubmit}
              className="glass min-w-0 border border-border/70 p-6 md:p-8 [&_input:not([type='checkbox'])]:min-w-0 [&_input:not([type='checkbox'])]:w-full [&_select]:w-full [&_textarea]:w-full"
            >
            <div className="grid gap-5">
              <label className="grid gap-2 text-sm font-medium">
                Category
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value as ReviewCategory)}
                  className="h-11 border border-border bg-background px-3 text-foreground outline-none focus:border-primary"
                >
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-medium">
                Place name
                <input
                  type="text"
                  value={place}
                  onChange={(event) => setPlace(event.target.value)}
                  placeholder="Example: Nukkad Chai"
                  className="h-11 border border-border bg-background px-3 text-foreground outline-none focus:border-primary"
                  required
                />
              </label>

              <label className="grid gap-2 text-sm font-medium">
                Address
                <input
                  type="text"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="Example: Station Road, Raipur"
                  className="h-11 border border-border bg-background px-3 text-foreground outline-none focus:border-primary"
                />
              </label>

              <label className="grid gap-2 text-sm font-medium">
                Review or suggestion
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="What should people know about this place?"
                  className="min-h-36 border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-primary"
                  required
                />
              </label>

              <div className="grid gap-2 text-sm font-medium">
                <span>Rating</span>
                <div className="flex items-center gap-2" role="radiogroup" aria-label="Select rating">
                  {[1, 2, 3, 4, 5].map((value) => {
                    const active = value <= rating;

                    return (
                      <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={rating === value}
                        onClick={() => setRating(value)}
                        className="p-1"
                      >
                        <Star
                          className={`h-6 w-6 ${active ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                        />
                      </button>
                    );
                  })}
                  <span className="ml-1 text-sm font-semibold text-foreground">{rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  Visit date
                  <input
                    type="date"
                    value={visitDate}
                    onChange={(event) => setVisitDate(event.target.value)}
                    className="h-11 border border-border bg-background px-3 text-foreground outline-none focus:border-primary"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium">
                  Visit type
                  <select
                    value={visitType}
                    onChange={(event) => setVisitType(event.target.value as "solo" | "friends" | "family" | "couple" | "work")}
                    className="h-11 border border-border bg-background px-3 text-foreground outline-none focus:border-primary"
                  >
                    <option value="solo">Solo</option>
                    <option value="friends">Friends</option>
                    <option value="family">Family</option>
                    <option value="couple">Couple</option>
                    <option value="work">Work</option>
                  </select>
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  Budget range
                  <input
                    type="text"
                    value={budgetRange}
                    onChange={(event) => setBudgetRange(event.target.value)}
                    placeholder="Example: Under Rs 500"
                    className="h-11 border border-border bg-background px-3 text-foreground outline-none focus:border-primary"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium">
                  Best time to visit
                  <input
                    type="text"
                    value={bestTimeToVisit}
                    onChange={(event) => setBestTimeToVisit(event.target.value)}
                    placeholder="Example: Evening"
                    className="h-11 border border-border bg-background px-3 text-foreground outline-none focus:border-primary"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-medium">
                Quick tip
                <input
                  type="text"
                  value={quickTip}
                  onChange={(event) => setQuickTip(event.target.value)}
                  placeholder="Example: Reach before 7 PM to avoid rush"
                  className="h-11 border border-border bg-background px-3 text-foreground outline-none focus:border-primary"
                />
              </label>

              <label className="inline-flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={wouldRecommend}
                  onChange={(event) => setWouldRecommend(event.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
                I recommend this place to others
              </label>

              <div className="grid gap-2 text-sm">
                <label className="inline-flex items-center gap-2 font-medium">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(event) => setIsAnonymous(event.target.checked)}
                    className="h-4 w-4 accent-primary"
                  />
                  Post anonymously
                </label>
              </div>

              {!isAnonymous && (
                <label className="grid gap-2 text-sm font-medium">
                  Your name
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Example: Priya"
                    className="h-11 border border-border bg-background px-3 text-foreground outline-none focus:border-primary"
                  />
                </label>
              )}

              <label className="grid gap-2 text-sm font-medium">
                Upload image
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageFileChange}
                  className="h-11 border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-primary"
                />
              </label>

              <label className="grid gap-2 text-sm font-medium">
                Or image URL
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(event) => {
                    setImageUrl(event.target.value);
                    if (event.target.value.trim()) {
                      setPreview(event.target.value.trim());
                    }
                  }}
                  placeholder="https://..."
                  className="h-11 border border-border bg-background px-3 text-foreground outline-none focus:border-primary"
                />
              </label>

              {preview && (
                <div className="overflow-hidden border border-border bg-card">
                  <img src={preview} alt="Review preview" className="h-44 w-full object-cover" />
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-11 border border-foreground bg-foreground px-6 text-sm font-semibold uppercase tracking-wide text-background transition-colors hover:bg-foreground/90 disabled:opacity-60"
              >
                {isSubmitting ? "Posting..." : "Post Review"}
              </button>

              {submitMessage && (
                <p className="text-sm font-medium text-accent">{submitMessage}</p>
              )}

              {submitError && (
                <p className="text-sm font-medium text-destructive">{submitError}</p>
              )}

              <p className="text-xs text-muted-foreground">
                Every new submission is reviewed before it appears publicly.
              </p>
            </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AddReview;
