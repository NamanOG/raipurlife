import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SmartImage from "@/components/SmartImage";
import QuirkyMarquee from "@/components/QuirkyMarquee";
import { Building2, CalendarDays, Cpu, Landmark, MapPin, ShoppingBag, TrainFront } from "lucide-react";

const timeline = [
  {
    period: "Pre-10th century",
    title: "Early settlement and trade corridors",
    summary:
      "The Raipur plain developed around agrarian villages and exchange routes linking forest produce, grain, and artisan goods across central India.",
    image: "/places/morning_raipur.jpg",
  },
  {
    period: "10th to 14th centuries",
    title: "Temple-culture influence in the region",
    summary:
      "The wider Chhattisgarh region saw strong temple and cultural activity, and Raipur evolved as a practical urban node connected to that civilizational belt.",
    image: "/places/museum.jpeg",
  },
  {
    period: "18th to 19th centuries",
    title: "Administrative consolidation",
    summary:
      "Under changing regional powers and later colonial administration, Raipur grew as a district headquarters and market center.",
    image: "/places/morning_raipur.jpg",
  },
  {
    period: "1867",
    title: "Municipal governance begins",
    summary:
      "Urban administration structures were formalized in the 19th century, laying groundwork for planned roads, sanitation, and civic services.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Vivekananda%20Raipur.JPG",
  },
  {
    period: "Late 19th to 20th century",
    title: "Rail-linked market expansion",
    summary:
      "Rail-era connectivity helped scale wholesale trade, warehousing, and inter-city movement, strengthening Raipur's commercial role.",
    image: "/places/marine_drive.jpg",
  },
  {
    period: "1 November 2000",
    title: "Capital city transition",
    summary:
      "When Chhattisgarh was formed, Raipur became the state capital and entered a faster phase of institutional and infrastructure growth.",
    image: "/places/marine_drive.jpg",
  },
];

const developmentTracks = [
  {
    title: "Civic Backbone",
    icon: Building2,
    points: [
      "Road widening, junction upgrades, and better city circulation",
      "Expanded municipal service management and ward-level planning",
      "Incremental improvements in public utilities and city amenities",
    ],
  },
  {
    title: "Regional Connectivity",
    icon: TrainFront,
    points: [
      "Rail and highway access reinforced Raipur as a logistics and trading base",
      "Airport and inter-city mobility supported business travel growth",
      "Commuter and service corridors connected old and new urban zones",
    ],
  },
  {
    title: "Retail and Services",
    icon: ShoppingBag,
    points: [
      "Organized retail destinations expanded city shopping patterns",
      "National and international brand presence increased in major malls",
      "Food, leisure, and multiplex culture shaped new weekend routines",
    ],
  },
];

const retailShift = [
  {
    name: "Ambuja City Center",
    note: "Organized retail, dining, and family outing format gained scale.",
    image: "/places/urban.png",
  },
  {
    name: "Magneto The Mall",
    note: "A key branded retail destination in the city growth story.",
    image: "/places/urban.png",
  },
  {
    name: "Zora Mall",
    note: "Premium-format commercial frontage in newer development zones.",
    image: "/places/zora.jpg",
  },
];

