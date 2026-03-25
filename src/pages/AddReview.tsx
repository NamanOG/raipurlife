import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCommunityReviews } from "@/hooks/useCommunityReviews";
import { ReviewCategory } from "@/types/community";

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
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
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

    await addReview({
      place,
      category,
      message,
      authorName: name,
      isAnonymous,
      imageFile,
      imageUrl,
    });

    setPlace("");
    setMessage("");
    setName("");
    setImageFile(null);
    setImageUrl("");
    setPreview("");
    setIsAnonymous(false);
    setSubmitMessage("Submitted. Your review is now pending moderation.");
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden px-4 py-16">
        <div className="absolute inset-0 -z-10 bg-[url('/places/sarovar.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/92 to-background/78" />
        <div className="container mx-auto max-w-3xl">
          <div className="hero-copy-panel max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Community Form</p>
            <h1 className="mt-2 text-4xl font-bold md:text-5xl">Add your own review</h1>
            <p className="mt-4 text-muted-foreground">
              Suggest a place with category filters, your own name or anonymously, and optional image upload.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              New submissions go to moderation first. After approval, they appear on public pages.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-3xl">
          <form onSubmit={onSubmit} className="glass border border-border/70 p-6 md:p-8">
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
                Review or suggestion
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="What should people know about this place?"
                  className="min-h-36 border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-primary"
                  required
                />
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

              <p className="text-xs text-muted-foreground">
                Moderator access: <Link className="underline" to="/moderation">Open Moderation Panel</Link>
              </p>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AddReview;
