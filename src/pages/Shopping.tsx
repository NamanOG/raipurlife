import { useScrollReveal } from "@/hooks/useScrollReveal";

const markets = [
  {
    name: "Pandri Market",
    description: "Raipur's largest market for clothes, accessories, and local goods.",
  },
  {
    name: "City Center Mall",
    description: "Modern mall with branded stores, food court, and entertainment.",
  },
  {
    name: "Gol Bazaar",
    description: "Traditional market for spices, groceries, and household items.",
  },
  {
    name: "Magneto The Mall",
    description: "Premier shopping destination with international brands.",
  },
];

const Shopping = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  return (
    <section ref={sectionRef} className="py-16 px-4 scroll-reveal">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse">Shopping & Markets</h1>
        <p className="text-lg text-muted-foreground mb-8 animate-fade-in">
          Explore Raipur's best shopping destinations, from bustling markets to modern malls.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {markets.map((market, idx) => (
            <div key={idx} className="p-6 rounded-xl glass border border-primary/20 animate-fade-in delay-100">
              <h2 className="text-2xl font-semibold mb-2 text-primary">{market.name}</h2>
              <p className="text-muted-foreground">{market.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shopping;
