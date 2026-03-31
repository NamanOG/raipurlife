import { useEffect, useMemo, useState } from "react";
import { resolvePlaceImage } from "@/utils/placeImages";

type AutoCategory = "tourism" | "food" | "shopping";

type OverpassElement = {
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
};

export interface AutoPlace {
  name: string;
  description: string;
  location: string;
  image: string;
  category: string;
  rating: number;
  hours?: string;
  price?: string;
  tags?: string[];
  reviewerName?: string;
  reviewTimeAgo?: string;
  reviewsCount?: number;
}

const RAIPUR_BBOX = "21.18,81.55,21.32,81.75";
const CACHE_TTL_MS = 12 * 60 * 60 * 1000;
const GOOGLE_PLACES_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
const PLACE_PHOTO_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const LIVE_PLACES_ENABLED = import.meta.env.VITE_ENABLE_LIVE_PLACES === "true";
const REVIEWER_NAMES = [
  "Aarav",
  "Priya",
  "Rohan",
  "Kavya",
  "Neha",
  "Yash",
  "Anjali",
  "Vikram",
  "Ishita",
  "Rahul",
];
const TIME_AGO_LABELS = [
  "29m ago",
  "1h ago",
  "3h ago",
  "7h ago",
  "12h ago",
  "1d ago",
  "2d ago",
  "4d ago",
];

const QUERY_BY_CATEGORY: Record<AutoCategory, string> = {
  tourism: `
    [out:json][timeout:25];
    (
      node["tourism"~"attraction|museum|gallery|viewpoint|zoo|theme_park"](${RAIPUR_BBOX});
      way["tourism"~"attraction|museum|gallery|viewpoint|zoo|theme_park"](${RAIPUR_BBOX});
      node["leisure"~"park|garden"](${RAIPUR_BBOX});
      way["leisure"~"park|garden"](${RAIPUR_BBOX});
    );
    out center 60;
  `,
  food: `
    [out:json][timeout:25];
    (
      node["amenity"~"restaurant|cafe|fast_food|food_court"](${RAIPUR_BBOX});
      way["amenity"~"restaurant|cafe|fast_food|food_court"](${RAIPUR_BBOX});
    );
    out center 80;
  `,
  shopping: `
    [out:json][timeout:25];
    (
      node["shop"](${RAIPUR_BBOX});
      way["shop"](${RAIPUR_BBOX});
      node["amenity"="marketplace"](${RAIPUR_BBOX});
      way["amenity"="marketplace"](${RAIPUR_BBOX});
    );
    out center 80;
  `,
};

const toTitleCase = (value: string) =>
  value
    .split(/[ _-]/g)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");

const seededRating = (seed: string) => {
  let hash = 0;

  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  const normalized = Math.abs(hash % 8);
  return Number((4.1 + normalized * 0.1).toFixed(1));
};

const seededHash = (seed: string) => {
  let hash = 0;

  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
};

const seededIndex = (seed: string, length: number) => {
  if (length <= 0) {
    return 0;
  }

  return seededHash(seed) % length;
};

const ensureRaipurLocation = (location: string) => {
  const trimmed = location.trim();
  if (!trimmed) {
    return "Raipur, Chhattisgarh";
  }

  if (/raipur/i.test(trimmed)) {
    if (/chhattisgarh/i.test(trimmed)) {
      return trimmed;
    }
    return `${trimmed}, Chhattisgarh`;
  }

  return `${trimmed}, Raipur, Chhattisgarh`;
};

const makePhotoCacheKey = (name: string) =>
  `raipur-google-place-photo-v1-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

const getCachedPlacePhoto = (name: string) => {
  try {
    const raw = localStorage.getItem(makePhotoCacheKey(name));
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as { timestamp: number; url: string };
    if (!parsed.url || Date.now() - parsed.timestamp > PLACE_PHOTO_CACHE_TTL_MS) {
      localStorage.removeItem(makePhotoCacheKey(name));
      return null;
    }

    return parsed.url;
  } catch {
    return null;
  }
};

const setCachedPlacePhoto = (name: string, url: string) => {
  try {
    localStorage.setItem(
      makePhotoCacheKey(name),
      JSON.stringify({ timestamp: Date.now(), url })
    );
  } catch {
    // Ignore cache write failures.
  }
};

const fetchGooglePlacePhotoUrl = async (name: string, signal?: AbortSignal) => {
  if (!GOOGLE_PLACES_API_KEY) {
    return null;
  }

  const cached = getCachedPlacePhoto(name);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      signal,
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
        "X-Goog-FieldMask": "places.photos",
      },
      body: JSON.stringify({
        textQuery: `${name}, Raipur, Chhattisgarh`,
        maxResultCount: 1,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const json = (await response.json()) as {
      places?: Array<{ photos?: Array<{ name?: string }> }>;
    };

    const photoName = json.places?.[0]?.photos?.[0]?.name;
    if (!photoName) {
      return null;
    }

    const mediaUrl = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=1200&key=${GOOGLE_PLACES_API_KEY}`;
    setCachedPlacePhoto(name, mediaUrl);
    return mediaUrl;
  } catch {
    return null;
  }
};

const attachGooglePlacePhotos = async (
  places: AutoPlace[],
  signal?: AbortSignal
) => {
  if (!GOOGLE_PLACES_API_KEY || places.length === 0) {
    return places;
  }

  const withPhotos = await Promise.all(
    places.map(async (place) => {
      const googlePhotoUrl = await fetchGooglePlacePhotoUrl(place.name, signal);
      return {
        ...place,
        image: googlePhotoUrl || place.image,
      };
    })
  );

  return withPhotos;
};

