import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Interest = "food" | "culture" | "shopping" | "nature";

const interestOptions: Array<{ id: Interest; label: string; places: string[] }> = [
  {
    id: "food",
    label: "Food",
    places: ["Nukkad Chai", "Chhattisgarhi Thali House", "Gol Bazaar Snack Trail"],
  },
  {
    id: "culture",
    label: "Culture",
    places: ["Mahant Ghasidas Museum", "Purkhouti Muktangan", "Dudhadhari Math"],
  },
  {
    id: "shopping",
    label: "Shopping",
    places: ["Pandri Market", "Zora Mall", "Ambuja City Center Mall"],
  },
  {
    id: "nature",
    label: "Nature",
    places: ["Vivekananda Sarovar", "Buddha Talab", "Jungle Safari Barnawapara"],
  },
];

const PlanTrip = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  const [days, setDays] = useState(2);
  const [budget, setBudget] = useState<"low" | "mid" | "premium">("mid");
  const [interests, setInterests] = useState<Interest[]>(["food", "culture"]);

  const itinerary = useMemo(() => {
    const selected = interestOptions.filter((option) => interests.includes(option.id));
    const pool = selected.flatMap((option) => option.places);

    if (pool.length === 0) {
      return [];
    }

    const totalStops = Math.min(pool.length, Math.max(3, days * 3));
    return pool.slice(0, totalStops);
  }, [days, interests]);

  const estimatedCost = useMemo(() => {
    const multiplier = budget === "low" ? 1200 : budget === "mid" ? 2200 : 3800;
    return multiplier * days;
  }, [budget, days]);

  const toggleInterest = (interest: Interest) => {
    setInterests((current) =>
      current.includes(interest)
        ? current.filter((value) => value !== interest)
        : [...current, interest]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden px-4 py-16">
        <div className="absolute inset-0 -z-10 bg-[url('/places/urban.png')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/92 to-background/75" />
        <div className="absolute inset-0 -z-10 grid-fabric opacity-25" />
        <div className="container mx-auto grid max-w-6xl items-end gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hero-copy-panel max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Trip Builder</p>
            <h1 className="mt-2 text-4xl font-bold md:text-5xl">Plan your Raipur trip in minutes</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Pick your style, duration, and interests. Get a practical route you can start using right away.
            </p>
          </div>

          <article className="card-tint overflow-hidden shadow-xl">
            <img src="/places/marine_drive.jpg" alt="Raipur route preview" className="h-44 w-full object-cover" />
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Sample route</p>
              <p className="mt-2 text-xl font-semibold">One-day city loop</p>
              <p className="mt-2 text-sm text-muted-foreground">Sarovar sunrise, museum midday, market stop, and evening food trail.</p>
            </div>
          </article>
        </div>
      </section>

      <section ref={sectionRef} className="scroll-reveal px-4 pb-16">
        <div className="container mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="glass border border-border/70 p-6 shadow-lg">
            <h2 className="text-2xl font-semibold">Trip preferences</h2>
            <div className="mt-5 grid gap-5">
              <label className="grid gap-2 text-sm font-medium">
                Number of days
                <input
                  type="range"
                  min={1}
                  max={7}
                  value={days}
                  onChange={(event) => setDays(Number(event.target.value))}
                />
                <span className="text-muted-foreground">{days} day{days > 1 ? "s" : ""}</span>
              </label>

              <label className="grid gap-2 text-sm font-medium">
                Budget style
                <select
                  value={budget}
                  onChange={(event) => setBudget(event.target.value as "low" | "mid" | "premium")}
                  className="h-11 border border-border bg-background px-3 text-foreground outline-none focus:border-primary"
                >
                  <option value="low">Low budget</option>
                  <option value="mid">Mid range</option>
                  <option value="premium">Premium</option>
                </select>
              </label>

              <div className="grid gap-2 text-sm font-medium">
                Interests
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => toggleInterest(option.id)}
                      className={`h-10 border px-4 text-xs font-semibold uppercase tracking-wide transition-all duration-300 ${
                        interests.includes(option.id)
                          ? "border-foreground bg-foreground text-background shadow-md"
                          : "border-border bg-background text-foreground hover:-translate-y-0.5 hover:bg-muted"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="glass border border-border/70 p-6 shadow-lg">
            <h2 className="text-2xl font-semibold">Generated itinerary</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Estimated budget: ₹{estimatedCost.toLocaleString()} total
            </p>

            <div className="mt-5 space-y-3">
              {itinerary.length === 0 && (
                <p className="text-sm text-muted-foreground">Choose at least one interest to generate your route.</p>
              )}
              {itinerary.map((place, index) => (
                <article key={place} className="grid grid-cols-[auto_1fr] items-start gap-3 border border-border bg-card/90 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                  <div className="grid h-8 w-8 place-items-center border border-foreground bg-foreground text-xs font-bold text-background shadow-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold">{place}</p>
                    <p className="text-xs text-muted-foreground">Best visited around Day {Math.min(days, Math.floor(index / 3) + 1)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PlanTrip;
