import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    title: "Choose Your Dates",
    description: "Pick the best time to visit Raipur based on weather and events.",
  },
  {
    title: "Book Your Stay",
    description: "Find hotels, Resorts, Airbnb options in the city.",
  },
  {
    title: "Explore Attractions",
    description: "List of all must visit places. Plan your itinerary accordingly!",
  },
  {
    title: "Local Food & Shopping",
    description: "Discover local food spots and markets for souvenirs.",
  },
];

const PlanTrip = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  return (
    <section ref={sectionRef} className="py-16 px-4 scroll-reveal">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse">Plan Your Trip</h1>
        <p className="text-lg text-muted-foreground mb-8 animate-fade-in">
          Ready to explore the streets of Raipur? Follow these simple steps to plan an unforgettable trip to the heart of Chhattisgarh!
        </p>
        <div className="space-y-8">
          {steps.map((step, idx) => (
            <div key={idx} className={`p-6 rounded-xl glass border border-accent/20 animate-fade-in delay-${idx * 100}`}>
              <h2 className="text-2xl font-semibold mb-2 text-accent">{step.title}</h2>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanTrip;