const History = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="relative isolate overflow-hidden px-4 py-20 min-h-[42vh]">
        <div className="absolute inset-0 -z-10 bg-[url('/places/morning_raipur.jpg')] bg-cover bg-center opacity-30 dark:opacity-20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/90 to-background/68 dark:from-background dark:via-background/92 dark:to-background/70" />
        <div className="absolute inset-0 -z-10 hero-atmo" />
        <div className="container mx-auto">
          <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="hero-copy-panel max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Historical Lens</p>
              <h1 className="mt-2 max-w-3xl text-4xl font-bold md:text-5xl">How Raipur became the city it is today</h1>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Raipur's story spans early settlement routes, municipal-era institution building, capital-city acceleration after 2000,
                and a visible shift toward smart infrastructure and organized retail.
              </p>
              <div className="mt-6 grid gap-3 border-t border-border/70 pt-4 text-sm text-muted-foreground sm:grid-cols-3">
                <p>Historic market-city foundation</p>
                <p>Capital transition and planned expansion</p>
                <p>Smart systems and modern urban lifestyle</p>
              </div>
            </div>

            <article className="card-tint overflow-hidden shadow-xl">
              <SmartImage
                src="https://commons.wikimedia.org/wiki/Special:FilePath/Raipur%20Skyline%20in%202019.png"
                alt="Raipur skyline"
                fallbackQuery="Raipur skyline"
                className="h-52 w-full object-cover"
              />
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">City arc</p>
                <p className="mt-2 text-xl font-semibold">From historic core to growth capital</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  The modern city reflects both old bazaars and a newer planning vision across the Raipur-Atal Nagar corridor.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8">
        <div className="container mx-auto max-w-6xl">
          <QuirkyMarquee
            variant={1}
            palette="amber"
            items={[
              "Temple-era corridors",
              "1867 civic administration",
              "Rail-linked market growth",
              "Capital transition in 2000",
              "Smart city evolution",
            ]}
          />
        </div>
      </section>

      <section ref={sectionRef} className="scroll-reveal px-4 pb-8">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold md:text-3xl">Chronological timeline</h2>
          </div>
          <div className="grid gap-4">
            {timeline.map((item) => (
              <article key={item.title} className="glass border border-border/70 p-4 md:p-5">
                <div className="grid gap-4 md:grid-cols-[220px_1fr]">
                  <SmartImage
                    src={item.image}
                    alt={item.title}
                    fallbackQuery={item.title}
                    className="h-36 w-full rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{item.period}</p>
                    <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-3">
            <Landmark className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold md:text-3xl">How the city developed</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {developmentTracks.map((track) => {
              const Icon = track.icon;
              return (
                <article key={track.title} className="card-tint p-5 shadow-sm hover-lift">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold">{track.title}</h3>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {track.points.map((point) => (
                      <p key={point}>• {point}</p>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-10">
        <div className="container mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="glass border border-border/70 p-5 md:p-6">
            <div className="flex items-center gap-3">
              <Cpu className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Smart Raipur and Atal Nagar phase</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The post-2000 period introduced a dual growth model: traditional Raipur continued densifying, while Atal Nagar (Naya Raipur)
              evolved as a planned extension with utility-led and technology-backed city infrastructure.
            </p>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p>- Planned civic districts and sector-based expansion beyond the old core</p>
              <p>- Smart-city style utility management themes including street-light and service monitoring</p>
              <p>- Better urban mobility focus through corridor upgrades and public-transport modernization</p>
              <p>- Administrative, educational, and commercial functions spreading across a wider metro belt</p>
            </div>
          </article>

          <div className="grid gap-4">
            <article className="card-tint overflow-hidden shadow-sm hover-lift">
              <SmartImage
                src="https://commons.wikimedia.org/wiki/Special:FilePath/Central%20Buisness%20District,%20Sector%2021%20Naya%20Raipur.jpg"
                alt="Central Business District Naya Raipur"
                fallbackQuery="Naya Raipur CBD"
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Planned expansion</p>
                <p className="mt-1 text-sm text-muted-foreground">New business and administrative clusters widened the city footprint.</p>
              </div>
            </article>

            <article className="card-tint overflow-hidden shadow-sm hover-lift">
              <SmartImage
                src="https://commons.wikimedia.org/wiki/Special:FilePath/Smart%20City%20Raipur.png"
                alt="Smart City Raipur"
                fallbackQuery="Smart City Raipur"
                className="h-44 w-full object-cover"
              />
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Smart systems</p>
                <p className="mt-1 text-sm text-muted-foreground">Digital operations and utility modernization became core urban themes.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold md:text-3xl">Retail transformation and branded era</h2>
          </div>
          <p className="mb-6 max-w-4xl text-sm leading-relaxed text-muted-foreground">
            Alongside markets like Pandri and Gol Bazaar, organized malls changed consumption patterns in the 2010s and beyond.
            Weekend city life now blends local commerce, chain retail, multiplex culture, and destination dining.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {retailShift.map((item) => (
              <article key={item.name} className="glass border border-border/70 p-4 hover-lift">
                <SmartImage
                  src={item.image}
                  alt={item.name}
                  fallbackQuery={item.name}
                  className="h-44 w-full rounded-xl object-cover"
                />
                <h3 className="mt-3 text-lg font-semibold">{item.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.note}</p>
              </article>
            ))}
          </div>

          <article className="mt-8 card-tint p-5 md:p-6">
            <h3 className="text-xl font-semibold">What stayed constant</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Even with rapid expansion, Raipur's core identity still comes from people-first public spaces, neighborhood food culture,
              and market-led social life. The city narrative is not old versus new; it is old and new evolving together.
            </p>
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default History;