const withSyntheticReviewMeta = (place: AutoPlace): AutoPlace => {
  const seed = `${place.name}-${place.category}`;

  return {
    ...place,
    rating: place.rating || seededRating(seed),
    reviewerName: place.reviewerName || REVIEWER_NAMES[seededIndex(seed, REVIEWER_NAMES.length)],
    reviewTimeAgo: place.reviewTimeAgo || TIME_AGO_LABELS[seededIndex(`${seed}-time`, TIME_AGO_LABELS.length)],
    reviewsCount: place.reviewsCount || 45 + (seededHash(`${seed}-count`) % 800),
    location: ensureRaipurLocation(place.location),
    image: place.image || resolvePlaceImage({ name: place.name, category: place.category, tags: place.tags }),
  };
};

const getLocationLabel = (tags: Record<string, string>) => {
  return (
    tags["addr:suburb"] ||
    tags["addr:street"] ||
    tags["addr:city"] ||
    tags["addr:district"] ||
    "Raipur"
  );
};

const buildDescription = (category: AutoCategory, tags: Record<string, string>) => {
  if (category === "tourism") {
    const type = tags.tourism || tags.leisure || "Attraction";
    return `${toTitleCase(type)} spot in Raipur with local interest and visitor activity.`;
  }

  if (category === "food") {
    const cuisine = tags.cuisine?.split(";").map(toTitleCase).join(", ");
    if (cuisine) {
      return `${cuisine} serving place frequently listed in local map data.`;
    }
    return "Popular food stop listed in open map data for Raipur.";
  }

  const type = tags.shop || tags.amenity || "Market";
  return `${toTitleCase(type)} destination in Raipur for regular shopping visits.`;
};

const buildTags = (category: AutoCategory, tags: Record<string, string>) => {
  if (category === "food") {
    const cuisineTags = (tags.cuisine || "")
      .split(";")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 2)
      .map(toTitleCase);

    return cuisineTags.length > 0 ? cuisineTags : ["Local Spot", "Community Listed"];
  }

  return undefined;
};

const mapElementsToPlaces = (category: AutoCategory, elements: OverpassElement[]) => {
  const unique = new Map<string, AutoPlace>();

  elements.forEach((element) => {
    const tags = element.tags || {};
    const name = tags.name?.trim();

    if (!name || unique.has(name.toLowerCase())) {
      return;
    }

    const image = resolvePlaceImage({
      name,
      category,
      tags: [tags.tourism, tags.leisure, tags.amenity, tags.shop, tags.cuisine].filter(Boolean) as string[],
    });
    const location = getLocationLabel(tags);

    unique.set(name.toLowerCase(), {
      name,
      description: buildDescription(category, tags),
      location,
      image,
      category: toTitleCase(tags.tourism || tags.leisure || tags.shop || tags.amenity || category),
      rating: seededRating(name),
      hours: tags.opening_hours ? tags.opening_hours : "Check locally",
      price: category === "food" ? "₹120 - ₹400" : undefined,
      tags: buildTags(category, tags),
    });
  });

  return Array.from(unique.values()).slice(0, 8);
};

const enrichPlaces = (places: AutoPlace[]) => places.map(withSyntheticReviewMeta);

const getCacheKey = (category: AutoCategory) => `raipur-auto-places-${category}-v2`;

export const useAutoPlaces = (category: AutoCategory, fallback: AutoPlace[]) => {
  const [places, setPlaces] = useState<AutoPlace[]>(() => enrichPlaces(fallback));
  const [isLoading, setIsLoading] = useState(false);
  const [source, setSource] = useState<"osm" | "curated">("curated");

  useEffect(() => {
    if (!LIVE_PLACES_ENABLED) {
      setPlaces(enrichPlaces(fallback));
      setSource("curated");
      return;
    }

    const controller = new AbortController();
    const cacheKey = getCacheKey(category);

    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as {
          timestamp: number;
          places: AutoPlace[];
        };

        if (Date.now() - parsed.timestamp < CACHE_TTL_MS && parsed.places.length > 0) {
          const enrichedCached = enrichPlaces(parsed.places);
          setPlaces(enrichedCached);
          setSource("osm");
          void attachGooglePlacePhotos(enrichedCached, controller.signal).then((withPhotos) => {
            if (!controller.signal.aborted) {
              setPlaces(withPhotos);
            }
          });
          return () => controller.abort();
        }
      } catch {
        localStorage.removeItem(cacheKey);
      }
    }

    const loadPlaces = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          body: QUERY_BY_CATEGORY[category],
          signal: controller.signal,
        });

        const json = (await response.json()) as { elements?: OverpassElement[] };
        const mapped = mapElementsToPlaces(category, json.elements || []);

        if (mapped.length > 0) {
          const enriched = enrichPlaces(mapped);
          const withPhotos = await attachGooglePlacePhotos(enriched, controller.signal);
          setPlaces(withPhotos);
          setSource("osm");
          localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), places: withPhotos }));
        } else {
          const enrichedFallback = enrichPlaces(fallback);
          const withPhotos = await attachGooglePlacePhotos(enrichedFallback, controller.signal);
          setPlaces(withPhotos);
          setSource("curated");
        }
      } catch {
        const enrichedFallback = enrichPlaces(fallback);
        const withPhotos = await attachGooglePlacePhotos(enrichedFallback, controller.signal);
        setPlaces(withPhotos);
        setSource("curated");
      } finally {
        setIsLoading(false);
      }
    };

    void loadPlaces();

    return () => controller.abort();
  }, [category, fallback]);

  const isLive = useMemo(() => source === "osm", [source]);

  return {
    places,
    isLoading,
    source,
    isLive,
  };
};
