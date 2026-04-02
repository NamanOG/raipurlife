import { FormEvent, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmartImage from "@/components/SmartImage";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { isSupabaseConfigured, shouldUseLocalFallbacks, supabase } from "@/lib/supabase";
import { sendAdminAlert } from "@/lib/adminAlerts";

const makeLocalId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const Contact = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSubmitted(false);
    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      status: "new",
    };

    if (!payload.name || !payload.email || !payload.message) {
      setIsSubmitting(false);
      setError("Please fill all required fields.");
      return;
    }

    if (isSupabaseConfigured && supabase) {
      const { error: insertError } = await supabase
        .from("contact_messages")
        .insert(payload);

      if (insertError) {
        setIsSubmitting(false);
        setError("Message could not be sent right now. Please try again.");
        return;
      }

      void sendAdminAlert({
        type: "contact",
        payload: {
          name: payload.name,
          email: payload.email,
          message: payload.message,
        },
      });
    } else if (shouldUseLocalFallbacks) {
      const key = "raipur-contact-messages";
      const existing = JSON.parse(localStorage.getItem(key) || "[]") as Array<Record<string, string>>;
      existing.unshift({ ...payload, id: makeLocalId(), createdAt: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(existing));
    } else {
      setIsSubmitting(false);
      setError("Contact form is temporarily unavailable.");
      return;
    }

    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden px-4 py-16">
        <div className="absolute inset-0 -z-10 bg-[url('/places/sarovar.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/94 to-background/78" />
        <div className="absolute inset-0 -z-10 hero-atmo" />
        <div className="container mx-auto grid max-w-6xl items-end gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hero-copy-panel max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Community Desk</p>
            <h1 className="mt-2 text-4xl font-bold md:text-5xl">Contact and community</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Send feedback, suggest additions, or report outdated information so the guide stays useful. We also welcome advertising and sponsored content inquiries.
            </p>
            <div className="mt-6 grid gap-3 border-t border-border/70 pt-4 text-sm text-muted-foreground sm:grid-cols-3">
              <p>Corrections and route updates welcome.</p>
              <p>Best for quick factual feedback.</p>
              <p>Replies are handled manually.</p>
            </div>
          </div>

          <article className="card-tint overflow-hidden shadow-xl">
            <SmartImage src="/places/sarovar.jpg" alt="Raipur community desk" className="h-44 w-full object-cover" />
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Reach the team</p>
              <p className="mt-2 text-xl font-semibold">Updates, reports, and suggestions</p>
              <p className="mt-2 text-sm text-muted-foreground">Help us keep routes, timings, and place details fresh for everyone.</p>
            </div>
          </article>
        </div>
      </section>

      <section ref={sectionRef} className="scroll-reveal px-4 pb-16">
        <div className="container mx-auto grid max-w-6xl gap-6 md:grid-cols-[1fr_0.9fr]">
          <form
            onSubmit={onSubmit}
            className="glass min-w-0 border border-border/70 p-6 md:p-8 [&_input:not([type='checkbox'])]:min-w-0 [&_input:not([type='checkbox'])]:w-full [&_select]:w-full [&_textarea]:w-full"
          >
            <h2 className="text-2xl font-semibold">Send us a message</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium">
                Name
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your Name"
                  className="h-11 border border-border bg-background px-3 text-foreground outline-none focus:border-primary"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Email
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your Email"
                  className="h-11 border border-border bg-background px-3 text-foreground outline-none focus:border-primary"
                />
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-sm font-medium">
              Message
              <textarea
                required
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Share your suggestion, review idea, or correction"
                className="min-h-36 border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-primary"
              />
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 h-11 border border-foreground bg-foreground px-6 text-sm font-semibold uppercase tracking-wide text-background transition-colors hover:bg-foreground/90 disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send message"}
            </button>
            {submitted && <p className="mt-3 text-sm text-accent">Thanks. We received your message.</p>}
            {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
          </form>

          <aside className="glass border border-border/70 p-6 md:p-8">
            <h3 className="text-2xl font-semibold">Other ways to connect</h3>
            <div className="mt-5 space-y-4 text-sm text-muted-foreground">
              <p>Email: hello.raipur.life@gmail.com</p>
              <p>Community submissions: Add Review page</p>
              <p>Response time: within 12-24 hours</p>
            </div>
            <div className="mt-6 border border-border bg-card p-4">
              <p className="text-sm font-medium">Tip:</p>
              <p className="mt-2 text-sm text-muted-foreground">For place suggestions, include exact location and one image for faster review.</p>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
