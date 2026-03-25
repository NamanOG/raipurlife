import { Quote, Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const stories = [
  {
    name: "Priya Sharma",
    story: "Found the most amazing street food near Telibandha. The chole bhature there is absolutely divine, and the owner still remembers regulars by name.",
    rating: 5,
    category: "Food",
    time: "2 weeks ago",
  },
  {
    name: "Rajesh Kumar",
    story: "Marine Drive has become my evening reset spot. The sunset views are clean, the breeze is constant, and there is always activity without chaos.",
    rating: 4,
    category: "Tourism",
    time: "1 month ago",
  },
  {
    name: "Anita Patel",
    story: "City Center Mall works great for family shopping days. Kids have options, adults have options, and food court choices are better than expected.",
    rating: 4,
    category: "Shopping",
    time: "3 days ago",
  },
];

const LocalStories = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section ref={sectionRef} className="scroll-reveal px-4 py-16">
      <div className="container mx-auto">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Voices</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Stories from people who live here</h2>
          <p className="mt-3 text-muted-foreground">Short personal notes that help you feel the city before you even step out.</p>
        </div>

        <div className="border-l-2 border-border pl-5 md:pl-7">
          {stories.map((story) => (
            <article key={story.name} className="relative mb-8 border border-border bg-card/90 p-5 last:mb-0">
              <span className="absolute -left-[2.1rem] top-6 h-3.5 w-3.5 border-2 border-background bg-primary md:-left-[2.65rem]" />
              <div className="mb-4 flex items-start gap-3">
                <Quote className="mt-0.5 h-5 w-5 text-primary" />
                <div className="flex items-center gap-1">
                  {Array.from({ length: story.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-sm leading-relaxed text-foreground/90">"{story.story}"</p>

              <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border/70 pt-4 text-xs">
                <span className="font-semibold text-foreground">{story.name}</span>
                <span className="border border-border px-2 py-1 font-medium text-muted-foreground">{story.category}</span>
                <span className="text-muted-foreground">{story.time}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocalStories;
