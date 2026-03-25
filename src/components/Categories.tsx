import {
  Building,
  Camera,
  Coffee,
  Gamepad2,
  Music,
  ShoppingBag,
  TreePine,
  UtensilsCrossed,
} from "lucide-react";

const categories = [
  {
    id: "food",
    title: "Food and Dining",
    description: "Street icons, family restaurants, and local cuisine stops",
    icon: UtensilsCrossed,
    count: 45,
  },
  {
    id: "tourism",
    title: "Tourism and Sightseeing",
    description: "Lakes, monuments, and city landmarks worth revisiting",
    icon: Camera,
    count: 32,
  },
  {
    id: "shopping",
    title: "Shopping and Malls",
    description: "From market bargaining to premium store hopping",
    icon: ShoppingBag,
    count: 28,
  },
  {
    id: "cafes",
    title: "Cafes and Hangouts",
    description: "Comfort corners for chai, coffee, and conversations",
    icon: Coffee,
    count: 38,
  },
  {
    id: "nature",
    title: "Parks and Nature",
    description: "Green pockets, open spaces, and evening walk zones",
    icon: TreePine,
    count: 22,
  },
  {
    id: "culture",
    title: "Culture and Arts",
    description: "Museums, galleries, and local heritage experiences",
    icon: Building,
    count: 15,
  },
  {
    id: "entertainment",
    title: "Entertainment",
    description: "Cinema, performances, and weekend fun spots",
    icon: Music,
    count: 25,
  },
  {
    id: "sports",
    title: "Sports and Recreation",
    description: "Stadiums, gyms, and play zones around the city",
    icon: Gamepad2,
    count: 18,
  },
];

const Categories = () => {
  return (
    <section className="px-4 py-16">
      <div className="container mx-auto">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Browse</p>
            <h3 className="mt-2 text-3xl font-bold md:text-4xl">Explore by category</h3>
            <p className="mt-3 text-muted-foreground">Curated sections designed for quick decisions and deeper exploration.</p>
          </div>
          <p className="text-sm font-medium text-muted-foreground">223+ mapped places and growing</p>
        </div>

        <div className="grid gap-0 border border-border lg:grid-cols-2">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <article
                key={category.id}
                className="group grid gap-4 border-b border-border px-5 py-5 transition-colors duration-300 hover:bg-muted/35 sm:grid-cols-[auto_1fr_auto] sm:items-center"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="grid h-10 w-10 place-items-center border border-border bg-background text-primary">
                  <IconComponent className="h-5 w-5" />
                </div>

                <div>
                  <h4 className="text-lg font-semibold leading-tight">{category.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{category.description}</p>
                </div>

                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:justify-self-end">{category.count} places</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
