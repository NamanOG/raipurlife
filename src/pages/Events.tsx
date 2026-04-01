import { CalendarDays, Clock, MapPin, Star, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { formatReviewTimeAgo, useCommunityReviews } from "@/hooks/useCommunityReviews";
import { useLiveEvents } from "@/hooks/useLiveEvents";
import SmartImage from "@/components/SmartImage";
import QuirkyMarquee from "@/components/QuirkyMarquee";

const events = [
  {
    id: 1,
    name: "Raipur Carnival",
    category: "Festival",
    date: "October 15-17, 2026",
    time: "10:00 AM - 10:00 PM",
    location: "Central Parade Ground",
    attendees: 5000,
  },
  {
    id: 2,
    name: "Chhattisgarh Foundation Day",
    category: "Cultural",
    date: "November 1, 2026",
    time: "9:00 AM - 8:00 PM",
    location: "Municipal Ground",
    attendees: 10000,
  },
  {
    id: 3,
    name: "Food Festival of Chhattisgarh",
    category: "Food",
    date: "December 10-12, 2026",
    time: "12:00 PM - 10:00 PM",
    location: "Science College Ground",
    attendees: 3500,
  },
  {
    id: 4,
    name: "Raipur Music Festival",
    category: "Music",
    date: "September 25-26, 2026",
    time: "6:00 PM - 11:00 PM",
    location: "Indoor Stadium",
    attendees: 2800,
  },
  {
    id: 5,
    name: "Telibandha Night Market",
    category: "Festival",
    date: "January 8-10, 2027",
    time: "5:00 PM - 11:00 PM",
    location: "Telibandha Marine Drive",
    attendees: 4200,
  },
  {
    id: 6,
    name: "Handloom and Tribal Craft Expo",
    category: "Cultural",
    date: "February 12-14, 2027",
    time: "11:00 AM - 9:00 PM",
    location: "Purkhouti Muktangan",
    attendees: 3200,
  },
];

const eventImageByCategory: Record<string, string> = {
  Festival: "/places/morning_raipur.jpg",
  Cultural: "/places/marine_drive.jpg",
  Food: "/places/nukkad.jpg",
  Music: "/places/morning_raipur.jpg",
  Live: "/places/marine_drive.jpg",
};

const Events = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  const { getReviewsByCategory } = useCommunityReviews();
  const communityEventReviews = getReviewsByCategory("events");
  const { events: liveEvents, isLoading: loadingLiveEvents, hasLiveEvents, source } = useLiveEvents();

  const visibleEvents = hasLiveEvents
    ? liveEvents.map((event) => ({
        id: event.id,
        name: event.name,
        category: "Live",
        date: event.date,
        time: event.time,
        location: event.location,
        attendees: event.attendees || 0,
      }))
    : events;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden px-4 py-16">
        <div className="absolute inset-0 -z-10 bg-[url('/places/morning_raipur.jpg')] bg-cover bg-center opacity-24" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/90 to-background/65" />
        <div className="absolute inset-0 -z-10 grid-fabric opacity-25" />
        <div className="container mx-auto grid max-w-6xl items-end gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="hero-copy-panel max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Calendar</p>
            <h1 className="mt-2 text-4xl font-bold md:text-5xl">Events and festivals</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Keep track of cultural programs, food fests, and city-wide celebrations across the year.
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
              {hasLiveEvents && source === "ticketmaster" && "Showing live events fetched from Ticketmaster."}
              {hasLiveEvents && source === "public-holiday" && "Showing free live civic calendar (public holiday feed)."}
              {!hasLiveEvents && "Showing curated events. Add Ticketmaster key for hyper-local live feed."}
            </div>
            <div className="mt-6 grid gap-3 border-t border-border/70 pt-4 text-sm text-muted-foreground sm:grid-cols-3">
              <p>Seasonal festivals and civic dates.</p>
              <p>Curated first, live feeds optional.</p>
              <p>Useful for planning weekends in advance.</p>
            </div>
          </div>

          <article className="card-tint overflow-hidden shadow-xl">
            <SmartImage src="/places/morning_raipur.jpg" alt="Raipur event night" className="h-44 w-full object-cover" />
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Featured this week</p>
              <p className="mt-2 text-xl font-semibold">City cultural circuit</p>
              <p className="mt-2 text-sm text-muted-foreground">Two-day route covering folk showcase, local food zone, and evening music stop.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="px-4 pb-8">
        <div className="container mx-auto max-w-6xl">
          <QuirkyMarquee
            variant={3}
            palette="teal"
            reverse
            items={[
              "Carnival nights",
              "Foundation day shows",
              "Food fest circuits",
              "Live music weekends",
              "Craft expo highlights",
            ]}
          />
        </div>
      </section>

      <section ref={sectionRef} className="scroll-reveal px-4 pb-14">
        <div className="container mx-auto max-w-7xl space-y-4">
          {loadingLiveEvents && (
            <div className="glass border border-border/70 p-4 text-sm text-muted-foreground">
              Fetching live events...
            </div>
          )}

          {visibleEvents.map((event) => (
            <article key={event.id} className="group overflow-hidden border border-border/70 bg-card/85 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
              <SmartImage
                src={eventImageByCategory[event.category]}
                alt={event.name}
                fallbackQuery={`${event.name} event`}
                className="mb-4 h-44 w-full rounded-xl object-cover"
              />
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{event.category}</p>
                <p className="text-xs text-muted-foreground">
                  {event.attendees ? `${event.attendees.toLocaleString()}+ attendees` : "Live listing"}
                </p>
              </div>
              <h2 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-primary">{event.name}</h2>
              <div className="mt-4 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
                <p className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  {event.date}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  {event.time}
                </p>
                <p className="flex items-center gap-2 md:col-span-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {event.location}
                </p>
                <p className="flex items-center gap-2 md:col-span-2">
                  <Users className="h-4 w-4 text-primary" />
                  {source === "public-holiday" ? "National civic calendar event" : "Popular community event"}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold">Community Event Suggestions</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {communityEventReviews.length === 0 && (
              <article className="md:col-span-2 border border-dashed border-border bg-card/70 p-6 text-center text-sm text-muted-foreground">
                No community event suggestions yet. Add one from the review form and it will appear here after moderation.
              </article>
            )}
            {communityEventReviews.slice(0, 4).map((review) => (
              <article key={review.id} className="group overflow-hidden border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <SmartImage
                  src={review.image || "/hero-bg.png"}
                  alt={review.place}
                  fallbackQuery={review.place}
                  className="h-44 w-full object-cover"
                />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold transition-colors duration-300 group-hover:text-primary">{review.place}</h3>
                    <p className="inline-flex items-center gap-1 text-sm font-semibold">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      {review.rating.toFixed(1)}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{review.message}</p>
                  {review.address && <p className="mt-2 text-xs text-muted-foreground">Address: {review.address}</p>}
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {review.visitType && <span className="border border-border/70 bg-muted px-2 py-1">Visit: {review.visitType}</span>}
                    {review.bestTimeToVisit && <span className="border border-border/70 bg-muted px-2 py-1">Best: {review.bestTimeToVisit}</span>}
                    {review.budgetRange && <span className="border border-border/70 bg-muted px-2 py-1">{review.budgetRange}</span>}
                  </div>
                  {review.quickTip && <p className="mt-2 text-xs text-muted-foreground">Tip: {review.quickTip}</p>}
                  <p className="mt-3 text-xs text-muted-foreground">
                    By {review.authorName} • {formatReviewTimeAgo(review.createdAt)} • {review.wouldRecommend ? "Recommended" : "Mixed"}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
