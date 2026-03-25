import { useEffect, useMemo, useState } from "react";

type TicketmasterEvent = {
  id: string;
  name: string;
  dates?: {
    start?: {
      localDate?: string;
      localTime?: string;
    };
  };
  _embedded?: {
    venues?: Array<{
      name?: string;
      city?: { name?: string };
    }>;
  };
};

export interface LiveEventItem {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  attendees?: number;
  source?: "ticketmaster" | "public-holiday";
}

const formatDate = (value?: string) => {
  if (!value) {
    return "Date TBD";
  }

  const date = new Date(value);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const useLiveEvents = () => {
  const [events, setEvents] = useState<LiveEventItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [source, setSource] = useState<"ticketmaster" | "public-holiday" | "curated">("curated");

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;
    const city = import.meta.env.VITE_EVENTS_CITY || "Raipur";

    const controller = new AbortController();

    const loadPublicHolidayEvents = async () => {
      const response = await fetch("https://date.nager.at/api/v3/NextPublicHolidays/IN", {
        signal: controller.signal,
      });
      const holidays = (await response.json()) as Array<{
        date: string;
        localName: string;
        name: string;
      }>;

      const mapped = holidays.slice(0, 8).map((holiday) => ({
        id: `holiday-${holiday.date}-${holiday.localName}`,
        name: `${holiday.localName} Celebration`,
        date: formatDate(holiday.date),
        time: "All day",
        location: `${city}, Chhattisgarh`,
        source: "public-holiday" as const,
      }));

      setEvents(mapped);
      setSource("public-holiday");
    };

    const loadEvents = async () => {
      setIsLoading(true);

      try {
        if (apiKey) {
          const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${encodeURIComponent(city)}&countryCode=IN&size=8&sort=date,asc`;
          const response = await fetch(url, { signal: controller.signal });
          const json = await response.json();
          const list = (json?._embedded?.events || []) as TicketmasterEvent[];

          const mapped = list.map((event) => {
            const date = event.dates?.start?.localDate;
            const time = event.dates?.start?.localTime;
            const venue = event._embedded?.venues?.[0];
            const location = [venue?.name, venue?.city?.name].filter(Boolean).join(", ");

            return {
              id: event.id,
              name: event.name,
              date: formatDate(date),
              time: time || "Time TBD",
              location: location || city,
              source: "ticketmaster" as const,
            };
          });

          if (mapped.length > 0) {
            setEvents(mapped);
            setSource("ticketmaster");
            return;
          }
        }

        await loadPublicHolidayEvents();
      } catch {
        try {
          await loadPublicHolidayEvents();
        } catch {
          setEvents([]);
          setSource("curated");
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadEvents();

    return () => controller.abort();
  }, []);

  const hasLiveEvents = useMemo(() => events.length > 0, [events]);

  return {
    events,
    isLoading,
    hasLiveEvents,
    source,
  };
};
