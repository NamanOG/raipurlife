import { Calendar, Camera, Coffee, MapPin, ShoppingBag, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const actions = [
  {
    icon: MapPin,
    title: "Explore Neighborhoods",
    description: "Area-wise guides for old city streets and new Raipur zones.",
    href: "/tourism",
  },
  {
    icon: Camera,
    title: "Share Moments",
    description: "Upload your finds and help build the city map together.",
    href: "/add-review",
  },
  {
    icon: Coffee,
    title: "Tea and Cafe Radar",
    description: "Find chill corners from classic chai stands to late-night cafes.",
    href: "/food",
  },
  {
    icon: Utensils,
    title: "Food Trails",
    description: "Local plates, street legends, and family-favorite eateries.",
    href: "/food",
  },
  {
    icon: ShoppingBag,
    title: "Markets and Malls",
    description: "Compare local bazaars with modern shopping destinations.",
    href: "/shopping",
  },
  {
    icon: Calendar,
    title: "Events This Week",
    description: "Cultural activities, city festivals, and weekend plans.",
    href: "/events",
  },
];

const QuickActions = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section ref={sectionRef} className="scroll-reveal px-4 py-16">
      <div className="container mx-auto">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Start Here</p>
          <h2 className="text-3xl font-bold md:text-4xl">Jump to what matters right now</h2>
          <p className="mt-3 text-muted-foreground">Use quick routes to move through Raipur like a local, whether you're planning a day trip or exploring after work.</p>
        </div>

        <div className="border border-border">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                to={action.href}
                className="group grid gap-4 border-b border-border px-5 py-5 transition-colors duration-300 hover:bg-muted/35 md:grid-cols-[auto_1fr_auto] md:items-center"
              >
                <div className="grid h-10 w-10 place-items-center border border-border bg-background text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{action.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{action.description}</p>
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground md:justify-self-end">Open</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
